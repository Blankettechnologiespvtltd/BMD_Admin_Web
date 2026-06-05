import React from "react";
import { Eye, Truck } from "lucide-react";

export default function HelperTab({ list, toggleStatus, openDetailModal }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h4 className="font-black text-teal-950 flex items-center gap-2">
          <Truck size={20} className="text-orange-500" /> Logistic Helpers (Bridge Registry)
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
              <th className="px-6 py-3">Rider Name</th>
              <th className="px-6 py-3">Assigned Area</th>
              <th className="px-6 py-3">Vehicle Details</th>
              <th className="px-6 py-3">Performance</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((h) => (
              <tr key={h.id} className="hover:bg-slate-50/80 transition">
                <td className="px-6 py-4">
                  <div className="font-black text-teal-950">{h.name}</div>
                  <div className="text-xs text-slate-400 font-medium">{h.phone}</div>
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-700">{h.region}</td>
                <td className="px-6 py-4 text-xs text-slate-500 font-medium">{h.vehicle}</td>
                <td className="px-6 py-4 text-xs">
                  <div className="font-bold text-slate-800">Rating: ★ {h.rating}</div>
                  <div className="text-teal-600 font-medium mt-0.5">{h.completedPickups} Pickups Done</div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(h.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition shadow-sm ${
                      h.active ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                    }`}
                  >
                    {h.active ? "On Duty" : "Off Duty"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openDetailModal(h, "helper")}
                    className="p-1.5 text-teal-600 hover:text-orange-500 hover:bg-slate-100 rounded-lg transition"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}