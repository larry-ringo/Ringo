import React, { useState, useEffect } from "react";

interface PasswordGateProps {
  correctPassword: string;
  children: React.ReactNode;
}

export default function PasswordGate({ correctPassword, children }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dashboard_access_granted");
    const timestamp = localStorage.getItem("dashboard_access_time");

    if (saved === "true" && timestamp) {
      const now = Date.now();
      const elapsed = now - parseInt(timestamp, 10);

      const expire_time = 3600 * 1000
      if (elapsed < expire_time) {
        setGranted(true);
      } else {
        localStorage.removeItem("dashboard_access_granted");
        localStorage.removeItem("dashboard_access_time");
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctPassword) {
      localStorage.setItem("dashboard_access_granted", "true");
      localStorage.setItem("dashboard_access_time", Date.now().toString());
      setGranted(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  if (granted) return <>{children}</>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🔒 Enter Dashboard Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Unlock
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "15vh",
    fontFamily: "system-ui, sans-serif",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#4A90E2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
