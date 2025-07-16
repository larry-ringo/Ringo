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
          aria-label="Delivery"
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 320 * scale,
            width: 320 * scale,
            height: 540 * scale,
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
            top: 660 * scale,
            left: 400 * scale,
            width: 240 * scale,
            height: 476 * scale,
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
            top: 600 * scale,
            left: 340 * scale,
            width: 40 * scale,
            height: 60 * scale,
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
            top: 620 * scale,
            left: 360 * scale,
            width: 50 * scale,
            height: 60 * scale,
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
            width: 205 * scale,
            height: 460 * scale,
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
            top: 460 * scale,
            left: 205 * scale,
            width: 40 * scale,
            height: 60 * scale,
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
            top: 460 * scale,
            left: 120 * scale,
            width: 80 * scale,
            height: 30 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />

        {/* Example: About Us internal link */}
        <Link
          to="/about"
          style={{
            position: "absolute",
            top: 580 * scale,
            left: 0 * scale,
            width: 270 * scale,
            height: 556 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          style={{
            position: "absolute",
            top: 500 * scale,
            left: 0 * scale,
            width: 130 * scale,
            height: 636 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          style={{
            position: "absolute",
            top: 650 * scale,
            left: 0 * scale,
            width: 330 * scale,
            height: 400 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default HomeMobile;
