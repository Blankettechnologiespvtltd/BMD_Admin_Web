import React from "react";
import { Users, Scissors, ShoppingBag, DollarSign, TrendingUp, ChevronRight } from "lucide-react";

 function StatCards({ stats, counts, setActiveTab }) {
  const cards = [
    { id: "customer", title: "Active Customers", value: stats.activeCust, sub: `of ${counts.customers} total`, icon: Users, color: "bg-teal-50 text-teal-700 hover:bg-teal-700" },
    { id: "tailor", title: "Design Tailors / Vendors", value: counts.tailors, sub: "Verified Boutiques", icon: Scissors, color: "bg-orange-50 text-orange-600 hover:bg-orange-500"},
    { id: "order", title: "Active Bookings", value: counts.orders, sub: "Stitching & Collection Pipeline", icon: ShoppingBag, color: "bg-amber-50 text-amber-700 hover:bg-amber-600"},
    { id: "payment", title: "Gross Intake", value: stats.totalRevenue, sub: "Completed & Partials", icon: DollarSign, color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-600"},
  ];

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => setActiveTab(card.id)}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-orange-500 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl ${card.color} group-hover:text-white transition-all duration-300 ${card.rotate ? "transform -rotate-45" : ""}`}>
                <Icon size={22} />
              </div>
              {card.trend && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded-full flex items-center gap-0.5">
                  <TrendingUp size={10} /> {card.trend}
                </span>
              )}
              {card.label && (
                <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-1 rounded-full">
                  {card.label}
                </span>
              )}
            </div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{card.title}</p>
            <h3 className="text-3xl font-black text-teal-950 mt-1">
              {card.value} <span className="text-xs text-slate-400 font-normal">{card.sub}</span>
            </h3>
            <p className="text-[11px] text-teal-700 font-medium mt-2 flex items-center gap-1 group-hover:text-orange-500">
              View data controls <ChevronRight size={12} />
            </p>
          </div>
        );
      })}
    </div>
  );
}
export default StatCards;