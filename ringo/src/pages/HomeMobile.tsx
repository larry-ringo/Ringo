import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../assets/home_mobile/default.png";

const DESIGN_WIDTH = 640;
const DESIGN_HEIGHT = 1136;

const HomeMobile: React.FC = () => {
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
          src={defaultImg}
          alt="Home Mobile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />

        {/* Example: Menu Link */}
        <a
          href="https://menu.ringocoffee.com/"
          rel="noopener noreferrer"
          aria-label="Menu"
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 448 * scale,
            width: 193 * scale,
            height: 612 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://menu.ringocoffee.com/"
          rel="noopener noreferrer"
          aria-label="Menu"
          style={{
            position: "absolute",
            top: 53 * scale,
            left: 280 * scale,
            width: 193 * scale,
            height: 385 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://menu.ringocoffee.com/"
          rel="noopener noreferrer"
          aria-label="Menu"
          style={{
            position: "absolute",
            top: 130 * scale,
            left: 240 * scale,
            width: 40 * scale,
            height: 280 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />

        {/* Example: Delivery Link */}
        <a
          href="https://www.order.store/store/ringo-coffee-and-donuts-philadelphia/hgQweTNMTNeUQFJh-_ovmg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Delivery"
          style={{
            position: "absolute",
            top: 665 * scale,
            left: 400 * scale,
            width: 240 * scale,
            height: 471 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://www.order.store/store/ringo-coffee-and-donuts-philadelphia/hgQweTNMTNeUQFJh-_ovmg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Delivery"
          style={{
            position: "absolute",
            top: 1050 * scale,
            left: 350 * scale,
            width: 50 * scale,
            height: 86 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />

        {/* Example: Pickup Link */}
        <a
          href="https://ringo-coffee-donutsorder.square.site/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pickup"
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 0 * scale,
            width: 200 * scale,
            height: 465 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pickup"
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 200 * scale,
            width: 40 * scale,
            height: 100 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pickup"
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 240 * scale,
            width: 40 * scale,
            height: 35 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pickup"
          style={{
            position: "absolute",
            top: 400 * scale,
            left: 150 * scale,
            width: 70 * scale,
            height: 90 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />

        {/* Example: About Us internal link */}
        <Link
          to="/about"
          style={{
            position: "absolute",
            top: 525 * scale,
            left: 0 * scale,
            width: 185 * scale,
            height: 611 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          style={{
            position: "absolute",
            top: 490 * scale,
            left: 0 * scale,
            width: 90 * scale,
            height: 35 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          style={{
            position: "absolute",
            top: 1030 * scale,
            left: 185 * scale,
            width: 85 * scale,
            height: 106 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          style={{
            position: "absolute",
            top: 1030 * scale,
            left: 270 * scale,
            width: 45 * scale,
            height: 50 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          style={{
            position: "absolute",
            top: 700 * scale,
            left: 0 * scale,
            width: 350 * scale,
            height: 330 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          style={{
            position: "absolute",
            top: 775 * scale,
            left: 350 * scale,
            width: 25 * scale,
            height: 190 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default HomeMobile;