import React from "react";
import { Eye } from "lucide-react";

export default function TailorTab({ list, toggleStatus, openDetailModal }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h4 className="font-black text-teal-950">Tailor Vendor Registry</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
              <th className="px-6 py-3">Master Tailor / Boutique</th>
              <th className="px-6 py-3">Specialty Location</th>
              <th className="px-6 py-3">Active Loads</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/80 transition">
                <td className="px-6 py-4">
                  <div className="font-black text-teal-950">{t.name}</div>
                  <div className="text-xs text-slate-400 font-medium">{t.shopName}</div>
                </td>
                <td className="px-6 py-4 text-xs">
                  <div className="font-bold text-slate-700">{t.specialty}</div>
                  <div className="text-slate-400 mt-0.5">{t.location}</div>
                </td>
                <td className="px-6 py-4 font-bold text-teal-900">{t.activeOrders} orders</td>
                <td className="px-6 py-4 text-amber-500 font-extrabold">★ {t.rating}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(t.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition shadow-sm ${
                      t.active ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                    }`}
                  >
                    {t.active ? "Verified" : "On Hold"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openDetailModal(t, "tailor")}
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