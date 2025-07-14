import React, { useEffect, useState } from "react";

interface LinkItem {
  name: string;
  link: string;
}

export default function LinkManager() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // For editing
  const [editingName, setEditingName] = useState<string | null>(null); // stores the old name
  const [newName, setNewName] = useState("");
  const [newLink, setNewLink] = useState("");

  const fetchLinks = async () => {
    const res = await fetch("/api/links");
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

    await fetch("/api/links", {
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
    await fetch("/api/links", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }), // match FastAPI Link model
    });
    fetchLinks();
    window.location.reload();
  };

  const saveEditedLink = async () => {
    if (!editingName) return;
    await fetch("/api/links", {
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
                <button onClick={saveEditedLink}>save</button>
                <button onClick={() => setEditingName(null)}>cancel</button>
              </>
            ) : (
              <>
                <a href={l.link} style={{ marginLeft: "0.5rem" }}>{l.name}</a>
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
                {l.name !== "default" && (
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
