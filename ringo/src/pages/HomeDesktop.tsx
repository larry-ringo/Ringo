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
          href="https://ringo-coffee-donutsorder.square.site/#ZZDNQF2QVB6WCPOGV7G67OX6"
          rel="noopener noreferrer"
          aria-label="Menu"
          onMouseEnter={() => setImgSrc(hoverMenuImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 0 * scale,
            width: 590 * scale,
            height: 440 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/#ZZDNQF2QVB6WCPOGV7G67OX6"
          rel="noopener noreferrer"
          aria-label="Menu"
          onMouseEnter={() => setImgSrc(hoverMenuImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 590 * scale,
            width: 250 * scale,
            height: 275 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/#ZZDNQF2QVB6WCPOGV7G67OX6"
          rel="noopener noreferrer"
          aria-label="Menu"
          onMouseEnter={() => setImgSrc(hoverMenuImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 275 * scale,
            left: 590 * scale,
            width: 60 * scale,
            height: 60 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/#ZZDNQF2QVB6WCPOGV7G67OX6"
          rel="noopener noreferrer"
          aria-label="Menu"
          onMouseEnter={() => setImgSrc(hoverMenuImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 440 * scale,
            left: 100 * scale,
            width: 485 * scale,
            height: 90 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/#ZZDNQF2QVB6WCPOGV7G67OX6"
          rel="noopener noreferrer"
          aria-label="Menu"
          onMouseEnter={() => setImgSrc(hoverMenuImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 530 * scale,
            left: 200 * scale,
            width: 320 * scale,
            height: 50 * scale,
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
            left: 955 * scale,
            width: 581 * scale,
            height: 365 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://www.order.store/store/ringo-coffee-and-donuts-philadelphia/hgQweTNMTNeUQFJh-_ovmg"
          rel="noopener noreferrer"
          aria-label="Delivery"
          onMouseEnter={() => setImgSrc(hoverDeliveryImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 0 * scale,
            left: 897 * scale,
            width: 58 * scale,
            height: 309 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://www.order.store/store/ringo-coffee-and-donuts-philadelphia/hgQweTNMTNeUQFJh-_ovmg"
          rel="noopener noreferrer"
          aria-label="Delivery"
          onMouseEnter={() => setImgSrc(hoverDeliveryImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 365 * scale,
            left: 1430 * scale,
            width: 106 * scale,
            height: 75 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://www.order.store/store/ringo-coffee-and-donuts-philadelphia/hgQweTNMTNeUQFJh-_ovmg"
          rel="noopener noreferrer"
          aria-label="Delivery"
          onMouseEnter={() => setImgSrc(hoverDeliveryImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 365 * scale,
            left: 1360 * scale,
            width: 70 * scale,
            height: 30 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://www.order.store/store/ringo-coffee-and-donuts-philadelphia/hgQweTNMTNeUQFJh-_ovmg"
          rel="noopener noreferrer"
          aria-label="Delivery"
          onMouseEnter={() => setImgSrc(hoverDeliveryImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 430 * scale,
            left: 1470 * scale,
            width: 66 * scale,
            height: 30 * scale,
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
            height: 285 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pickup"
          onMouseEnter={() => setImgSrc(hoverPickupImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 550 * scale,
            left: 0 * scale,
            width: 85 * scale,
            height: 82 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pickup"
          onMouseEnter={() => setImgSrc(hoverPickupImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 615 * scale,
            left: 500 * scale,
            width: 140 * scale,
            height: 160 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pickup"
          onMouseEnter={() => setImgSrc(hoverPickupImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 640 * scale,
            left: 630 * scale,
            width: 40 * scale,
            height: 40 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <a
          href="https://ringo-coffee-donutsorder.square.site/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pickup"
          onMouseEnter={() => setImgSrc(hoverPickupImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 600 * scale,
            left: 550 * scale,
            width: 80 * scale,
            height: 20 * scale,
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
            top: 670 * scale,
            left: 700 * scale,
            width: 836 * scale,
            height: 248 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          onMouseEnter={() => setImgSrc(hoverAboutImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 410 * scale,
            left: 985 * scale,
            width: 350 * scale,
            height: 260 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          onMouseEnter={() => setImgSrc(hoverAboutImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 550 * scale,
            left: 1335 * scale,
            width: 201 * scale,
            height: 120 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          onMouseEnter={() => setImgSrc(hoverAboutImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 475 * scale,
            left: 1335 * scale,
            width: 130 * scale,
            height: 75 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
        <Link
          to="/about"
          onMouseEnter={() => setImgSrc(hoverAboutImg)}
          onMouseLeave={() => setImgSrc(defaultImg)}
          style={{
            position: "absolute",
            top: 435 * scale,
            left: 1335 * scale,
            width: 60 * scale,
            height: 40 * scale,
            display: "block",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default HomeDesktop;
