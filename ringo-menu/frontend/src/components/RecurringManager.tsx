import React, { useEffect, useState } from "react";

const dayMap = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const RecurringManager = () => {
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [allSchedules, setAllSchedules] = useState<string[]>([]);
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    days: [],
    start: "",
    end: "",
    every: 60,
    duration: 10,
    name: "",
  });
  const [linkNames, setLinkNames] = useState(["default"]);

  useEffect(() => {
    fetch("/api/schedules")
      .then((res) => res.json())
      .then((data) => {
        setAllSchedules(data);
        // Do NOT select any schedule initially
      });

    fetch("/api/links")
      .then((res) => res.json())
      .then((data) => {
        const names = data.map((d) => d.name);
        setLinkNames(["default", ...names.filter((n) => n !== "default")]);
      });
  }, []);

  useEffect(() => {
    if (selectedSchedule) {
      fetch(`/api/recurring/${selectedSchedule}`)
        .then((res) => res.json())
        .then((data) => setEntries(data));
    } else {
      setEntries([]);
    }
  }, [selectedSchedule]);

  const binaryStringFromDays = (selectedDays: string[]) =>
    dayMap.map((d) => (selectedDays.includes(d) ? "1" : "0")).join("");

  const dayNamesFromBinary = (binary: string) =>
    binary
      .split("")
      .map((b, i) => (b === "1" ? dayMap[i] : null))
      .filter((d) => d !== null)
      .join(", ");

  const addEntry = () => {
    const { start, end, days, name } = newEntry;

    if (days.length === 0) {
      alert("Days have not been chosen.");
      return;
    }
    
    if (!start || !end || !name) {
      alert("Make sure all the field are filled out.");
      return;
    }
    
    if (end <= start) {
      alert("End time must be after start time.");
      return;
    }

    if (newEntry.every <= newEntry.duration) {
      alert("The lenght of the \"every\" field must be more than the \"for\" field.");
      return;
    }

    const binary = binaryStringFromDays(days);
    const added = {
      days: binary,
      start,
      end,
      every: Number(newEntry.every),
      duration: Number(newEntry.duration),
      name,
    };

    setEntries([...entries, added]);
    setNewEntry({ ...newEntry, start: "", end: "", days: [], name: "" });
  };

  const removeEntry = (i: number) => {
    const updated = [...entries];
    updated.splice(i, 1);
    setEntries(updated);
  };

  const save = () => {
    if (!selectedSchedule) return;
    fetch(`/api/recurring/${selectedSchedule}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries),
    }).then(() => alert("Saved"));
  };

  return (
    <div>
      <h2>Recurring Entries</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Select Schedule:&nbsp;</label>
        <select
          value={selectedSchedule}
          onChange={(e) => setSelectedSchedule(e.target.value)}
        >
          <option value="">-- Choose --</option>
          {allSchedules.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {selectedSchedule && (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <label>Days:</label>
            {dayMap.map((d) => (
              <label key={d} style={{ marginLeft: "0.75rem" }}>
                <input
                  type="checkbox"
                  checked={newEntry.days.includes(d)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...newEntry.days, d]
                      : newEntry.days.filter((x) => x !== d);
                    setNewEntry({ ...newEntry, days: updated });
                  }}
                />
                &nbsp;{d}
              </label>
            ))}
          </div>

          <div>
            <input
              type="time"
              step="1"
              value={newEntry.start}
              onChange={(e) => setNewEntry({ ...newEntry, start: e.target.value })}
            />
            &nbsp;to&nbsp;
            <input
              type="time"
              step="1"
              value={newEntry.end}
              onChange={(e) => setNewEntry({ ...newEntry, end: e.target.value })}
            />
            &nbsp;every&nbsp;
            <input
              type="number"
              style={{ width: "60px" }}
              value={newEntry.every}
              onChange={(e) => setNewEntry({ ...newEntry, every: Number(e.target.value) })}
            />
            &nbsp;s&nbsp;for&nbsp;
            <input
              type="number"
              style={{ width: "60px" }}
              value={newEntry.duration}
              onChange={(e) => setNewEntry({ ...newEntry, duration: Number(e.target.value) })}
            />
            &nbsp;show&nbsp;
            <select
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            >
              <option value="">-- Choose --</option>
              {linkNames.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            &nbsp;
            <button onClick={addEntry}>➕ Add</button>
          </div>

          <ul style={{ marginTop: "1rem" }}>
            {entries.map((e, i) => (
              <li key={i}>
                {dayNamesFromBinary(e.days)} <br /> {e.start} - {e.end}
                &emsp; every {e.every}s for {e.duration}s &emsp; show {e.name}
                &emsp;&emsp;
                <button onClick={() => removeEntry(i)}>🗑️ Delete</button>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "1rem" }}>
            <button onClick={save}>💾 Save Recurring</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecurringManager;
