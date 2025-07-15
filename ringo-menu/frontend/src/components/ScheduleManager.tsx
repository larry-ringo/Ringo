import React, { useEffect, useState } from "react";

const dayMap = {
  MO: "Monday",
  TU: "Tuesday",
  WE: "Wednesday",
  TH: "Thursday",
  FR: "Friday",
  SA: "Saturday",
  SU: "Sunday",
};

const dayKeys = Object.keys(dayMap);
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
const seconds = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

type Entry = { time: string; name: string };
type Schedule = { [day: string]: Entry[] };

const API_BASE = import.meta.env.VITE_API_URL;

export default function ScheduleManager() {
  const [schedules, setSchedules] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [renameTarget, setRenameTarget] = useState("");
  const [parsedSchedule, setParsedSchedule] = useState<Schedule>({});
  const [newScheduleName, setNewScheduleName] = useState("");
  const [linkNames, setLinkNames] = useState<string[]>(["default"]);
  const [editMode, setEditMode] = useState<"individual" | "shared">("individual");
  const [sharedEntries, setSharedEntries] = useState<Entry[]>([]);
  const [customDays, setCustomDays] = useState<string[]>([]);

  const fetchSchedules = async () => {
    const res = await fetch(`${API_BASE}/schedules`);
    const data = await res.json();
    setSchedules(data);
  };

  const fetchLinkNames = async () => {
    const res = await fetch(`${API_BASE}/links`);
    const data = await res.json();
    const names = data.map((item: { name: string }) => item.name);
    const unique = Array.from(new Set(names.filter((n) => n !== "default")));
    setLinkNames(["default", ...unique]);
  };

  const loadSchedule = async (name: string) => {
    const res = await fetch(`/api/schedules/${name}`);
    const data = await res.json();
    const lines = data.content.split("\n").map((l: string) => l.trim());
    const schedule: Schedule = {};

    for (const line of lines) {
      for (const key of dayKeys) {
        if (line.startsWith(key + ":")) {
          const content = line.slice(key.length + 1).trim();
          const entries: Entry[] = content
            ? content.split(",").map((s) => {
                const [time, ...nameParts] = s.trim().split(" ");
                return { time, name: nameParts.join(" ") };
              })
            : [];
          schedule[key] = entries;
        }
      }
    }

    setParsedSchedule(schedule);
    setSharedEntries(schedule["MO"] || []);
    setSelected(name);
    setRenameTarget("");
  };

  const correctTimeIfInvalid = (hh: string, mm: string, ss: string, originalTime: string): string => {
    if (originalTime === "00:00:01") return originalTime;
    if (hh === "00" && mm === "00" && (ss === "00" || ss === "01")) return "00:00:02";
    return `${hh}:${mm}:${ss}`;
  };

  const getSecondOptions = (hh: string, mm: string, current: string): string[] => {
    if (current === "00:00:01") return seconds;
    if (hh === "00" && mm === "00") return seconds.filter((s) => s !== "00" && s !== "01");
    return seconds;
  };

  const getMinuteOptions = (hh: string, current: string): string[] => {
    // if (current === "00:00:01") return minutes;
    // if (hh === "00") return minutes.filter((m) => m !== "00" || current === "00:00:01");
    // return minutes;
    return minutes;
  };


  const handleEntryChange = (
    day: string,
    index: number,
    field: "time" | "name",
    value: string,
    useShared = false
  ) => {
    if (useShared) {
      const update = (entries: Entry[]) => {
        const current = entries[index];
        if (field === "time") {
          const [hh, mm, ss] = value.split(":");
          entries[index].time = correctTimeIfInvalid(hh, mm, ss, current.time);
        } else {
          entries[index].name = value;
        }
      };

      if (editMode === "custom") {
        const updated = { ...parsedSchedule };
        for (const day of customDays) {
          const entries = [...(updated[day] || [])];
          update(entries);
          updated[day] = entries;
        }
        setParsedSchedule(updated);
      } else {
        const updated = [...sharedEntries];
        update(updated);
        setSharedEntries(updated);
      }

    } else {
      const updatedSchedule = { ...parsedSchedule };
      const entries = [...(updatedSchedule[day] || [])];

      if (field === "time") {
        const [hh, mm, ss] = value.split(":");
        entries[index].time = correctTimeIfInvalid(hh, mm, ss, entries[index].time);
      } else {
        entries[index].name = value;
      }

      updatedSchedule[day] = entries;
      setParsedSchedule(updatedSchedule); // 🔥 this triggers re-render
    }
  };


  const addEntry = (day: string, useShared = false) => {
    const newEntry: Entry = { time: "00:00:02", name: "default" };

    if (useShared) {
      if (editMode === "custom") {
        const updated = { ...parsedSchedule };
        for (const d of customDays) {
          if (!updated[d]) updated[d] = [];
          updated[d].push({ ...newEntry });
        }
        setParsedSchedule(updated);
      } else {
        setSharedEntries([...sharedEntries, newEntry]);
      }
    } else {
      const updated = { ...parsedSchedule };
      if (!updated[day]) updated[day] = [];
      updated[day].push(newEntry);
      setParsedSchedule(updated);
    }
  };


  const removeEntry = (day: string, index: number, useShared = false) => {
    const entries = useShared ? [...sharedEntries] : [...(parsedSchedule[day] || [])];
    if (entries[index].time === "00:00:01") return; // reserved time
    entries.splice(index, 1);
    useShared
      ? setSharedEntries(entries)
      : setParsedSchedule({ ...parsedSchedule, [day]: entries });
  };

  const hasDuplicateTimes = (entries: Entry[]): boolean => {
    const times = entries.map((e) => e.time);
    const unique = new Set(times);
    return unique.size !== times.length;
  };

  const saveSchedule = async () => {
    if (!selected) return;

    if (editMode === "shared") {
      if (hasDuplicateTimes(sharedEntries)) {
        alert("Duplicate times found in shared mode.");
        return;
      }
    } else {
      for (const day of dayKeys) {
        if (hasDuplicateTimes(parsedSchedule[day] || [])) {
          alert(`Duplicate times found in ${dayMap[day]}.`);
          return;
        }
      }
    }

    const content = dayKeys
      .map((day) => {
        let entries: Entry[] = [];

        if (editMode === "shared") {
          entries = sharedEntries;
        } else if (editMode === "custom") {
          entries = customDays.includes(day) ? parsedSchedule[day] || [] : parsedSchedule[day] || [];
        } else {
          entries = parsedSchedule[day] || [];
        }

        return entries.length > 0
          ? `${day}: ${entries.map((e) => `${e.time} ${e.name}`).join(", ")}`
          : `${day}:`;
      })
      .join("\n");

    await fetch(`/api/schedules/${selected}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selected, content }),
    });

    alert("Schedule saved!");
  };

  const renameSchedule = async () => {
    if (!selected || !renameTarget || selected === renameTarget) return;

    const res = await fetch(`${API_BASE}/schedules/rename`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ old_name: selected, new_name: renameTarget }),
    });

    if (res.ok) {
      alert(`Renamed to "${renameTarget}"`);
      setSelected(renameTarget);
      setRenameTarget(renameTarget);
      fetchSchedules();
      window.location.reload(); // so the rest of the component are updated
    } else {
      const err = await res.json();
      alert(`Rename failed: ${err.detail}`);
    }
  };

  const createSchedule = async () => {
    if (!newScheduleName) return;
    const content = dayKeys.map((d) => `${d}: 00:00:01 default`).join("\n");

    await fetch(`${API_BASE}/schedules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newScheduleName, content }),
    });

    setNewScheduleName("");
    fetchSchedules();
    window.location.reload(); // so the rest of the component are updated
  };

  const deleteSchedule = async (name: string) => {
    if (!window.confirm(`Delete schedule "${name}"?`)) return;
    await fetch(`/api/schedules/${name}`, { method: "DELETE" });
    if (selected === name) {
      setSelected(null);
      setParsedSchedule({});
    }
    fetchSchedules();
    window.location.reload(); // so the rest of the component are updated
  };

  useEffect(() => {
    fetchSchedules();
    fetchLinkNames();
  }, []);

  const renderEntryRow = (
    entry: Entry,
    i: number,
    day: string,
    useShared: boolean,
    customDaysList: string[] = []
  ) => {
    return (
      <div key={i}>
        at&nbsp;
        <input
          type="time"
          step="1"
          value={entry.time}
          disabled={entry.time === "00:00:01"}
          onChange={(e) =>
            handleEntryChange(day, i, "time", e.target.value, useShared)
          }
        />
        &nbsp;show&nbsp;
        <select
          value={entry.name}
          onChange={(e) =>
            handleEntryChange(day, i, "name", e.target.value, useShared)
          }
        >
          {linkNames.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        &nbsp;
        {entry.time !== "00:00:01" && (
          <button
            onClick={() => {
              if (useShared && editMode === "custom") {
                customDaysList.forEach((d) => removeEntry(d, i, false));
              } else {
                removeEntry(day, i, useShared);
              }
            }}
          >
            ❌ Delete
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2>Schedules</h2>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          placeholder="New schedule name"
          value={newScheduleName}
          onChange={(e) => setNewScheduleName(e.target.value)}
          style={{
            flex: 1,
            height: "2.5rem",
            padding: "0 0.5rem",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={createSchedule}
          style={{
            height: "2.5rem",
            padding: "0 1rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          ➕ Create Schedule
        </button>
      </div>

        <ul>
          {schedules.map((name) => (
            <li key={name}>
              <a
                href={`/show/${encodeURIComponent(name)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "1rem" }}
              >
                {name}
              </a>
              <button onClick={() => loadSchedule(name)}>✏️ Edit</button>
              <button onClick={() => deleteSchedule(name)} style={{ marginLeft: "0.5rem" }}>
                🗑️ Delete
              </button>
              <button
                onClick={async () => {
                  const newName = prompt(`Duplicate "${name}" as:`, `${name}_copy`);
                  if (!newName) return;
                  const res = await fetch(`${API_BASE}/schedules/duplicate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ old_name: name, new_name: newName }),
                  });
                  if (res.ok) {
                    alert(`Duplicated as "${newName}"`);
                    fetchSchedules();
                    window.location.reload(); // so the rest of the component are updated
                  } else {
                    const err = await res.json();
                    alert(`Duplication failed: ${err.detail}`);
                  }
                }}
                style={{ marginLeft: "0.5rem" }}
              >
                📄 Duplicate
              </button>
            </li>
          ))}
        </ul>


      {selected && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Editing: {selected}</h3>

          <div style={{ display: "flex", gap: "0.5rem", margin: "0.5rem 0" }}>
            <input
              placeholder="New schedule name"
              value={renameTarget}
              onChange={(e) => setRenameTarget(e.target.value)}
              style={{ flex: 1, height: "2rem" }}
            />
            <button style={{ height: "2.9rem" }} onClick={renameSchedule}>✏️ Rename</button>
          </div>
          <br></br>

          <div>
            <div style={{ marginBottom: "0.4rem" }}>
              <label>
                <input
                  type="radio"
                  value="individual"
                  checked={editMode === "individual"}
                  onChange={() => setEditMode("individual")}
                />
                &nbsp;Edit Days Individually
              </label>
            </div>
            <div style={{ marginBottom: "0.4rem" }}>
              <label>
                <input
                  type="radio"
                  value="shared"
                  checked={editMode === "shared"}
                  onChange={() => setEditMode("shared")}
                />
                &nbsp;Edit All Days Together
              </label>
            </div>
            <div style={{ marginBottom: "0.4rem" }}>
              <label>
                <input
                  type="radio"
                  value="custom"
                  checked={editMode === "custom"}
                  onChange={() => setEditMode("custom")}
                />
                &nbsp;Edit Selected Days
              </label>
            </div>
          </div>

          {editMode === "shared" ? (
            <div>
              <br />
              {sharedEntries.map((entry, i) =>
                renderEntryRow(entry, i, "", true)
              )}
              <button onClick={() => addEntry("", true)}>➕ Add Time</button>
            </div>
          ) : editMode === "custom" ? (
            <div>
              <div style={{ marginTop: "1rem" }}>
                {dayKeys.map((day) => (
                  <label key={day} style={{ marginRight: "1rem" }}>
                    <input
                      type="checkbox"
                      checked={customDays.includes(day)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...customDays, day]
                          : customDays.filter((d) => d !== day);
                        setCustomDays(updated);
                      }}
                    />
                    &nbsp;{dayMap[day]}
                  </label>
                ))}
              </div>
              <br />
              {/* render one entry row for each index in the first custom day's list */}
              {(() => {
                const sampleDay = customDays[0];
                const reference = parsedSchedule[sampleDay] || [];
                return reference.map((_, i) =>
                  renderEntryRow(reference[i], i, "", true, customDays)
                );
              })()}
              <button onClick={() => addEntry("", true)}>➕ Add Time</button>
            </div>
          ) : ( // individual
            dayKeys.map((day) => (
              <div key={day}>
                <strong>{dayMap[day]}</strong>
                {(parsedSchedule[day] || []).map((entry, i) =>
                  renderEntryRow(entry, i, day, false)
                )}
                <button onClick={() => addEntry(day)}>➕ Add Time</button>
                <hr />
              </div>
            ))
          )}


          <div style={{ marginTop: "1rem" }}>
            <button onClick={saveSchedule}>💾 Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
