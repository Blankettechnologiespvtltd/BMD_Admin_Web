import React from "react";
import { BookOpen } from "lucide-react";

export default function CatalogTab({ list }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h4 className="font-black text-teal-950 flex items-center gap-2">
          <BookOpen size={20} className="text-orange-500" /> Style Catalog Management
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
              <th className="px-6 py-3">Garment / Design Outfit</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Base Bench Stitching Price</th>
              <th className="px-6 py-3">Recommended Fabrics</th>
              <th className="px-6 py-3">TAT Duration</th>
              <th className="px-6 py-3">Market Demand</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition">
                <td className="px-6 py-4 font-black text-teal-950">{item.designName}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-teal-50 text-teal-800 text-xs font-bold rounded">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-800">₹{item.basePrice.toLocaleString("en-IN")}</td>
                <td className="px-6 py-4 text-xs text-slate-600 font-medium">{item.fabricRecommended}</td>
                <td className="px-6 py-4 font-semibold text-slate-500 text-xs">{item.turnaroundTime}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    item.popularDemands === "High" || item.popularDemands === "Very High" || item.popularDemands === "Trending"
                      ? "bg-orange-50 text-orange-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {item.popularDemands}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}