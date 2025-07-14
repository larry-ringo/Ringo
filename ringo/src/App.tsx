// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeDesktop from "./pages/HomeDesktop";
import HomeMobile from "./pages/HomeMobile";
import AboutDesktop from "./pages/AboutDesktop";
import AboutMobile from "./pages/AboutMobile";

function App() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default homepage route - auto-switches */}
        <Route path="/" element={isMobile ? <HomeMobile /> : <HomeDesktop />} />

        {/* Static route for /about */}
        <Route path="/about" element={isMobile? <AboutMobile /> : <AboutDesktop />} />

        {/* (Optional) force-desktop or force-mobile for testing */}
        <Route path="/desktop" element={<HomeDesktop />} />
        <Route path="/mobile" element={<HomeMobile />} />
      </Routes>
    </Router>
  );
}

export default App;
