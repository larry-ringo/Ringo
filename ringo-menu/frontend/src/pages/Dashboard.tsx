// pages/Dashboard.tsx
import React from "react";
import LinkManager from "../components/LinkManager";
import ScheduleManager from "../components/ScheduleManager";
import RecurringManager from "../components/RecurringManager";
import Emails from "../components/Emails";
import PasswordGate from "../components/PasswordGate";

export default function Dashboard() {
  return (
    <PasswordGate correctPassword="8844Real">
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>📋 Ringo Menu Dashboard</h1>
        </header>
        <main style={styles.mainWrapper}>
          <div style={styles.main}>
            <section style={styles.panelScheduleManager}>
              <h2 style={styles.panelTitle}>📅 Schedule Manager</h2>
              <ScheduleManager />
            </section>

            <section style={styles.panelRecurringManager}>
              <h2 style={styles.panelTitle}>⏰ Recurring Manager</h2>
              <RecurringManager />
            </section>

            <section style={styles.panelLinkManager}>
              <h2 style={styles.panelTitle}>🔗 Link Manager</h2>
              <LinkManager />
            </section>

            <section style={styles.panelEmails}>
              <h2 style={styles.panelTitle}>📨 Collected Emails</h2>
              <Emails />
            </section>
          </div>
        </main>
      </div>
    </PasswordGate>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "system-ui, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#4A90E2",
    padding: "1rem 2rem",
    color: "#fff",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
  },
  mainWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: "2560px",
    width: "100%",
  },
  panelLinkManager: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    flex: 1,
    minWidth: "400px",
    maxWidth: "400px",
  },
  panelEmails: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    flex: 1,
    minWidth: "300px",
    maxWidth: "300px",
  },
  panelScheduleManager: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    flex: 2,
    minWidth: "400px",
    maxWidth: "670px",
  },
  panelRecurringManager: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    flex: 2,
    minWidth: "400px",
    maxWidth: "860px",
  },
  panelTitle: {
    marginTop: 0,
    marginBottom: "1rem",
    fontSize: "1.5rem",
    color: "#333",
  },
};
