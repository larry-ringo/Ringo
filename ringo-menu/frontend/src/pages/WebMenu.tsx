import React, { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL;

export default function WebMenu() {
  const [defaultEmbed, setDefaultEmbed] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetDefaultEmbed = async () => {
      try {
        const res = await fetch("http://18.119.151.11:8000/links");
        const data = await res.json();

        const defaultEntry = data.find((entry: { name: string }) => entry.name === "default");

        if (!defaultEntry || !defaultEntry.link) {
          alert("Default link error. Contact support.");
          return;
        }

        evaluateAndSet(defaultEntry.link);
      } catch (err) {
        console.error("❌ Failed to fetch default link:", err);
      }
    };

    const evaluateAndSet = (link: string) => {
      const embedUrl = link.includes("/view") && !link.includes("?embed")
        ? `${link}?embed`
        : link;

      setDefaultEmbed((prev) => {
        if (prev !== embedUrl) {
          console.log("🔄 Default link set to:", embedUrl);
          return embedUrl;
        }
        return prev;
      });
    };

    fetchAndSetDefaultEmbed();
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "0", paddingTop: "56.25%" }}>
      {defaultEmbed ? (
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
          src={defaultEmbed}
          allow="fullscreen"
          title="Ringo Schedule"
        />
      ) : (
        <p style={{ position: "absolute", top: "1rem", left: "1rem" }}>
          Loading menu...
        </p>
      )}
    </div>
  );
}
