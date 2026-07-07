import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/Layout";

import AdminLogin from "./pages/Login/AdminLogin";
import Captcha from "./components/common/Captcha";
import Dashboard from "./pages/Dashboard/Dashboard";

import TailorDetails from "./pages/Tailor/TailorDetails";
import AddTailor from "./pages/Tailor/AddTailor";
import FullDetails from "./pages/Tailor/TailorFullDetails";
import TailorApplications from "./pages/Tailor/TailorApplications";

import BridgeDetails from "./pages/Bridge/BridgeDetails";
import AddBridge from "./pages/Bridge/AddBridge";
import BridgeFullDetails from "./pages/Bridge/BridgeFullDetails";

import OrderDetails from "./pages/Order/OrderDetails";
import AddOrder from "./pages/Order/AddOrder";
import OrderFullDetails from "./pages/Order/OrderFullDetails";
import OrderQueue from "./pages/Order/OrderQueue";
import CategoryCatalog from "./pages/Catalog/CategoryCatalog";
import ServiceCatalog from "./pages/Catalog/ServiceCatalog";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/captcha" element={<Captcha />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/tailordetails" element={<TailorDetails />} />
            <Route path="/addtailor" element={<AddTailor />} />
            <Route path="/fulldetails" element={<FullDetails />} />
            <Route
              path="/tailor-applications"
              element={<TailorApplications />}
            />

            <Route path="/bridgedetail" element={<BridgeDetails />} />
            <Route path="/addbridge" element={<AddBridge />} />
            <Route
              path="/bridgefulldetails"
              element={<BridgeFullDetails />}
            />

            <Route path="/ordersdetails" element={<OrderDetails />} />
            <Route path="/addorder" element={<AddOrder />} />
            <Route path="/orderqueue" element={<OrderQueue />} />
            <Route
              path="/orderfulldetails"
              element={<OrderFullDetails />}
            />
             <Route path="/categorycatalog" element={<CategoryCatalog />} />
               <Route path="//servicecatalog" element={<ServiceCatalog />} />
          </Route>
      
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;