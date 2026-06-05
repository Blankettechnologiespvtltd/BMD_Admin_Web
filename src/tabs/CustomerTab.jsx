import React, { useState } from "react";
import { Eye, ChevronDown, ChevronUp, Star } from "lucide-react";

export default function CustomerTab({ list, toggleStatus, openDetailModal }) {
  // किस कस्टमर का एक्स्ट्रा डिटेल खुला है, उसे ट्रैक करने के लिए स्टेट
  const [expandedCustomerId, setExpandedCustomerId] = useState(null);

  const toggleExpandRow = (id) => {
    if (expandedCustomerId === id) {
      setExpandedCustomerId(null); // दोबारा क्लिक करने पर बंद हो जाएगा
    } else {
      setExpandedCustomerId(id); // नया रो खोलेगा
    }
  };

  // टियर के हिसाब से कलर्स देने का हेल्पर फ़ंक्शन
  const getTierStyle = (tier) => {
    const lowerTier = tier.toLowerCase();
    if (lowerTier.includes("gold")) {
      return "bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-yellow-950 border border-amber-500 font-black shadow-sm uppercase";
    } 
    if (lowerTier.includes("silver")) {
      return "bg-slate-300 text-black border border-slate-400 font-black uppercase";
    } 
    if (lowerTier.includes("bronze")) {
      return "bg-amber-800 text-amber-50 border border-amber-900 font-bold uppercase";
    } 
    if (lowerTier.includes("platinum")) {
      return "bg-purple-700 text-white border border-purple-800 font-black uppercase";
    }
    return "bg-slate-100 text-slate-700 border border-slate-300 font-medium";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h4 className="font-black text-teal-950">Customer Profiles Ledger</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
              <th className="px-6 py-3">Customer Name</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3 whitespace-nowrap">Profile ID</th>
              <th className="px-6 py-3">Email Address</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Full Address</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((c) => {
              const isExpanded = expandedCustomerId === c.id;
              return (
                <React.Fragment key={c.id}>
                  {/* मुख्य डेटा रो */}
                  <tr className={`hover:bg-slate-50/80 transition ${isExpanded ? "bg-teal-50/20" : ""}`}>
                    
                    {/* 1. Customer Name */}
                    <td className="px-6 py-4 font-black text-teal-950 whitespace-nowrap">
                      {c.name}
                    </td>

                    {/* 2. Gender */}
                    <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      {c.gender}
                    </td>

                    {/* 3. Profile ID (Strictly Single Line) */}
                    <td className="px-6 py-4 font-mono text-xs font-bold text-teal-600 whitespace-nowrap">
                      <span className="bg-teal-50 px-2 py-1 rounded inline-block tracking-wider">
                        {c.measurementProfileId}
                      </span>
                    </td>

                    {/* 4. Email Address */}
                    <td className="px-6 py-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                      {c.email}
                    </td>

                    {/* 5. Phone Number */}
                    <td className="px-6 py-4 text-xs font-mono text-slate-600 whitespace-nowrap">
                      {c.phone}
                    </td>

                    {/* 6. Full Address */}
                    <td className="px-6 py-4 text-xs text-slate-500 max-w-[240px] truncate" title={c.address}>
                      {c.address}
                    </td>

                    {/* 7. Status */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(c.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition shadow-sm ${
                          c.active 
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" 
                            : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                        }`}
                      >
                        {c.active ? "Active" : "Suspended"}
                      </button>
                    </td>

                    {/* 8. Actions (View More & Audit Toggle) */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* View More Details Toggle Button */}
                        <button
                          onClick={() => toggleExpandRow(c.id)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg transition ${
                            isExpanded 
                              ? "bg-teal-600 text-white" 
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          <span>{isExpanded ? "Close" : "View More"}</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>

                        {/* Audit Modal Trigger */}
                        <button
                          onClick={() => openDetailModal(c, "customer")}
                          className="p-1.5 text-teal-600 hover:text-orange-500 hover:bg-slate-100 rounded-lg transition"
                          title="Inspect JSON Log"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* कस्टमाइज्ड कोलैप्सिबल ड्रावर रो (दिखेगा जब View More एक्टिव हो) */}
                  {isExpanded && (
                    <tr>
                      <td colSpan="8" className="px-8 py-5 bg-slate-50/70 border-l-4 border-teal-500 animate-fadeIn">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-xs text-slate-600">
                          
                          {/* बॉक्स 1: रीजनल लोकेशन */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">City & Pincode</span>
                            <span className="font-bold text-slate-800 text-sm">{c.city} - {c.pincode}</span>
                          </div>

                          {/* बॉक्स 2: मेंबरशिप टियर */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Membership Tier</span>
                            <span className={`inline-block text-[11px] px-2 py-0.5 rounded-md mt-0.5 ${getTierStyle(c.tier)}`}>
                              {c.tier}
                            </span>
                          </div>

                          {/* बॉक्स 3: सिलाई प्राथमिकता */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Preferred Style</span>
                            <span className="font-semibold text-teal-950 block mt-0.5">{c.preferredStyle}</span>
                          </div>

                          {/* बॉक्स 4: आर्डर वॉल्यूम */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Vol. Orders</span>
                            <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md text-sm">{c.ordersCount} Units</span>
                          </div>

                          {/* बॉक्स 5: कुल टर्नओवर */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Lifetime Value</span>
                            <span className="font-black text-emerald-700 text-sm block">₹{c.totalSpend.toLocaleString("en-IN")}</span>
                          </div>

                          {/* बॉक्स 6: फाइनेंसियल लेजर */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Balance</span>
                            <span className="block mt-0.5 font-bold">
                              {c.pendingBalance > 0 ? (
                                <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded">₹{c.pendingBalance.toLocaleString("en-IN")}</span>
                              ) : (
                                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">No Dues</span>
                              )}
                            </span>
                          </div>

                          {/* बॉक्स 7: ऑनबोर्डिंग कैलेंडर */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Joined Date</span>
                            <span className="font-mono text-slate-800 block">{c.joined}</span>
                          </div>

                          {/* बॉक्स 8: रीसेंट इंटरैक्शन */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Last Order Activity</span>
                            <span className="font-mono text-slate-500 block">{c.lastOrderDate}</span>
                          </div>

                          {/* बॉक्स 9: डिलीवरी टाइप */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Delivery Preference</span>
                            <span className="font-bold text-teal-800 block">{c.deliveryPreference}</span>
                          </div>

                          {/* बॉक्स 10: ओवरऑल रेटिंग */}
                          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer Rating</span>
                            <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-black mt-0.5">
                              <Star size={12} className="fill-amber-500 text-amber-500" />
                              {c.customerRating?.toFixed(1)}
                            </div>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}