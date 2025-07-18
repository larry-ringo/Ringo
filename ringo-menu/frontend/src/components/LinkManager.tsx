import React, { useEffect, useState } from "react";

interface LinkItem {
  name: string;
  link: string;
}

const API_BASE = import.meta.env.VITE_API_URL;

export default function LinkManager() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const [editingName, setEditingName] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newLink, setNewLink] = useState("");

  const fetchLinks = async () => {
    const res = await fetch(`${API_BASE}/links`);
    const data = await res.json();
    setLinks(data);
  };

  const addLink = async () => {
    if (!name || !link) return;

    const exists = links.some((l) => l.name === name);
    if (exists) {
      alert("A link with this name already exists.");
      return;
    }

    await fetch(`${API_BASE}/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });
    setName("");
    setLink("");
    fetchLinks();
    window.location.reload();
  };

  const deleteLink = async (name: string, link: string) => {
    await fetch(`${API_BASE}/links`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });
    fetchLinks();
    window.location.reload();
  };

  const saveEditedLink = async () => {
    if (!editingName) return;
    await fetch(`${API_BASE}/links`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        old_name: editingName,
        new_name: newName,
        link: newLink,
      }),
    });
    setEditingName(null);
    setNewName("");
    setNewLink("");
    fetchLinks();
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const copyLink = async (name: string, link: string) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      alert("Failed to copy the link.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Links</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{
            width: "90px",
            height: "2.5rem",
            padding: "0 0.5rem",
            fontSize: "1rem",
          }}
        />
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link"
          style={{
            flex: 1,
            height: "2.5rem",
            padding: "0 0.5rem",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={addLink}
          style={{
            height: "2.5rem",
            padding: "0 1rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          ➕ Add
        </button>
      </div>

      <ul>
        {links.map((l) => (
          <li key={l.name}>
            {editingName === l.name ? (
              <>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="New name"
                />
                <input
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="New link"
                />
                <button onClick={saveEditedLink} style={{ marginLeft: "0.5rem" }}>save</button>
                <button onClick={() => setEditingName(null)} style={{ marginLeft: "0.5rem" }}>cancel</button>
              </>
            ) : (
              <>
                <a href={l.link} style={{ marginLeft: "0.5rem" }} target="_blank">{l.name}</a>
                <button
                  onClick={() => {
                    setEditingName(l.name);
                    setNewName(l.name);
                    setNewLink(l.link);
                  }}
                  style={{ marginLeft: "0.5rem" }}
                >
                  ✏️ Edit
                </button>
                <button onClick={() => copyLink(l.name, l.link)} style={{ marginLeft: "0.5rem" }}>
                  🔗 Copy
                </button>
                {l.name !== "default" && l.name !== "default_mobile" && (
                  <button onClick={() => deleteLink(l.name, l.link)} style={{ marginLeft: "0.5rem" }}>
                    🗑️ Delete
                  </button>
                )}

              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
