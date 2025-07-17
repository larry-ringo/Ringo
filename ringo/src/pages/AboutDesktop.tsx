import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import donut from "../assets/about_desktop/donut.png";
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

const AboutDesktop: React.FC = () => {
  useEffect(() => {
    loadFont();
  }, []);

  const responsiveFont = `${Math.max(window.innerWidth * 0.015, 15)}px`;
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#6EB5D7",
        fontFamily: "'Kalam', cursive",
        color: "black",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Logo at top-right */}
      <img
        src={logo}
        alt="Logo"
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          height: "60px",
          objectFit: "contain",
          cursor: "pointer",
        }}
      />

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left Column */}
        <div
          style={{
            width: "20%",
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: responsiveFont,
            marginLeft: "3%"
          }}
        >
          {/* Intro Text */}
          <div style={{ lineHeight: "1.8" }}>
            <p>
              From the Founder of<br />
              Spread Bagelry<br />
              Comes a ‘Hole’ New Experience in<br />
              Coffee & Donuts
            </p>
            <p style={{ marginTop: "20px" }}>
              Homemade Pancake Donuts & Toppings<br />
              Sweet/Savory<br />
              Great Coffee
            </p>
          </div>

          {/* Email Form */}
          <div style={{ marginTop: "40px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ marginBottom: "10px" }}>
              <i>Join our Inner Circle!</i>
            </p>
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
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "20px",
                padding: "6px 8px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "8px 10px",
                  borderRadius: "20px",
                  fontSize: "1rem",
                  fontFamily: "Kalam",
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#0270BA",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontFamily: "Kalam",
                  marginLeft: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                Submit
              </button>
            </form>

          </div>
        </div>

        {/* Donut Center */}
        <div
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <img
            src={donut}
            alt="Donut"
            style={{
              maxHeight: "90%",
              maxWidth: "90%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Right Column Contact Info */}
        <div
          style={{
            width: "20%",
            height: "100%",
            padding: "0%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
            fontSize: responsiveFont,
            gap: "20px",
          }}
        >
          <a 
            href="https://www.instagram.com/ringocoffeeanddonuts/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ContactRow icon={instaIcon} text="@ringocoffeeanddonuts" />
          </a>

          <a 
            href="https://maps.app.goo.gl/oC333buvmotQSFiu8" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ContactRow icon={locIcon} text="2001 Federal St, Philadelphia, PA 19146" />
          </a>

          <a 
            href="tel:2155942802" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ContactRow icon={phoneIcon} text="(215) 594-2802" />
          </a>

          <a 
            href="mailto:info@ringocoffee.com" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ContactRow icon={emailIcon} text="info@ringocoffee.com" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "10px 0",
          fontSize: "0.9rem",
          backgroundColor: "#6EB5D7",
        }}
      >
        &copy; 2025 Ringo Coffee & Donuts&nbsp;&nbsp;&nbsp;&nbsp;Designed by Arash Khavaran&nbsp;&nbsp;&nbsp;&nbsp;Icons by <a href="https://icons8.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Icons8</a>
      </div>
    </div>
  );
};

const ContactRow = ({ icon, text }: { icon: string; text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <img src={icon} alt="icon" style={{ width: "56px", height: "56px" }} />
    <span style={{ whiteSpace: "pre-line" }}>{text}</span>
  </div>
);

export default AboutDesktop;
