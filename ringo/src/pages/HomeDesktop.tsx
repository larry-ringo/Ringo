import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import defaultImg from "../assets/home_desktop/default.png";
import hoverMenuImg from "../assets/home_desktop/hover_menu.png";
import hoverDeliveryImg from "../assets/home_desktop/hover_delivery.png";
import hoverPickupImg from "../assets/home_desktop/hover_pickup.png";
import hoverAboutImg from "../assets/home_desktop/hover_about.png";

const DESIGN_WIDTH = 1536;
const DESIGN_HEIGHT = 918;

const HomeDesktop: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(defaultImg);
  const [scale, setScale] = useState(1);

  const updateScale = () => {
    const widthScale = window.innerWidth / DESIGN_WIDTH;
    const heightScale = window.innerHeight / DESIGN_HEIGHT;
    setScale(Math.min(widthScale, heightScale));
  };

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#D1D1D1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: DESIGN_WIDTH * scale,
          height: DESIGN_HEIGHT * scale,
          position: "relative",
        }}
      >
        <img
          src={imgSrc}
          alt="Home"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />

        {/* External Menu link */}
        <a
          href="https://menu.ringocoffee.com/"
          rel="noopener noreferrer"
          aria-label="Menu"
          onMouseEnter={() => setImgSrc(hoverMenuImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 0 * scale,
            width: 800 * scale,
            height: 400 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />

        {/* External Delivery link */}
        <a
          href="https://www.order.store/store/ringo-coffee-and-donuts-philadelphia/hgQweTNMTNeUQFJh-_ovmg"
          rel="noopener noreferrer"
          aria-label="Delivery"
          onMouseEnter={() => setImgSrc(hoverDeliveryImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 893 * scale,
            width: 653 * scale,
            height: 365 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />

        {/* External Pickup link */}
        <a
          href="https://ringo-coffee-donutsorder.square.site/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pickup"
          onMouseEnter={() => setImgSrc(hoverPickupImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 632 * scale,
            left: 0 * scale,
            width: 630 * scale,
            height: 295 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />

        {/* Internal About Us link */}
        <Link
          to="/about"
          onMouseEnter={() => setImgSrc(hoverAboutImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 485 * scale,
            left: 850 * scale,
            width: 686 * scale,
            height: 433 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default HomeDesktop;
