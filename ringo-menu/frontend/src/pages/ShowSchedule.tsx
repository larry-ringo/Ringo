import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

type Entry = { time: string; name: string };
type Schedule = { [day: string]: Entry[] };
type LinkMap = { [name: string]: string };
type RecurringEntry = {
  days: string;
  start: string;
  end: string;
  interval: number;
  duration: number;
  name: string;
};

function getCurrentDay(): string {
  return ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][new Date().getDay()];
}

function getNextDay(day: string): string {
  const index = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"].indexOf(day);
  return ["MO", "TU", "WE", "TH", "FR", "SA", "SU"][(index + 1) % 7];
}

function getCurrentTime(): string {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ss = now.getSeconds().toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function timeToSeconds(t: string): number {
  const [hh, mm, ss] = t.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
}

export default function ShowSchedule() {
  const { schedule } = useParams<{ schedule: string }>();
  const [linkMap, setLinkMap] = useState<LinkMap>({});
  const [activeLink, setActiveLink] = useState<string | null>(null);
  let lastContent = ""; // regular schedule content
  let lastRecurringContent = "";

  useEffect(() => {
    let scheduleData: Schedule = {};
    let recurringData: RecurringEntry[] = [];
    let map: LinkMap = {};
    let timeoutId: NodeJS.Timeout;

    const fetchLinks = async (): Promise<LinkMap> => {
      const res = await fetch(`${API_BASE}/links`);
      const data = await res.json();
      const map: LinkMap = {};
      for (const item of data) {
        map[item.name] = item.link;
      }
      return map;
    };

    const fetchSchedule = async (): Promise<Schedule> => {
      const res = await fetch(`${API_BASE}/schedules/${schedule}`);
      const data = await res.json();
      const lines = data.content.split("\n").map((l: string) => l.trim());
      const parsed: Schedule = {};
      for (const line of lines) {
        for (const day of ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]) {
          if (line.startsWith(day + ":")) {
            const entries = line
              .slice(day.length + 1)
              .split(",")
              .map((s) => {
                const [time, ...nameParts] = s.trim().split(" ");
                return { time, name: nameParts.join(" ") };
              })
              .filter((e) => e.time && e.name);
            parsed[day] = entries.sort((a, b) => a.time.localeCompare(b.time));
          }
        }
      }
      return parsed;
    };

    const fetchRecurring = async (): Promise<RecurringEntry[]> => {
      const res = await fetch(`${API_BASE}/recurring/${schedule}`);
      const data = await res.json();
      return data.map((entry: any) => ({
        days: entry.days,
        start: entry.start,
        end: entry.end,
        interval: entry.every,
        duration: entry.duration,
        name: entry.name,
      }));
    };

    const getCurrentEntryAndDelay = (): { entry: Entry; delay: number } => {
      const now = new Date();
      const currentDay = getCurrentDay();
      const currentTime = getCurrentTime();
      const currentSeconds = timeToSeconds(currentTime);
      const currentDayIndex = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"].indexOf(currentDay);

      for (const entry of recurringData) {
        if (entry.days[currentDayIndex] !== "1") continue;
        const startSec = timeToSeconds(entry.start);
        const endSec = timeToSeconds(entry.end);
        if (currentSeconds >= startSec && currentSeconds < endSec) {
          const elapsed = currentSeconds - startSec;
          const cycle = Math.floor(elapsed / entry.interval);
          const cycleStart = startSec + cycle * entry.interval;
          const cycleEnd = cycleStart + entry.duration;
          if (currentSeconds < cycleEnd) {
            const delay = (cycleStart + entry.interval - currentSeconds) * 1000;
            return {
              entry: { time: entry.start, name: entry.name },
              delay,
            };
          }
        }
      }

      const entries = scheduleData[currentDay] || [];
      let currentEntry: Entry = { time: "00:00:01", name: "default" };
      let nextEntry: Entry | null = null;

      for (let i = 0; i < entries.length; i++) {
        if (entries[i].time <= currentTime) {
          currentEntry = entries[i];
        } else if (!nextEntry && entries[i].time > currentTime) {
          nextEntry = entries[i];
        }
      }

      if (!nextEntry) {
        const nextDay = getNextDay(currentDay);
        const nextEntries = scheduleData[nextDay] || [];
        nextEntry = nextEntries.find((e) => e.time === "00:00:01") || {
          time: "00:00:01",
          name: "default",
        };
      }

      const [hh, mm, ss] = nextEntry.time.split(":").map(Number);
      const next = new Date();
      next.setHours(hh, mm, ss, 0);
      if (next <= now) next.setDate(now.getDate() + 1);

      const delay = next.getTime() - now.getTime();
      return { entry: currentEntry, delay };
    };

    const updateLink = () => {
      const evaluateAndSet = () => {
        const { entry } = getCurrentEntryAndDelay();
        const resolved = map[entry.name] || map["default"];
        const embedUrl = resolved.includes("/view") ? `${resolved}?embed` : resolved;

        setActiveLink((prev) => {
          if (prev !== embedUrl) {
            console.log("🔄 Link changed to:", embedUrl);
            return embedUrl;
          }
          return prev;
        });
      };

      evaluateAndSet();

      // 🔁 Keep checking every second for recurring link change
      const intervalId = setInterval(evaluateAndSet, 1000);

      return intervalId; // so we can clear it later
    };

    const checkForUpdates = async () => {
      // regular
      const res = await fetch(`${API_BASE}/schedules/${schedule}`);
      const data = await res.json();
      // recurring
      const res2 = await fetch(`${API_BASE}/recurring_raw/${schedule}`);
      const data2 = await res2.json();
      if (data.content !== lastContent || data2.content !== lastRecurringContent) {
        window.location.reload();
      }
    };

    let intervalId: NodeJS.Timeout;

    const init = async () => {
      try {
        map = await fetchLinks();
        scheduleData = await fetchSchedule();
        recurringData = await fetchRecurring();

        const res = await fetch(`${API_BASE}/schedules/${schedule}`);
        const data = await res.json();
        lastContent = data.content;

        const res2 = await fetch(`${API_BASE}/recurring_raw/${schedule}`);
        const data2 = await res2.json();
        lastRecurringContent = data2.content;

        intervalId = updateLink();
        setInterval(checkForUpdates, 10000);
      } catch (err) {
        console.error("❌ init failed:", err);
      }
    };


    init();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [schedule]);

  return (
    <div style={{ position: "relative", width: "100%", height: "0", paddingTop: "56.25%" }}>
      {activeLink ? (
        <iframe
          loading="lazy"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            border: "none",
          }}
          src={activeLink}
          allow="fullscreen"
          title="Ringo Menu"
        />
      ) : (
        <p style={{ position: "absolute", top: "1rem", left: "1rem" }}>
          Loading schedule...
        </p>
      )}
    </div>
  );
}
