import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Layout component ko import kiya
import AddBridge from "./components/AddBridge";
import BridgeDetails from "./components/BridgeDetails";
import BridgeFullDetails from "./components/BridgeFullDetails"
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import TailorDetails from "./components/TailorDetails";
import AddTailor from "./components/AddTailor";
import FullDetails from "./components/TailorFullDetails";
import Captcha from "./components/Captcha";
import TailorApplications from "./components/TailorApplications";
import OrderDetails from "./components/OrderDetails"
import AddOrder from "./components/AddOrder";
import OrderFullDetails from "./components/OrderFullDetails";
import OrderQueue from "./components/OrderQueue"

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
            <Route path="/bridgefulldetails" element={<BridgeFullDetails />} />
               <Route path="/addorder" element={<AddOrder />} />
          <Route path="/ordersdetails" element={<OrderDetails />} />
           <Route path="/orderqueue" element={<OrderQueue />} />
             {/* <Route path="/orderfulldetails" element={<OrderFullDetails />} /> */}
             <Route path="/orderfulldetails" element={<OrderFullDetails />} />
          <Route path="/tailor-applications" element={<TailorApplications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
