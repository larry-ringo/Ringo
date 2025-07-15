import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import donut from "../assets/about_mobile/donut.png";
import instaIcon from "../assets/insta_icon.png";
import phoneIcon from "../assets/phone_icon.png";
import locIcon from "../assets/loc_icon.png";
import emailIcon from "../assets/email_icon.png";
import logo from "../assets/logo.png";

const API_BASE = process.env.REACT_APP_API_URL;

// Dynamically load Kalam font
const loadFont = () => {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Kalam&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

const AboutMobile: React.FC = () => {
  useEffect(() => {
    loadFont();
  }, []);

  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#987384",
        color: "black",
        fontFamily: "'Kalam', cursive",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* Logo in top right */}
      <img
        src={logo}
        alt="Logo"
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          width: "50px",
          height: "auto",
        }}
      />

      {/* Intro */}
      <div style={{ fontSize: "1.1rem", lineHeight: "1.7", textAlign: "center", marginBottom: "0px" }}>
        <p>
          From the Founder of<br />
          Spread Bagelry<br />
          Comes a ‘Hole’ New Experience in<br />
          Coffee & Donuts
        </p>
        <p style={{ marginTop: "16px" }}>
          Homemade Pancake Donuts & Toppings<br />
          Sweet/Savory<br />
          Great Coffee
        </p>
      </div>

      {/* Donut Image */}
      <div style={{ width: "80%", maxWidth: "300px", marginBottom: "24px" }}>
        <img
          src={donut}
          alt="Donut"
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* Contact Info */}
      <div style={{ width: "100%", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <ContactRow icon={instaIcon} text="@ringocoffeeanddonuts" />
        <ContactRow icon={locIcon} text="2001 Federal St, Philadelphia, PA 19146" />
        <ContactRow icon={phoneIcon} text="(215) 594-2802" />
        <ContactRow icon={emailIcon} text="info@ringocoffee.com" />
      </div>

      {/* Email Form */}
      <div style={{ width: "100%", textAlign: "center", marginBottom: "32px" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}><i>Join our Inner Circle!</i></p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const email = (e.target as any).email.value;

            try {
              const response = await fetch(`${API_BASE}/emails`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ address: email }),
              });

              if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.detail || "Unknown error"}`);
              } else {
                alert("Thank you for joining the inner circle!");
                (e.target as any).reset();
              }
            } catch (err) {
              alert("An error occurred. Please try again later.");
              console.error(err);
            }
          }}

          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "5px 10px",
            width: "100%",
            maxWidth: "350px",
            margin: "0 auto",
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            style={{
              border: "none",
              outline: "none",
              padding: "8px",
              borderRadius: "20px",
              flex: 1,
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#bbb",
              border: "none",
              padding: "6px 16px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer style={{ fontSize: "0.6rem", opacity: 0.7, textAlign: "center" }}>
        &copy; 2025 Ringo Coffee & Donuts&nbsp;&nbsp;Designed by Arash Khavaran&nbsp;&nbsp;Icons by <a href="https://icons8.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Icons8</a>
      </footer>
    </div>
  );
};

const ContactRow = ({ icon, text }: { icon: string; text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <img src={icon} alt="icon" style={{ width: "24px", height: "24px" }} />
    <span style={{ fontSize: "1rem" }}>{text}</span>
  </div>
);

export default AboutMobile;
