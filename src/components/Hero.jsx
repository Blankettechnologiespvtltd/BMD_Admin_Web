import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Scissors, 
  ShoppingBag, 
  CreditCard, 
  BookOpen, 
  BarChart3, 
  Tag, 
  Search, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  TrendingUp, 
  Truck, 
  DollarSign, 
  Layers,
  ChevronRight,
  Info,
  Sliders,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Eye,
  Settings,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================

const INITIAL_CUSTOMERS = [
  { id: 1, name: "Aarav Sharma", email: "aarav.sharma@example.com", phone: "+91 98765 43210", active: true, joined: "2026-01-15", ordersCount: 14, totalSpend: 18500, city: "New Delhi", tier: "Gold Member", preferredStyle: "Sherwani & Bandhgala" },
  { id: 2, name: "Priya Patel", email: "priya.patel@example.com", phone: "+91 91234 56789", active: true, joined: "2026-02-10", ordersCount: 8, totalSpend: 9200, city: "Mumbai", tier: "Silver Member", preferredStyle: "Anarkali Suits" },
  { id: 3, name: "Rahul Verma", email: "rahul.verma@example.com", phone: "+91 93456 78901", active: false, joined: "2025-11-05", ordersCount: 22, totalSpend: 34000, city: "Bangalore", tier: "Platinum Member", preferredStyle: "Custom Slim-fit Suits" },
  { id: 4, name: "Ananya Iyer", email: "ananya.iyer@example.com", phone: "+91 95678 12345", active: true, joined: "2026-03-01", ordersCount: 5, totalSpend: 6100, city: "Chennai", tier: "Bronze Member", preferredStyle: "Kanjeevaram Saree Blouses" },
  { id: 5, name: "Vikram Singh", email: "vikram.singh@example.com", phone: "+91 97890 54321", active: true, joined: "2026-04-18", ordersCount: 11, totalSpend: 15800, city: "Jaipur", tier: "Gold Member", preferredStyle: "Kurtas & Nehru Jackets" },
  { id: 6, name: "Sneha Reddy", email: "sneha.reddy@example.com", phone: "+91 99012 34567", active: true, joined: "2026-05-12", ordersCount: 3, totalSpend: 4200, city: "Hyderabad", tier: "Bronze Member", preferredStyle: "Designer Lehenga-Choli" }
];

const INITIAL_HELPERS = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh.k@bookmydarzi.com", phone: "+91 81234 56780", active: true, region: "South Delhi Area", assignedTailors: 4, rating: 4.8, completedPickups: 145, vehicle: "Two-Wheeler (Activa)" },
  { id: 2, name: "Amit Gond", email: "amit.gond@bookmydarzi.com", phone: "+91 83456 78902", active: true, region: "Andheri West, Mumbai", assignedTailors: 6, rating: 4.5, completedPickups: 210, vehicle: "Two-Wheeler (Splendor)" },
  { id: 3, name: "Sunita Das", email: "sunita.das@bookmydarzi.com", phone: "+91 85678 90123", active: false, region: "Indiranagar, Bangalore", assignedTailors: 3, rating: 4.9, completedPickups: 98, vehicle: "Electric Scooter" },
  { id: 4, name: "Suresh Pillai", email: "suresh.p@bookmydarzi.com", phone: "+91 87890 12345", active: true, region: "Adyar, Chennai", assignedTailors: 5, rating: 4.2, completedPickups: 134, vehicle: "Two-Wheeler (Pulsar)" },
  { id: 5, name: "Deepak Jangid", email: "deepak.j@bookmydarzi.com", phone: "+91 89012 34567", active: true, region: "C-Scheme, Jaipur", assignedTailors: 4, rating: 4.7, completedPickups: 167, vehicle: "Two-Wheeler (Jupiter)" }
];

const INITIAL_TAILORS = [
  { id: 1, name: "Master Gulam Nabi", email: "gulam.tailors@example.com", shopName: "Nabi Royal Creations", phone: "+91 70123 45678", active: true, specialty: "Sherwanis & Heavy Indo-Westerns", activeOrders: 7, rating: 4.9, location: "Chandni Chowk, Delhi", experience: "25 Years" },
  { id: 2, name: "Mohammad Salim", email: "salim.cuts@example.com", shopName: "Salim Fits & Drapes", phone: "+91 71234 56789", active: true, specialty: "Western Mens Suits & Blazers", activeOrders: 4, rating: 4.7, location: "Bandra, Mumbai", experience: "18 Years" },
  { id: 3, name: "Sangeeta Boutique", email: "sangeeta.b@example.com", shopName: "Sangeeta Designer Hub", phone: "+91 72345 67890", active: true, specialty: "Bridal Lehengas & Blouse Art", activeOrders: 9, rating: 4.6, location: "Koramanagala, Bangalore", experience: "12 Years" },
  { id: 4, name: "Karan Johar Tailors", email: "karan.tailoring@example.com", shopName: "Karan Modern Tailoring", phone: "+91 73456 78901", active: false, specialty: "Daily wear Salwar Suits & Kurtis", activeOrders: 0, rating: 4.1, location: "T-Nagar, Chennai", experience: "15 Years" },
  { id: 5, name: "Rajputana Tailoring House", email: "rajputana.fits@example.com", shopName: "Rajputana Poshak Emporium", phone: "+91 74567 89012", active: true, specialty: "Traditional Rajputi Poshaks", activeOrders: 5, rating: 4.8, location: "Johri Bazar, Jaipur", experience: "30 Years" }
];

const INITIAL_ORDERS = [
  { id: 1, orderId: "BMD-2026-9041", customer: "Aarav Sharma", tailor: "Nabi Royal Creations", helper: "Rajesh Kumar", service: "Premium Velvet Sherwani", status: "In Stitching", amount: 12500, orderDate: "2026-05-28", deliveryDate: "2026-06-10", fabricProvided: "Yes (Customer)" },
  { id: 2, orderId: "BMD-2026-9042", customer: "Priya Patel", tailor: "Sangeeta Designer Hub", helper: "Amit Gond", service: "Bridal Lehenga Custom Alter", status: "Measurement Done", amount: 6500, orderDate: "2026-06-01", deliveryDate: "2026-06-14", fabricProvided: "No (Selected from Catalog)" },
  { id: 3, orderId: "BMD-2026-9043", customer: "Rahul Verma", tailor: "Salim Fits & Drapes", helper: "Sunita Das", service: "3-Piece Tuxedo Suit", status: "Out for Delivery", amount: 14500, orderDate: "2026-05-20", deliveryDate: "2026-06-04", fabricProvided: "No (Italian Wool Premium)" },
  { id: 4, orderId: "BMD-2026-9044", customer: "Ananya Iyer", tailor: "Karan Modern Tailoring", helper: "Suresh Pillai", service: "Kanjeevaram Blouse with Zardozi Work", status: "Delivered", amount: 3500, orderDate: "2026-05-15", deliveryDate: "2026-05-25", fabricProvided: "Yes (Customer)" },
  { id: 5, orderId: "BMD-2026-9045", customer: "Vikram Singh", tailor: "Rajputana Poshak Emporium", helper: "Deepak Jangid", service: "Georgette Rajputi Poshak", status: "Measurement Scheduled", amount: 11000, orderDate: "2026-06-03", deliveryDate: "2026-06-20", fabricProvided: "No (Royal Silk Chiffon)" },
  { id: 6, orderId: "BMD-2026-9046", customer: "Sneha Reddy", tailor: "Sangeeta Designer Hub", helper: "Amit Gond", service: "Silk Lehenga Stitching", status: "In Stitching", amount: 7800, orderDate: "2026-05-29", deliveryDate: "2026-06-12", fabricProvided: "Yes (Customer)" }
];

