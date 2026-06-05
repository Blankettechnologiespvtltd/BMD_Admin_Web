import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatCards from "./components/StatCards";
import AuditModal from "./components/AuditModal";
import DashboardTab from "./tabs/DashboardTab";
import CustomerTab from "./tabs/CustomerTab";
import TailorTab from "./tabs/TailorTab";
import OrderTab from "./tabs/OrderTab";
import HelperTab from "./tabs/HelperTab";
import PaymentTab from "./tabs/PaymentTab";
import CatalogTab from "./tabs/CatalogTab";
import ReportingTab from "./tabs/ReportingTab";
import CampaignTab from "./tabs/CampaignTab";


import {
  INITIAL_CUSTOMERS,
  INITIAL_HELPERS,
  INITIAL_TAILORS,
  INITIAL_ORDERS,
  INITIAL_PAYMENTS,
  INITIAL_CATALOG,
  INITIAL_REPORTS,
  INITIAL_CAMPAIGNS
} from "./data/mockData";

export default function App() {

  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);


  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [helpers, setHelpers] = useState(INITIAL_HELPERS);
  const [tailors, setTailors] = useState(INITIAL_TAILORS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [catalog, setCatalog] = useState(INITIAL_CATALOG);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);

 
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null);


  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "", code: "", discount: "", status: "Running", reached: "0 Users", conversion: "0%", validTill: "", budget: ""
  });

  const stats = useMemo(() => {
    const activeCust = customers.filter((c) => c.active).length;
    const totalRevenue = payments
      .filter((p) => p.status === "Completed" || p.status.includes("Partial"))
      .reduce((acc, curr) => acc + curr.amount, 0);

    return {
      activeCust,
      totalRevenue: totalRevenue.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }),
    };
  }, [customers, payments]);

  
  const filterList = (list, keys) => {
    if (!searchQuery) return list;
    return list.filter((item) =>
      keys.some((key) => {
        const val = item[key];
        if (val === undefined || val === null) return false;
        return val.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  };

 
  const filteredCustomers = useMemo(() => filterList(customers, ["name", "email", "phone", "city", "tier"]), [customers, searchQuery]);
  const filteredTailors = useMemo(() => filterList(tailors, ["name", "shopName", "email", "specialty", "location"]), [tailors, searchQuery]);
  const filteredHelpers = useMemo(() => filterList(helpers, ["name", "phone", "region", "vehicle"]), [helpers, searchQuery]);
  const filteredOrders = useMemo(() => filterList(orders, ["orderId", "customer", "tailor", "helper", "service", "status"]), [orders, searchQuery]);
  const filteredPayments = useMemo(() => filterList(payments, ["transactionId", "orderId", "payer", "method", "status"]), [payments, searchQuery]);
  const filteredCatalog = useMemo(() => filterList(catalog, ["designName", "category", "fabricRecommended", "popularDemands"]), [catalog, searchQuery]);
  const filteredCampaigns = useMemo(() => filterList(campaigns, ["name", "code", "discount", "status"]), [campaigns, searchQuery]);


  const toggleCustomerStatus = (id) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  const toggleTailorStatus = (id) => {
    setTailors(tailors.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));
  };

  const toggleHelperStatus = (id) => {
    setHelpers(helpers.map((h) => (h.id === id ? { ...h, active: !h.active } : h)));
  };

  
  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.name || !newCampaign.code || !newCampaign.discount) return;
    setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1 }]);
    setShowAddCampaign(false);
    setNewCampaign({ name: "", code: "", discount: "", status: "Running", reached: "0 Users", conversion: "0%", validTill: "", budget: "" });
  };

  
  const openDetailModal = (item, type) => {
    setSelectedItem(item);
    setSelectedItemType(type);
  };

  const closeDetailModal = () => {
    setSelectedItem(null);
    setSelectedItemType(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
      />

      <div className="flex flex-1 flex-col md:flex-row relative">
        
        <Sidebar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={{
            customers: customers.length,
            helpers: helpers.length,
            tailors: tailors.length,
            orders: orders.length,
          }}
        />

        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-full">
         
          <StatCards 
            stats={stats} 
            counts={{ 
              customers: customers.length, 
              tailors: tailors.length, 
              orders: orders.length 
            }} 
            setActiveTab={setActiveTab} 
          />

          {activeTab === "dashboard" && (
            <DashboardTab orders={filteredOrders} openDetailModal={openDetailModal} />
          )}
          
          {activeTab === "customer" && (
            <CustomerTab list={filteredCustomers} toggleStatus={toggleCustomerStatus} openDetailModal={openDetailModal} />
          )}
          
          {activeTab === "tailor" && (
            <TailorTab list={filteredTailors} toggleStatus={toggleTailorStatus} openDetailModal={openDetailModal} />
          )}

          {activeTab === "order" && (
            <OrderTab list={filteredOrders} openDetailModal={openDetailModal} />
          )}

          {activeTab === "helper" && (
            <HelperTab list={filteredHelpers} toggleStatus={toggleHelperStatus} openDetailModal={openDetailModal} />
          )}

          {activeTab === "payment" && (
            <PaymentTab list={filteredPayments} openDetailModal={openDetailModal} />
          )}

          {activeTab === "catalog" && (
            <CatalogTab list={filteredCatalog} />
          )}

          {activeTab === "reporting" && (
            <ReportingTab list={reports} />
          )}
          
          {activeTab === "campaign" && (
            <CampaignTab
              list={filteredCampaigns}
              showAddCampaign={showAddCampaign}
              setShowAddCampaign={setShowAddCampaign}
              newCampaign={newCampaign}
              setNewCampaign={setNewCampaign}
              handleCreateCampaign={handleCreateCampaign}
            />
          )}
        </main>
      </div>

      
      <AuditModal 
        selectedItem={selectedItem} 
        selectedItemType={selectedItemType} 
        closeDetailModal={closeDetailModal} 
      />
    </div>
  );
}