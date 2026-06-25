import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Layout component ko import kiya
import AddBridge from "./components/AddBridge";
import BridgeDetails from "./components/BridgeDetails";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import TailorDetails from "./components/TailorDetails";
import AddTailor from "./components/AddTailor";
import FullDetails from "./components/FullDetails";
import Captcha from "./components/Captcha";
import TailorApplications from "./components/TailorApplications";
import OrderDetails from "./components/OrderDetails"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes  */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/captcha" element={<Captcha />} />

        {/* Protected Admin Routes  */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tailordetails" element={<TailorDetails />} />
          <Route path="/addtailor" element={<AddTailor />} />
          <Route path="/fulldetails" element={<FullDetails />} />
          <Route path="/bridgedetail" element={<BridgeDetails />} />
          <Route path="/addbridge" element={<AddBridge />} />
          <Route path="/ordersdetails" element={<OrderDetails />} />
          <Route path="/tailor-applications" element={<TailorApplications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;