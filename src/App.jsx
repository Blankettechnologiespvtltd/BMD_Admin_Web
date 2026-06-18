import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import DarziLogin from "./components/DarziLogin";
import TailorDetails from "./components/TailorDetails";
import AddTailor from "./components/AddTailor";
import FullDetails from "./components/FullDetails";
import Captcha from "./components/Captcha";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<AdminLogin />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Tailor Details */}
        <Route path="/tailorDetails" element={<TailorDetails />} />

        {/* Add Tailor */}
        <Route path="/addtailor" element={<AddTailor />} />

        {/* Full Details */}
        <Route path="/fulldetails" element={<FullDetails />} />

        {/* Darzi Login */}
        <Route path="/darziLogin" element={<DarziLogin />} />

        {/* Captcha */}
        <Route path="/captcha" element={<Captcha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;