const INITIAL_PAYMENTS = [
  { id: 1, transactionId: "TXN-88412093", orderId: "BMD-2026-9041", payer: "Aarav Sharma", amount: 12500, method: "UPI (Google Pay)", status: "Completed", date: "2026-05-28 14:22" },
  { id: 2, transactionId: "TXN-88412094", orderId: "BMD-2026-9042", payer: "Priya Patel", amount: 3250, method: "Credit Card (HDFC)", status: "Partial (50%)", date: "2026-06-01 11:05" },
  { id: 3, transactionId: "TXN-88412095", orderId: "BMD-2026-9043", payer: "Rahul Verma", amount: 14500, method: "Netbanking (ICICI)", status: "Completed", date: "2026-05-20 18:40" },
  { id: 4, transactionId: "TXN-88412096", orderId: "BMD-2026-9044", payer: "Ananya Iyer", amount: 3500, method: "UPI (PhonePe)", status: "Completed", date: "2026-05-15 09:12" },
  { id: 5, transactionId: "TXN-88412097", orderId: "BMD-2026-9045", payer: "Vikram Singh", amount: 5500, method: "Cash On Measurement", status: "Pending", date: "2026-06-03 10:00" },
  { id: 6, transactionId: "TXN-88412098", orderId: "BMD-2026-9046", payer: "Sneha Reddy", amount: 7800, method: "UPI (Paytm)", status: "Completed", date: "2026-05-29 16:30" }
];

const INITIAL_CATALOG = [
  { id: 1, category: "Men's Ethnic", designName: "Royal Bandhgala Sherwani", basePrice: 8500, turnaroundTime: "12 Days", status: "Active", popularDemands: "High", designsAvailable: 24, fabricRecommended: "Velvet, Silk Brocade" },
  { id: 2, category: "Women's Ethnic", designName: "Heavy Zardozi Bridal Lehenga", basePrice: 15000, turnaroundTime: "20 Days", status: "Active", popularDemands: "Trending", designsAvailable: 38, fabricRecommended: "Raw Silk, Net, Georgette" },
  { id: 3, category: "Men's Western", designName: "Italian Fitted Two-Piece Suit", basePrice: 9500, turnaroundTime: "10 Days", status: "Active", popularDemands: "Medium", designsAvailable: 15, fabricRecommended: "Premium Merino Wool, Cotton Blends" },
  { id: 4, category: "Women's Western", designName: "Chic A-Line Evening Gown", basePrice: 7000, turnaroundTime: "8 Days", status: "Active", popularDemands: "Medium", designsAvailable: 12, fabricRecommended: "Satin, Crepe, Organza" },
  { id: 5, category: "Women's Ethnic", designName: "Designer Saree Blouse (Maggal/Aari)", basePrice: 2200, turnaroundTime: "6 Days", status: "Active", popularDemands: "Very High", designsAvailable: 45, fabricRecommended: "Silk, Cotton-Silk" },
  { id: 6, category: "Casual Essentials", designName: "Handcrafted Kurta & Pajama Combo", basePrice: 1800, turnaroundTime: "5 Days", status: "Maintenance", popularDemands: "Low", designsAvailable: 8, fabricRecommended: "Organic Cotton, Khadi" }
];

const INITIAL_REPORTS = [
  { id: 1, period: "May 2026", revenue: 425000, newSignups: 420, ordersCompleted: 218, tailorPayout: 295000, profitMargin: "30.5%" },
  { id: 2, period: "April 2026", revenue: 380000, newSignups: 350, ordersCompleted: 190, tailorPayout: 260000, profitMargin: "31.5%" },
  { id: 3, period: "March 2026", revenue: 310000, newSignups: 290, ordersCompleted: 165, tailorPayout: 215000, profitMargin: "30.6%" },
  { id: 4, period: "February 2026", revenue: 275000, newSignups: 210, ordersCompleted: 130, tailorPayout: 190000, profitMargin: "30.9%" },
  { id: 5, period: "January 2026", revenue: 240000, newSignups: 180, ordersCompleted: 110, tailorPayout: 165000, profitMargin: "31.2%" }
];

const INITIAL_CAMPAIGNS = [
  { id: 1, name: "Wedding Season Special", code: "WEDDARZI15", discount: "15% OFF", status: "Running", reached: "12,500 Users", conversion: "8.5%", validTill: "2026-06-30", budget: "₹15,000" },
  { id: 2, name: "First Order Trial Gift", code: "FIRSTFIT", discount: "Flat ₹500 OFF", status: "Running", reached: "4,200 Users", conversion: "14.2%", validTill: "2026-12-31", budget: "₹25,000" },
  { id: 3, name: "Eid Festive Grand Sale", code: "EIDMUBARAK", discount: "20% OFF", status: "Completed", reached: "22,000 Users", conversion: "11.8%", validTill: "2026-04-15", budget: "₹40,000" },
  { id: 4, name: "Weekend Styling Rush Offer", code: "WEEKEND7", discount: "Free Express Stitching", status: "Paused", reached: "3,100 Users", conversion: "5.4%", validTill: "2026-06-15", budget: "₹8,000" },
  { id: 5, name: "Father & Son Matching Promo", code: "ROYALDAD", discount: "Flat 10% on Combo", status: "Running", reached: "6,400 Users", conversion: "6.9%", validTill: "2026-06-25", budget: "₹12,000" }
];


