import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowSchedule from "./pages/ShowSchedule";
import WebMenu from "./pages/WebMenu";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WebMenu />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/show/:schedule" element={<ShowSchedule />} />
      </Routes>
    </Router>
  );
}

export default App;
