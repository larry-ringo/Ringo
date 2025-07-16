import React, { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL;

export default function WebMenu() {
  const [embedLink, setEmbedLink] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // run once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAndSetEmbed = async () => {
      try {
        const res = await fetch(`${API_BASE}/links`);
        const data = await res.json();

        const targetName = isMobile ? "default_mobile" : "default";
        const targetEntry = data.find((entry: { name: string }) => entry.name === targetName);

        if (!targetEntry || !targetEntry.link) {
          alert(`${targetName} link error. Contact support.`);
          return;
        }

        evaluateAndSet(targetEntry.link);
      } catch (err) {
        console.error("❌ Failed to fetch embed link:", err);
      }
    };

    const evaluateAndSet = (link: string) => {
      const embedUrl = link.includes("/view") && !link.includes("?embed")
        ? `${link}?embed`
        : link;

      setEmbedLink((prev) => {
        if (prev !== embedUrl) {
          console.log("🔄 Embed link set to:", embedUrl);
          return embedUrl;
        }
        return prev;
      });
    };

    fetchAndSetEmbed();
  }, [isMobile]);

  const paddingTop = isMobile ? "225%" : "56.25%"; // taller ratio for mobile

  return (
    <div style={{ position: "relative", width: "100%", height: "0", paddingTop }}>
      {embedLink ? (
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
          src={embedLink}
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