export default function App() {
  // Navigation State
  // "dashboard", "customer", "helper", "tailor", "order", "payment", "catalog", "reporting", "campaign"
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Data States (For CRUD-like local actions & detail selections)
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [helpers, setHelpers] = useState(INITIAL_HELPERS);
  const [tailors, setTailors] = useState(INITIAL_TAILORS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [catalog, setCatalog] = useState(INITIAL_CATALOG);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);

  // Detail Modal State
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null); // 'customer', 'helper', 'tailor', etc.

  // Profile Menu State
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Add Campaign Form State (Inline Quick-Add)
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "", code: "", discount: "", status: "Running", reached: "0 Users", conversion: "0%", validTill: "", budget: ""
  });

  // Calculate high-level stats dynamically
  const stats = useMemo(() => {
    const activeCust = customers.filter(c => c.active).length;
    const totalTailors = tailors.length;
    const totalOrders = orders.length;
    const totalRevenue = payments
      .filter(p => p.status === "Completed" || p.status.includes("Partial"))
      .reduce((acc, curr) => acc + (curr.status.includes("Partial") ? curr.amount : curr.amount), 0);

    return {
      activeCust,
      totalTailors,
      totalOrders,
      totalRevenue: totalRevenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
    };
  }, [customers, tailors, orders, payments]);

  // Handle Search Input Action across active tables
  const filterList = (list, keys) => {
    if (!searchQuery) return list;
    return list.filter(item => 
      keys.some(key => {
        const val = item[key];
        if (val === undefined || val === null) return false;
        return val.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  };

  // Filtered lists for the active visible tables
  const filteredCustomers = useMemo(() => filterList(customers, ['name', 'email', 'phone', 'city', 'tier']), [customers, searchQuery]);
  const filteredHelpers = useMemo(() => filterList(helpers, ['name', 'email', 'phone', 'region', 'vehicle']), [helpers, searchQuery]);
  const filteredTailors = useMemo(() => filterList(tailors, ['name', 'shopName', 'email', 'specialty', 'location']), [tailors, searchQuery]);
  const filteredOrders = useMemo(() => filterList(orders, ['orderId', 'customer', 'tailor', 'helper', 'service', 'status']), [orders, searchQuery]);
  const filteredPayments = useMemo(() => filterList(payments, ['transactionId', 'orderId', 'payer', 'method', 'status']), [payments, searchQuery]);
  const filteredCatalog = useMemo(() => filterList(catalog, ['category', 'designName', 'popularDemands', 'fabricRecommended']), [catalog, searchQuery]);
  const filteredCampaigns = useMemo(() => filterList(campaigns, ['name', 'code', 'discount', 'status']), [campaigns, searchQuery]);

  // Handle Status Toggles
  const toggleCustomerStatus = (id) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };
  const toggleHelperStatus = (id) => {
    setHelpers(helpers.map(h => h.id === id ? { ...h, active: !h.active } : h));
  };
  const toggleTailorStatus = (id) => {
    setTailors(tailors.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  // Quick Action: Add Campaign Submission
  const handleCreateCampaign = (e) => {           };

  // Open Detail Dialog Utility
  const openDetailModal = (item, type) => {
    setSelectedItem(item);
    setSelectedItemType(type);
  };

  // Close Detail Dialog
  const closeDetailModal = () => {
    setSelectedItem(null);
    setSelectedItemType(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* HEADER SECTION */}
      <header className="bg-teal-950 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          
          {/* Brand Logo & Sidebar toggle */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-1.5 rounded-lg hover:bg-teal-800 transition md:hidden focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <Menu size={24} className="text-orange-500" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-orange-500 p-2 rounded-xl flex items-center justify-center shadow-md">
                <Scissors className="text-teal-950 transform -rotate-45" size={20} strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-black tracking-wider text-white">BookMy<span className="text-orange-500">Darzi</span></span>
                <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-teal-800 text-teal-300 rounded border border-teal-700">Admin</span>
              </div>
            </div>
          </div>

          {/* Global Dynamic Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </span>
              <input
                type="text"
                className="w-full bg-teal-900/60 border border-teal-800 text-teal-100 placeholder-teal-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-teal-900 pl-10 pr-4 py-2 transition"
                placeholder={`Search current table...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-teal-300 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Profile & Notifications */}
          <div className="flex items-center space-x-4 relative">
            
            {/* Notification trigger */}
            <div className="relative">
              <button 
                onClick={() => { setNotificationOpen(!notificationOpen); setProfileOpen(false); }}
                className="p-2 rounded-full text-slate-300 hover:text-orange-500 hover:bg-teal-900 transition focus:outline-none"
              >
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                <Bell size={20} />
              </button>
              
              {notificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-teal-950 text-white font-semibold text-sm flex justify-between items-center">
                    <span>Notifications</span>
                    <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full">3 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    <div className="p-3 hover:bg-slate-50 transition text-xs">
                      <p className="font-bold text-slate-900">New Order Placed!</p>
                      <p className="text-slate-500 mt-0.5">Order #BMD-2026-9046 by Sneha Reddy</p>
                      <span className="text-[10px] text-teal-600 font-medium">2 mins ago</span>
                    </div>
                    <div className="p-3 hover:bg-slate-50 transition text-xs">
                      <p className="font-bold text-slate-900">Helper Assigned</p>
                      <p className="text-slate-500 mt-0.5">Amit Gond checked in for order collection.</p>
                      <span className="text-[10px] text-teal-600 font-medium">1 hour ago</span>
                    </div>
                    <div className="p-3 hover:bg-slate-50 transition text-xs">
                      <p className="font-bold text-orange-600">Tailor Capacity Alert</p>
                      <p className="text-slate-500 mt-0.5">Master Gulam Nabi has reached 7 active orders.</p>
                      <span className="text-[10px] text-teal-600 font-medium">3 hours ago</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-slate-50 text-center border-t border-slate-100">
                    <button onClick={() => setNotificationOpen(false)} className="text-xs text-teal-700 font-bold hover:text-orange-600">Dismiss All</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile trigger */}
            <div className="relative">
              <button 
                onClick={() => { setProfileOpen(!profileOpen); setNotificationOpen(false); }}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-teal-900 transition focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  AD
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-white">Aniket Darzi</p>
                  <p className="text-[10px] text-orange-400 font-medium">Super Admin</p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 z-50 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 text-center bg-slate-50">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xl mx-auto shadow-md mb-2">
                      AD
                    </div>
                    <p className="font-bold text-slate-800">Aniket Darzi</p>
                    <p className="text-xs text-slate-500">aniket.darzi@bookmydarzi.com</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => { setProfileOpen(false); alert("Opening Profile Settings..."); }} 
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition"
                    >
                      <Settings size={16} />
                      <span>Account Settings</span>
                    </button>
                    <button 
                      onClick={() => { setProfileOpen(false); alert("Logged out successfully! (Simulation)"); }} 
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* BODY CONTENT WRAPPER */}
      <div className="flex flex-1 flex-col md:flex-row relative">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`
          bg-teal-900 text-slate-100 flex-shrink-0 w-64 md:block transition-all duration-300 z-30
          absolute md:relative inset-y-0 left-0 transform md:transform-none
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          border-r border-teal-850 flex flex-col justify-between shadow-lg md:shadow-none
        `}>
          <div>
            {/* Header info in Mobile Sidebar */}
            <div className="p-4 bg-teal-950 flex items-center justify-between md:hidden border-b border-teal-850">
              <span className="font-extrabold text-orange-500">Navigation Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orange-500">
                <X size={20} />
              </button>
            </div>

            {/* Menu Sections */}
            <div className="px-3 py-4 space-y-6">
              
              {/* Primary Management Group */}
              <div>
                <span className="px-3 text-[10px] font-semibold text-teal-300 uppercase tracking-widest block mb-2">Main Controls</span>
                <nav className="space-y-1">
                  <button
                    onClick={() => { setActiveTab("dashboard"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === "dashboard" 
                        ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1" 
                        : "hover:bg-teal-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <BarChart3 size={18} className={activeTab === "dashboard" ? "text-teal-950" : "text-orange-400"} />
                      <span>Overview Admin</span>
                    </div>
                    <ChevronRight size={14} className={activeTab === "dashboard" ? "text-teal-950" : "text-teal-500"} />
                  </button>
                </nav>
              </div>

              {/* User Management Dropdown Section */}
              <div>
                <span className="px-3 text-[10px] font-semibold text-teal-300 uppercase tracking-widest block mb-2">User Registry</span>
                <nav className="space-y-1">
                  <button
                    onClick={() => { setActiveTab("customer"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === "customer" 
                        ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1" 
                        : "hover:bg-teal-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Users size={18} className={activeTab === "customer" ? "text-teal-950" : "text-orange-400"} />
                      <span>Customers</span>
                    </div>
                    <span className="bg-teal-800 text-teal-200 text-xs px-2 py-0.5 rounded-full font-normal">
                      {customers.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab("helper"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === "helper" 
                        ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1" 
                        : "hover:bg-teal-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Truck size={18} className={activeTab === "helper" ? "text-teal-950" : "text-orange-400"} />
                      <span>Helpers (Bridge)</span>
                    </div>
                    <span className="bg-teal-800 text-teal-200 text-xs px-2 py-0.5 rounded-full font-normal">
                      {helpers.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab("tailor"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === "tailor" 
                        ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1" 
                        : "hover:bg-teal-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Scissors size={18} className={activeTab === "tailor" ? "text-teal-950" : "text-orange-400"} />
                      <span>Tailors / Vendors</span>
                    </div>
                    <span className="bg-teal-800 text-teal-200 text-xs px-2 py-0.5 rounded-full font-normal">
                      {tailors.length}
                    </span>
                  </button>
                </nav>
              </div>

              {/* Transactions & Deliveries */}
              <div>
                <span className="px-3 text-[10px] font-semibold text-teal-300 uppercase tracking-widest block mb-2">Core Operations</span>
                <nav className="space-y-1">
                  <button
                    onClick={() => { setActiveTab("order"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === "order" 
                        ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1" 
                        : "hover:bg-teal-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingBag size={18} className={activeTab === "order" ? "text-teal-950" : "text-orange-400"} />
                      <span>Order Book</span>
                    </div>
                    <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full font-normal">
                      {orders.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab("payment"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === "payment" 
                        ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1" 
                        : "hover:bg-teal-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard size={18} className={activeTab === "payment" ? "text-teal-950" : "text-orange-400"} />
                      <span>Payments</span>
                    </div>
                    <ChevronRight size={14} className={activeTab === "payment" ? "text-teal-950" : "text-teal-500"} />
                  </button>
                </nav>
              </div>

              {/* Products & Marketing */}
              <div>
                <span className="px-3 text-[10px] font-semibold text-teal-300 uppercase tracking-widest block mb-2">Assets & Promotion</span>
                <nav className="space-y-1">
                  <button
                    onClick={() => { setActiveTab("catalog"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === "catalog" 
                        ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1" 
                        : "hover:bg-teal-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen size={18} className={activeTab === "catalog" ? "text-teal-950" : "text-orange-400"} />
                      <span>Style Catalog</span>
                    </div>
                    <ChevronRight size={14} className={activeTab === "catalog" ? "text-teal-950" : "text-teal-500"} />
                  </button>

                  <button
                    onClick={() => { setActiveTab("reporting"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === "reporting" 
                        ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1" 
                        : "hover:bg-teal-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <BarChart3 size={18} className={activeTab === "reporting" ? "text-teal-950" : "text-orange-400"} />
                      <span>Reporting & BI</span>
                    </div>
                    <ChevronRight size={14} className={activeTab === "reporting" ? "text-teal-950" : "text-teal-500"} />
                  </button>

                  <button
                    onClick={() => { setActiveTab("campaign"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === "campaign" 
                        ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1" 
                        : "hover:bg-teal-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Tag size={18} className={activeTab === "campaign" ? "text-teal-950" : "text-orange-400"} />
                      <span>Campaigns & Offers</span>
                    </div>
                    <ChevronRight size={14} className={activeTab === "campaign" ? "text-teal-950" : "text-teal-500"} />
                  </button>
                </nav>
              </div>

            </div>
          </div>

          {/* Quick Support Information */}
          <div className="p-4 bg-teal-950/80 m-3 rounded-xl border border-teal-850 text-xs">
            <p className="font-semibold text-slate-200">BookMyDarzi Desk</p>
            <p className="text-slate-400 mt-1">Need help with custom fits, tailors or operations?</p>
            <a href="tel:+919876543210" className="inline-block mt-2 font-bold text-orange-400 hover:underline">
              Call Tech Support
            </a>
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-full">
          
          {/* MOBILE SEARCH BAR */}
          <div className="mb-6 md:hidden">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </span>
              <input
                type="text"
                className="w-full bg-white border border-slate-300 text-slate-800 placeholder-slate-400 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10 pr-4 py-2"
                placeholder="Search matching results..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* TOP DASHBOARD 4 STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* Card 1: Active Customers */}
            <div 
              onClick={() => setActiveTab("customer")}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-orange-500 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-teal-50 text-teal-700 rounded-xl group-hover:bg-teal-700 group-hover:text-white transition-all duration-300">
                  <Users size={22} />
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded-full flex items-center gap-0.5">
                  <TrendingUp size={10} /> +12% MoM
                </span>
              </div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Active Customers</p>
              <h3 className="text-3xl font-black text-teal-950 mt-1">{stats.activeCust} <span className="text-xs text-slate-400 font-normal">of {customers.length} total</span></h3>
              <p className="text-[11px] text-teal-700 font-medium mt-2 flex items-center gap-1 group-hover:text-orange-500">
                View all profiles <ChevronRight size={12} />
              </p>
            </div>

            {/* Card 2: Registered Tailors */}
            <div 
              onClick={() => setActiveTab("tailor")}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-orange-500 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Scissors size={22} className="transform -rotate-45" />
                </div>
                <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-1 rounded-full">
                  5 Hub Locations
                </span>
              </div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Design Tailors / Vendors</p>
              <h3 className="text-3xl font-black text-teal-950 mt-1">{stats.totalTailors} <span className="text-xs text-slate-400 font-normal">Verified Boutiques</span></h3>
              <p className="text-[11px] text-teal-700 font-medium mt-2 flex items-center gap-1 group-hover:text-orange-500">
                Manage vendor capabilities <ChevronRight size={12} />
              </p>
            </div>

            {/* Card 3: Total Orders */}
            <div 
              onClick={() => setActiveTab("order")}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-orange-500 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <ShoppingBag size={22} />
                </div>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-1 rounded-full">
                  8 In Pipeline
                </span>
              </div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Active Orders</p>
              <h3 className="text-3xl font-black text-teal-950 mt-1">{stats.totalOrders} <span className="text-xs text-slate-400 font-normal">Active Bookings</span></h3>
              <p className="text-[11px] text-teal-700 font-medium mt-2 flex items-center gap-1 group-hover:text-orange-500">
                Track status workflows <ChevronRight size={12} />
              </p>
            </div>

            {/* Card 4: Payments / Revenue */}
            <div 
              onClick={() => setActiveTab("payment")}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-orange-500 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <DollarSign size={22} />
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded-full">
                  UPI / Cards
                </span>
              </div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Payments Collected</p>
              <h3 className="text-3xl font-black text-teal-950 mt-1">{stats.totalRevenue}</h3>
              <p className="text-[11px] text-teal-700 font-medium mt-2 flex items-center gap-1 group-hover:text-orange-500">
                Audit transactions history <ChevronRight size={12} />
              </p>
            </div>

          </div>

          {/* DYNAMIC MAIN GRID CHANGER BASED ON SIDEBAR SELECTION */}

          {/* ========================================================== */}
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {/* ========================================================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              
              {/* Introduction Banner */}
              <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-teal-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-teal-800">
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
                  <Scissors size={280} className="-rotate-45" />
                </div>
                <div className="relative z-10 max-w-2xl">
                  <span className="bg-orange-500 text-teal-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    Darzi Central Command
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold mt-3 leading-tight">
                    Welcome back,  Admin!
                  </h1>
                  <p className="text-teal-100 text-sm mt-2 leading-relaxed">
                    Our current wedding collection delivery rush is at 87% customer satisfaction rate. Complete active design audits, manage physical fit pickups via helper bridges, and keep payouts transparent!
                  </p>
                  <div className="flex flex-wrap gap-3 mt-5">
                    <button onClick={() => setActiveTab("order")} className="bg-orange-500 hover:bg-orange-600 text-teal-950 text-xs font-bold px-4 py-2.5 rounded-lg transition">
                      View Urgent Deliveries
                    </button>
                    <button onClick={() => setActiveTab("helper")} className="bg-transparent border border-teal-300 hover:bg-teal-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition">
                      Bridge Driver Statuses
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid: Secondary Visual Reports */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visual Chart Card - Order Breakdowns */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="font-extrabold text-teal-950 text-base">Production Status Distribution</h4>
                      <p className="text-xs text-slate-400">Where are orders stuck today?</p>
                    </div>
                    <span className="text-xs font-semibold text-orange-500 hover:underline cursor-pointer" onClick={() => setActiveTab("order")}>View Orders</span>
                  </div>

                  {/* Manual visual progress bar items acting as live graph analytics */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-indigo-600 flex items-center gap-1">
                          <Clock size={12} /> In Stitching (Active Masters)
                        </span>
                        <span>33% (2 Orders)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: "33%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-teal-600 flex items-center gap-1">
                          <CheckCircle size={12} /> Delivered & Completed Fits
                        </span>
                        <span>17% (1 Order)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-teal-600 h-full rounded-full" style={{ width: "17%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-orange-500 flex items-center gap-1">
                          <Sliders size={12} /> Measurement Setup & Assigned
                        </span>
                        <span>50% (3 Orders)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Mini info stats block */}
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 text-center">
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Average Fitting</p>
                      <h5 className="text-lg font-black text-teal-950 mt-0.5">4.8 / 5.0</h5>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Fabric Pickup Time</p>
                      <h5 className="text-lg font-black text-teal-950 mt-0.5">&lt; 3 Hours</h5>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Bridal Orders</p>
                      <h5 className="text-lg font-black text-teal-950 mt-0.5">₹29,300 val</h5>
                    </div>
                  </div>

                </div>

                {/* Hot Products & Top Tailors Quick Board */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h4 className="font-extrabold text-teal-950 text-base mb-4">Elite Tailors Leaders</h4>
                  <div className="divide-y divide-slate-100">
                    {tailors.slice(0, 3).map((tailor, idx) => (
                      <div key={tailor.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{tailor.name}</p>
                            <p className="text-[10px] text-slate-400">{tailor.specialty.split('&')[0]}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-xs text-orange-500 font-bold justify-end">
                            <Star size={12} className="fill-orange-500 mr-0.5" />
                            {tailor.rating}
                          </div>
                          <p className="text-[10px] text-slate-400">{tailor.activeOrders} ongoing fits</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <h5 className="text-xs font-bold text-teal-950 uppercase tracking-wide mb-3">Live Active Campaigns</h5>
                    <div className="bg-orange-50 rounded-xl p-3 border border-orange-100 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-black text-orange-900">{campaigns[0].name}</p>
                        <p className="text-[10px] text-orange-600 mt-0.5">Use code: <span className="font-bold underline">{campaigns[0].code}</span></p>
                      </div>
                      <span className="bg-orange-500 text-teal-950 font-black text-[10px] px-2 py-1 rounded-full uppercase">15% Off</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* QUICK RECENT LOGS TABLE */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-teal-950 text-base">Ongoing Orders Registry Dashboard</h3>
                    <p className="text-xs text-slate-500">Live view of current orders under processing.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab("order")} 
                    className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1"
                  >
                    View Comprehensive Order Page <ChevronRight size={14} />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-teal-50 text-teal-900 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3.5">S.No</th>
                        <th className="px-6 py-3.5">Order ID</th>
                        <th className="px-6 py-3.5">Customer</th>
                        <th className="px-6 py-3.5">Assigned Tailor</th>
                        <th className="px-6 py-3.5">Helper Bridge</th>
                        <th className="px-6 py-3.5">Processing Status</th>
                        <th className="px-6 py-3.5 text-right">Value (₹)</th>
                        <th className="px-6 py-3.5 text-center">Action Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.slice(0, 3).map((ord, idx) => (
                        <tr key={ord.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 font-bold text-slate-500">{idx + 1}</td>
                          <td className="px-6 py-4 font-black text-orange-600">{ord.orderId}</td>
                          <td className="px-6 py-4 font-bold text-slate-800">{ord.customer}</td>
                          <td className="px-6 py-4 text-slate-600">{ord.tailor}</td>
                          <td className="px-6 py-4 text-slate-600">
                            <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-800 font-semibold px-2 py-0.5 rounded-full">
                              <Truck size={10} /> {ord.helper}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full font-bold text-[10px] ${
                              ord.status === "Delivered" ? "bg-emerald-100 text-emerald-800" :
                              ord.status === "In Stitching" ? "bg-indigo-100 text-indigo-800" :
                              "bg-amber-100 text-amber-800"
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-extrabold text-slate-900">₹{ord.amount.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => openDetailModal(ord, 'order')}
                              className="bg-teal-900 hover:bg-orange-500 text-white hover:text-teal-950 font-bold px-3 py-1.5 rounded-lg transition text-[11px]"
                            >
                              See Other Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 2: USER MANAGEMENT - CUSTOMERS */}
          {/* ========================================================== */}
          {activeTab === "customer" && (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                  <h2 className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
                    <Users className="text-orange-500" /> Customer Management Hub
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Review verified profile registration, active statuses, preferred styles, and total bookings.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-slate-500">Total Records: {filteredCustomers.length}</span>
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-teal-950 text-white uppercase font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Full Name</th>
                        <th className="px-6 py-4">Email Details</th>
                        <th className="px-6 py-4">Phone Number</th>
                        <th className="px-6 py-4">City Hub</th>
                        <th className="px-6 py-4">Style Tier</th>
                        <th className="px-6 py-4 text-center">Active Status</th>
                        <th className="px-6 py-4 text-center">Manage Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCustomers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-12 text-center text-slate-400 font-medium">No customers found matching search query.</td>
                        </tr>
                      ) : (
                        filteredCustomers.map((c, index) => (
                          <tr key={c.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 font-bold text-slate-500">{index + 1}</td>
                            <td className="px-6 py-4 font-black text-teal-950">{c.name}</td>
                            <td className="px-6 py-4 text-slate-600">{c.email}</td>
                            <td className="px-6 py-4 font-semibold text-slate-700">{c.phone}</td>
                            <td className="px-6 py-4 text-slate-600">{c.city}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                c.tier === "Platinum Member" ? "bg-purple-100 text-purple-800" :
                                c.tier === "Gold Member" ? "bg-amber-100 text-amber-800" :
                                "bg-slate-100 text-slate-800"
                              }`}>
                                {c.tier}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => toggleCustomerStatus(c.id)}
                                className={`px-2.5 py-1 rounded-full font-bold text-[10px] transition-colors ${
                                  c.active 
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" 
                                    : "bg-red-100 text-red-800 hover:bg-red-200"
                                }`}
                                title="Click to Toggle Status"
                              >
                                {c.active ? "Active Active" : "Suspended"}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => openDetailModal(c, 'customer')}
                                className="bg-teal-900 hover:bg-orange-500 text-white hover:text-teal-950 font-bold px-3 py-1.5 rounded-lg transition text-[11px]"
                              >
                                See Other Detail
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 3: USER MANAGEMENT - HELPERS (BRIDGE) */}
          {/* ========================================================== */}
          {activeTab === "helper" && (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                  <h2 className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
                    <Truck className="text-orange-500" /> Helper Bridge (Logistics Pickups)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Track physical body measurements, fabric dispatch logistics agents, and customer response agents.</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">Total Active Bridge: {helpers.filter(h => h.active).length}</span>
              </div>

              {/* Helpers Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-teal-950 text-white uppercase font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Agent Name</th>
                        <th className="px-6 py-4">Email Address</th>
                        <th className="px-6 py-4">Assigned Territory</th>
                        <th className="px-6 py-4 text-center">Active Tailors Associated</th>
                        <th className="px-6 py-4 text-center">Customer Rating</th>
                        <th className="px-6 py-4 text-center">Status</th>
                        <th className="px-6 py-4 text-center">Manage Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredHelpers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-12 text-center text-slate-400 font-medium">No pickup agents matched.</td>
                        </tr>
                      ) : (
                        filteredHelpers.map((h, index) => (
                          <tr key={h.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 font-bold text-slate-500">{index + 1}</td>
                            <td className="px-6 py-4 font-black text-teal-950">{h.name}</td>
                            <td className="px-6 py-4 text-slate-600">{h.email}</td>
                            <td className="px-6 py-4 text-slate-600 font-semibold">{h.region}</td>
                            <td className="px-6 py-4 text-center font-bold text-slate-800">{h.assignedTailors} Tailors</td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-lg">
                                <Star size={12} className="fill-orange-500 mr-1" /> {h.rating}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => toggleHelperStatus(h.id)}
                                className={`px-2.5 py-1 rounded-full font-bold text-[10px] transition-colors ${
                                  h.active 
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" 
                                    : "bg-red-100 text-red-800 hover:bg-red-200"
                                }`}
                                title="Click to Toggle"
                              >
                                {h.active ? "Active Duty" : "Off Duty"}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => openDetailModal(h, 'helper')}
                                className="bg-teal-900 hover:bg-orange-500 text-white hover:text-teal-950 font-bold px-3 py-1.5 rounded-lg transition text-[11px]"
                              >
                                See Other Detail
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 4: USER MANAGEMENT - TAILORS / VENDORS */}
          {/* ========================================================== */}
          {activeTab === "tailor" && (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                  <h2 className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
                    <Scissors className="text-orange-500 transform -rotate-45" /> Boutique Master Tailor Registry
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Assign active stitching tasks, evaluate rating trends, and manage vendor active capabilities.</p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-lg">Total Tailors: {tailors.length}</span>
                </div>
              </div>

              {/* Tailors Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-teal-950 text-white uppercase font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Boutique/Master Name</th>
                        <th className="px-6 py-4">Shop Label Name</th>
                        <th className="px-6 py-4">Stitching Speciality</th>
                        <th className="px-6 py-4">Studio Hub Location</th>
                        <th className="px-6 py-4 text-center">Ongoing Orders</th>
                        <th className="px-6 py-4 text-center">Vendor Rating</th>
                        <th className="px-6 py-4 text-center">Stitching Status</th>
                        <th className="px-6 py-4 text-center">Manage Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTailors.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-medium">No tailors verified under this lookup name.</td>
                        </tr>
                      ) : (
                        filteredTailors.map((t, index) => (
                          <tr key={t.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 font-bold text-slate-500">{index + 1}</td>
                            <td className="px-6 py-4 font-black text-teal-950">{t.name}</td>
                            <td className="px-6 py-4 font-semibold text-orange-600">{t.shopName}</td>
                            <td className="px-6 py-4 text-slate-600">{t.specialty}</td>
                            <td className="px-6 py-4 text-slate-600">{t.location}</td>
                            <td className="px-6 py-4 text-center font-bold text-teal-950">{t.activeOrders} active</td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg">
                                <Star size={12} className="fill-emerald-600 mr-1 text-emerald-600" /> {t.rating}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => toggleTailorStatus(t.id)}
                                className={`px-2.5 py-1 rounded-full font-bold text-[10px] transition-colors ${
                                  t.active 
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" 
                                    : "bg-red-100 text-red-800 hover:bg-red-200"
                                }`}
                              >
                                {t.active ? "Open for Bookings" : "Paused Capacity"}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => openDetailModal(t, 'tailor')}
                                className="bg-teal-900 hover:bg-orange-500 text-white hover:text-teal-950 font-bold px-3 py-1.5 rounded-lg transition text-[11px]"
                              >
                                See Other Detail
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 5: ORDER MANAGEMENT */}
          {/* ========================================================== */}
          {activeTab === "order" && (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                  <h2 className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
                    <ShoppingBag className="text-orange-500" /> Core Order Tracking Book
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Audit fabric specifications, delivery timelines, assign logistics helper and tailor channels.</p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-teal-950 text-white text-xs font-bold px-3 py-1.5 rounded-lg">All Orders ({orders.length})</span>
                </div>
              </div>

              {/* Orders Database Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-teal-950 text-white uppercase font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer Name</th>
                        <th className="px-6 py-4">Master Boutique</th>
                        <th className="px-6 py-4">Requested Stitching Style</th>
                        <th className="px-6 py-4">Delivery Date Goal</th>
                        <th className="px-6 py-4 text-right">Order Cost</th>
                        <th className="px-6 py-4 text-center">Status Label</th>
                        <th className="px-6 py-4 text-center">Manage Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-medium">No fitting orders matching this parameter.</td>
                        </tr>
                      ) : (
                        filteredOrders.map((o, index) => (
                          <tr key={o.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 font-bold text-slate-500">{index + 1}</td>
                            <td className="px-6 py-4 font-black text-orange-600">{o.orderId}</td>
                            <td className="px-6 py-4 font-bold text-slate-900">{o.customer}</td>
                            <td className="px-6 py-4 text-slate-600">{o.tailor}</td>
                            <td className="px-6 py-4 text-slate-600 font-semibold">{o.service}</td>
                            <td className="px-6 py-4 text-slate-500">{o.deliveryDate}</td>
                            <td className="px-6 py-4 text-right font-black text-slate-900">₹{o.amount.toLocaleString('en-IN')}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                o.status === "Delivered" ? "bg-emerald-100 text-emerald-800" :
                                o.status === "In Stitching" ? "bg-indigo-100 text-indigo-800" :
                                o.status === "Out for Delivery" ? "bg-blue-100 text-blue-800" :
                                "bg-amber-100 text-amber-800"
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => openDetailModal(o, 'order')}
                                className="bg-teal-900 hover:bg-orange-500 text-white hover:text-teal-950 font-bold px-3 py-1.5 rounded-lg transition text-[11px]"
                              >
                                See Other Detail
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 6: PAYMENT & TRANSACTIONS */}
          {/* ========================================================== */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                  <h2 className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
                    <CreditCard className="text-orange-500" /> Payment & Settlement Logs
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Monitor advance user deposits, designer tailoring commission splits, and settlement processing channels.</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">Transacted Rows: {payments.length}</span>
              </div>

              {/* Payments Database Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-teal-950 text-white uppercase font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Transaction Reference ID</th>
                        <th className="px-6 py-4">Linked Order ID</th>
                        <th className="px-6 py-4">Payer Customer</th>
                        <th className="px-6 py-4">Processing Date Time</th>
                        <th className="px-6 py-4 font-semibold">Payment Channel</th>
                        <th className="px-6 py-4 text-right">Settled Value</th>
                        <th className="px-6 py-4 text-center">Payment Status</th>
                        <th className="px-6 py-4 text-center">Audit details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPayments.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-medium">No recorded transactions.</td>
                        </tr>
                      ) : (
                        filteredPayments.map((p, index) => (
                          <tr key={p.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 font-bold text-slate-500">{index + 1}</td>
                            <td className="px-6 py-4 font-black text-teal-950">{p.transactionId}</td>
                            <td className="px-6 py-4 font-bold text-orange-600">{p.orderId}</td>
                            <td className="px-6 py-4 text-slate-700 font-semibold">{p.payer}</td>
                            <td className="px-6 py-4 text-slate-500">{p.date}</td>
                            <td className="px-6 py-4 text-slate-600">{p.method}</td>
                            <td className="px-6 py-4 text-right font-extrabold text-slate-900">₹{p.amount.toLocaleString('en-IN')}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                p.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                                p.status === "Pending" ? "bg-red-100 text-red-800 animate-pulse" :
                                "bg-amber-100 text-amber-800"
                              }`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => openDetailModal(p, 'payment')}
                                className="bg-teal-900 hover:bg-orange-500 text-white hover:text-teal-950 font-bold px-3 py-1.5 rounded-lg transition text-[11px]"
                              >
                                See Other Detail
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 7: STYLE CATALOG */}
          {/* ========================================================== */}
          {activeTab === "catalog" && (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                  <h2 className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
                    <BookOpen className="text-orange-500" /> Digital Style & Design Catalog
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Organize recommended custom fabrics, minimum base stitching rates, standard turnaround times, and variant designs.</p>
                </div>
                <button 
                  onClick={() => alert("Creating a new Catalog Item (Form feature coming soon)")}
                  className="bg-orange-500 hover:bg-orange-600 text-teal-950 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <Plus size={16} /> Add Catalog Style
                </button>
              </div>

              {/* Catalog Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-teal-950 text-white uppercase font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Design Name label</th>
                        <th className="px-6 py-4">Stitching Category</th>
                        <th className="px-6 py-4 text-right">Min Base Price</th>
                        <th className="px-6 py-4">Recommended Fabric</th>
                        <th className="px-6 py-4">Active Variants</th>
                        <th className="px-6 py-4">Turnaround Period</th>
                        <th className="px-6 py-4 text-center">Season Status</th>
                        <th className="px-6 py-4 text-center">Manage Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCatalog.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-medium">No style configurations matched.</td>
                        </tr>
                      ) : (
                        filteredCatalog.map((cat, index) => (
                          <tr key={cat.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 font-bold text-slate-500">{index + 1}</td>
                            <td className="px-6 py-4 font-black text-teal-950">{cat.designName}</td>
                            <td className="px-6 py-4 text-slate-600 font-semibold">{cat.category}</td>
                            <td className="px-6 py-4 text-right font-black text-slate-900">₹{cat.basePrice.toLocaleString('en-IN')}</td>
                            <td className="px-6 py-4 text-slate-600 italic">{cat.fabricRecommended}</td>
                            <td className="px-6 py-4 text-center font-bold text-slate-800">{cat.designsAvailable} sketches</td>
                            <td className="px-6 py-4 text-slate-600">{cat.turnaroundTime}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-2 py-1 rounded-full font-bold text-[10px] ${
                                cat.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                              }`}>
                                {cat.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => openDetailModal(cat, 'catalog')}
                                className="bg-teal-900 hover:bg-orange-500 text-white hover:text-teal-950 font-bold px-3 py-1.5 rounded-lg transition text-[11px]"
                              >
                                See Other Detail
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 8: REPORTING & BI ANALYTICS */}
          {/* ========================================================== */}
          {activeTab === "reporting" && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
                  <BarChart3 className="text-orange-500" /> System Monthly Reporting (Financial BI)
                </h2>
                <p className="text-xs text-slate-400 mt-1">Comprehensive audit of overall corporate gross platform margin and tailor payouts.</p>
              </div>

              {/* Mini visual summary graphs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Visual Chart Simulation */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-800 text-sm mb-4">Monthly Revenue Flow Trends (INR)</h4>
                  <div className="space-y-4">
                    {INITIAL_REPORTS.map((rep) => (
                      <div key={rep.id}>
                        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                          <span>{rep.period}</span>
                          <span className="font-bold text-teal-950">₹{rep.revenue.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          {/* Simulated percentage calculations for simple visualization */}
                          <div 
                            className="bg-orange-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${(rep.revenue / 450000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Margins Breakdown */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-4">Stitching Partner Payout Margin Shares</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      We currently retain approximately <strong>30.5% - 31.5%</strong> of every custom order value as platform processing fee, measurement coordination, and drycleaning checks. The remainder is transferred to verified master boutiques.
                    </p>
                  </div>
                  <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl mt-4">
                    <h5 className="font-bold text-xs text-teal-950 uppercase tracking-wide">Recent Average Order Basket Value</h5>
                    <p className="text-2xl font-black text-orange-500 mt-1">₹8,550</p>
                    <p className="text-[10px] text-slate-400 mt-1">Calculated from last 100 checkout cycles.</p>
                  </div>
                </div>

              </div>

              {/* Reporting Database Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-teal-950 text-white uppercase font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Report Audit Period</th>
                        <th className="px-6 py-4 text-right">Gross platform Revenue</th>
                        <th className="px-6 py-4 text-center">New Registered Users</th>
                        <th className="px-6 py-4 text-center">Completed Orders</th>
                        <th className="px-6 py-4 text-right">Boutique Payout Split</th>
                        <th className="px-6 py-4 text-center">System Margin Retained</th>
                        <th className="px-6 py-4 text-center">Audit Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {INITIAL_REPORTS.map((rep, idx) => (
                        <tr key={rep.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 font-bold text-slate-500">{idx + 1}</td>
                          <td className="px-6 py-4 font-black text-teal-950">{rep.period}</td>
                          <td className="px-6 py-4 text-right font-black text-slate-900">₹{rep.revenue.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4 text-center font-bold text-slate-700">+{rep.newSignups} leads</td>
                          <td className="px-6 py-4 text-center text-teal-700 font-bold">{rep.ordersCompleted} orders</td>
                          <td className="px-6 py-4 text-right text-slate-600 font-semibold">₹{rep.tailorPayout.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4 text-center font-black text-orange-600">{rep.profitMargin}</td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => openDetailModal(rep, 'report')}
                              className="bg-teal-900 hover:bg-orange-500 text-white hover:text-teal-950 font-bold px-3 py-1.5 rounded-lg transition text-[11px]"
                            >
                              See Other Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 9: CAMPAIGNS & OFFERS */}
          {/* ========================================================== */}
          {activeTab === "campaign" && (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                  <h2 className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
                    <Tag className="text-orange-500 animate-bounce" /> Campaigns & Offer Management
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Drive order counts during wedding/festive sessions with coupon codes, cash discounts, and budget tags.</p>
                </div>
                <button 
                  onClick={() => setShowAddCampaign(!showAddCampaign)}
                  className="bg-orange-500 hover:bg-orange-600 text-teal-950 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <Plus size={16} /> Create Campaign Coupon
                </button>
              </div>

              {/* QUICK INLINE CAMPAIGN ADD FORM */}
              {showAddCampaign && (
                <form onSubmit={handleCreateCampaign} className="bg-white p-6 rounded-2xl border border-orange-500 shadow-lg space-y-4 max-w-2xl transition duration-300">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="font-bold text-teal-950 text-sm">Add New Coupon Code Configuration</span>
                    <button type="button" onClick={() => setShowAddCampaign(false)} className="text-slate-400 hover:text-red-500">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Campaign Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        placeholder="e.g., Diwali Style Fest"
                        value={newCampaign.name}
                        onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Coupon Code (Alphanumeric)</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        placeholder="e.g., FESTIVE25"
                        value={newCampaign.code}
                        onChange={(e) => setNewCampaign({...newCampaign, code: e.target.value.toUpperCase()})}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Discount Amount/Value</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        placeholder="e.g., 25% OFF / ₹500 Flat"
                        value={newCampaign.discount}
                        onChange={(e) => setNewCampaign({...newCampaign, discount: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Target Marketing Budget (INR)</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        placeholder="e.g., ₹20,000"
                        value={newCampaign.budget}
                        onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Expiry Validation Date</label>
                      <input 
                        type="date" 
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        value={newCampaign.validTill}
                        onChange={(e) => setNewCampaign({...newCampaign, validTill: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Platform Status</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        value={newCampaign.status}
                        onChange={(e) => setNewCampaign({...newCampaign, status: e.target.value})}
                      >
                        <option value="Running">Running</option>
                        <option value="Paused">Paused</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 text-xs">
                    <button 
                      type="button" 
                      onClick={() => setShowAddCampaign(false)}
                      className="bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-lg hover:bg-slate-200 transition"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-teal-900 text-white font-bold px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-teal-950 transition"
                    >
                      Create Coupon Code
                    </button>
                  </div>
                </form>
              )}

              {/* Campaigns Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-teal-950 text-white uppercase font-black text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">S.No</th>
                        <th className="px-6 py-4">Active Campaign Name</th>
                        <th className="px-6 py-4 font-black">Coupon Code</th>
                        <th className="px-6 py-4 text-right">Discount Offer</th>
                        <th className="px-6 py-4">Targeted User Reach</th>
                        <th className="px-6 py-4">Campaign Conversion Ratio</th>
                        <th className="px-6 py-4">Offer Validity Till</th>
                        <th className="px-6 py-4 text-center">Live Status</th>
                        <th className="px-6 py-4 text-center">Manage Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCampaigns.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-medium">No marketing campaigns found.</td>
                        </tr>
                      ) : (
                        filteredCampaigns.map((camp, index) => (
                          <tr key={camp.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 font-bold text-slate-500">{index + 1}</td>
                            <td className="px-6 py-4 font-black text-teal-950">{camp.name}</td>
                            <td className="px-6 py-4 font-black text-orange-600">{camp.code}</td>
                            <td className="px-6 py-4 text-right font-black text-slate-900">{camp.discount}</td>
                            <td className="px-6 py-4 text-slate-600">{camp.reached}</td>
                            <td className="px-6 py-4 text-slate-600 font-bold">{camp.conversion}</td>
                            <td className="px-6 py-4 text-slate-500 font-semibold">{camp.validTill}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                camp.status === "Running" ? "bg-emerald-100 text-emerald-800 animate-pulse" :
                                camp.status === "Paused" ? "bg-amber-100 text-amber-800" :
                                "bg-slate-100 text-slate-800"
                              }`}>
                                {camp.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => openDetailModal(camp, 'campaign')}
                                className="bg-teal-900 hover:bg-orange-500 text-white hover:text-teal-950 font-bold px-3 py-1.5 rounded-lg transition text-[11px]"
                              >
                                See Other Detail
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ========================================================== */}
      {/* DETAILED MODAL DIALOG (DYNAMICALLY GENERATED PER ROW TYPE) */}
      {/* ========================================================== */}
      {selectedItem && (
        <div className="fixed inset-0 bg-teal-950/70 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-teal-800/10 overflow-hidden transform scale-100 transition-all">
            
            {/* Modal Header */}
            <div className="bg-teal-950 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] bg-orange-500 text-teal-950 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Deep-dive Detail Audit ({selectedItemType})
                </span>
                <h3 className="text-lg font-extrabold mt-1 text-white">
                  {selectedItem.name || selectedItem.designName || selectedItem.orderId || selectedItem.transactionId || selectedItem.period}
                </h3>
              </div>
              <button 
                onClick={closeDetailModal}
                className="p-1.5 rounded-full hover:bg-teal-900 text-white transition focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: Custom Content per Type */}
            <div className="p-6 space-y-6 text-sm text-slate-700">
              
              {/* CUSTOMER DETAIL VIEW */}
              {selectedItemType === 'customer' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Tier status</p>
                      <p className="font-extrabold text-teal-950 text-base">{selectedItem.tier}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Style Preference</p>
                      <p className="font-extrabold text-teal-950 text-base">{selectedItem.preferredStyle}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Customer Region</p>
                      <p className="font-semibold text-slate-800">{selectedItem.city}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Date Joined</p>
                      <p className="font-semibold text-slate-800">{selectedItem.joined}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="font-bold text-teal-950 mb-2">Lifetime Statistics</h4>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-teal-50 rounded-lg text-teal-900">
                        <span className="block text-[10px] text-slate-400 uppercase font-bold">Total Orders</span>
                        <strong className="text-base font-extrabold">{selectedItem.ordersCount} Stitchings</strong>
                      </div>
                      <div className="p-2.5 bg-orange-50 rounded-lg text-orange-900 col-span-2">
                        <span className="block text-[10px] text-slate-400 uppercase font-bold">Total Paid Invoices</span>
                        <strong className="text-base font-extrabold">₹{selectedItem.totalSpend.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-xs text-amber-800">
                    <strong>Admin Note:</strong> Gold membership benefits apply. Offer complimentary express trial fitting for any incoming request.
                  </div>
                </div>
              )}

              {/* HELPER (BRIDGE) DETAIL VIEW */}
              {selectedItemType === 'helper' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-teal-50 p-4 rounded-2xl">
                    <div className="p-3 bg-teal-100 text-teal-900 rounded-xl">
                      <Truck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-teal-950">{selectedItem.name}</h4>
                      <p className="text-xs text-teal-700">Bridge Agent (Pickup & Transit Expert)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Logistics vehicle</p>
                      <p className="font-semibold text-slate-800">{selectedItem.vehicle}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Assigned Hub Region</p>
                      <p className="font-semibold text-slate-800">{selectedItem.region}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Average Customer Rating</p>
                      <p className="font-extrabold text-orange-600 flex items-center gap-1">
                        <Star size={14} className="fill-orange-500 text-orange-500" /> {selectedItem.rating} Stars
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Total Lifetime Pickups</p>
                      <p className="font-extrabold text-teal-950">{selectedItem.completedPickups} Cycles</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-bold text-xs text-slate-800 mb-2">Primary Contact Methods</p>
                    <div className="flex gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1"><Mail size={12} /> {selectedItem.email}</span>
                      <span className="flex items-center gap-1"><Phone size={12} /> {selectedItem.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAILOR DETAIL VIEW */}
              {selectedItemType === 'tailor' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-orange-50 p-4 rounded-2xl border border-orange-100">
                    <div>
                      <h4 className="font-black text-teal-950 text-base">{selectedItem.shopName}</h4>
                      <p className="text-xs text-orange-600">Specialty: {selectedItem.specialty}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-teal-900 text-white font-bold px-2.5 py-1 rounded-full">{selectedItem.experience}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Master Craftsman</p>
                      <p className="font-semibold text-slate-800">{selectedItem.name}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Studio Location</p>
                      <p className="font-semibold text-slate-800">{selectedItem.location}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Active Orders Queue</p>
                      <p className="font-extrabold text-teal-950">{selectedItem.activeOrders} Custom garments</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Boutique rating</p>
                      <p className="font-extrabold text-orange-600 flex items-center gap-1">
                        <Star size={14} className="fill-orange-500 text-orange-500" /> {selectedItem.rating} Rating
                      </p>
                    </div>
                  </div>

                  <div className="bg-teal-50 border border-teal-100 p-3.5 rounded-xl text-xs text-teal-900">
                    <p className="font-bold">Tailoring Workflow Status:</p>
                    <p className="mt-1 leading-relaxed text-teal-800">
                      Partner boutique has agreed to accept premium heavy embroidery materials. Logistics drivers must hand over fabric parcels inside physical secure dust bags.
                    </p>
                  </div>
                </div>
              )}

              {/* ORDER DETAIL VIEW */}
              {selectedItemType === 'order' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Order Reference</p>
                      <h4 className="text-lg font-black text-orange-600">{selectedItem.orderId}</h4>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-900">{selectedItem.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Customer</p>
                      <p className="font-semibold text-slate-800">{selectedItem.customer}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Assigned Master Boutique</p>
                      <p className="font-semibold text-slate-800">{selectedItem.tailor}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Logistics Pick Helper</p>
                      <p className="font-semibold text-slate-800">{selectedItem.helper}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Fabric Provided by</p>
                      <p className="font-semibold text-slate-800">{selectedItem.fabricProvided}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400">Total Stitching Cost</p>
                      <p className="text-xl font-black text-teal-950">₹{selectedItem.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Promised Fitting Date</p>
                      <p className="font-bold text-teal-950">{selectedItem.deliveryDate}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* PAYMENT DETAIL VIEW */}
              {selectedItemType === 'payment' && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-emerald-800 font-bold uppercase">Reference Settlement Token</p>
                      <h4 className="font-black text-teal-950 text-base">{selectedItem.transactionId}</h4>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-full">{selectedItem.status}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Platform Payer</p>
                      <p className="font-bold text-slate-800">{selectedItem.payer}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Associated Fit Order</p>
                      <p className="font-bold text-orange-600">{selectedItem.orderId}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Settled on Date</p>
                      <p className="font-semibold text-slate-700">{selectedItem.date}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Payment Mode</p>
                      <p className="font-semibold text-slate-700">{selectedItem.method}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 text-center">
                    <p className="text-xs text-slate-400 uppercase font-bold">Total Invoiced Amount</p>
                    <p className="text-2xl font-black text-teal-950 mt-1">₹{selectedItem.amount.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              )}

              {/* CATALOG DETAIL VIEW */}
              {selectedItemType === 'catalog' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Catalog Style Group</p>
                      <p className="font-bold text-teal-950">{selectedItem.category}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Minimum Base Stitching Rate</p>
                      <p className="font-extrabold text-orange-600">₹{selectedItem.basePrice.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Standard Handover Period</p>
                      <p className="font-semibold text-slate-800">{selectedItem.turnaroundTime}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-400 text-xs font-bold uppercase">Available Sketches</p>
                      <p className="font-semibold text-slate-800">{selectedItem.designsAvailable} variations</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Recommended Fabrication Cloth</p>
                    <p className="text-xs text-slate-700 italic">{selectedItem.fabricRecommended}</p>
                  </div>
                </div>
              )}

              {/* DEFAULT FALLBACK / GENERIC SUMMARY */}
              {(selectedItemType === 'report' || selectedItemType === 'campaign') && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    Audit reports show system operational status for current item reference. No further discrepancies detected on secure system logs.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedItem).map(([key, val]) => (
                      <div key={key} className="p-3 bg-slate-50 rounded-xl text-xs">
                        <span className="block text-slate-400 font-bold uppercase mb-0.5">{key}</span>
                        <span className="font-black text-slate-800">{val.toString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium">Verified by BookMyDarzi Security</span>
              <button 
                onClick={closeDetailModal}
                className="bg-orange-500 hover:bg-orange-600 text-teal-950 font-extrabold px-5 py-2.5 rounded-xl transition shadow-sm"
              >
                Close Audit Dialog
              </button>
            </div>

          </div>
        </div>  


        
      )}

    </div>
  );
}