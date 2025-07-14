import React, { useEffect, useState } from "react";

export default function Emails() {
  const [emails, setEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_BASE}/emails`)
      .then((res) => res.json())
      .then((data) => setEmails(data))
      .catch((err) => console.error("Failed to fetch emails:", err));
  }, []);

  const handleCopy = async () => {
    const text = emails.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy emails:", err);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <textarea
        readOnly
        value={emails.join("\n")}
        rows={10}
        className="border border-gray-300 rounded p-2 text-sm text-gray-800 resize-none overflow-y-scroll w-full"
        style={{ width: "100%", lineHeight: "1rem", boxSizing: "border-box" }}
      />
      <button
        onClick={handleCopy}
        className="mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
        disabled={emails.length === 0}
        style={{
          width: "100%",
          padding: "0.5rem 1rem",
          boxSizing: "border-box",
          fontSize: "0.875rem",
        }}
      >
        {copied ? "Copied!" : "Copy All"}
      </button>
    </div>
  );
}
