import React from "react";
import { AlertTriangle, Clock, CheckCircle, Sliders, Eye } from "lucide-react";

export default function DashboardTab({ orders, openDetailModal }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-900 to-teal-950 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black">Welcome  Admin!</h2>
          <p className="text-teal-200 text-sm mt-1">Here is what is happening with your tailors and orders today.</p>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-center">
            <span className="block font-black text-orange-400 text-lg">
              {orders.filter(o => o.status === "In Stitching").length}
            </span>
            <span className="text-slate-300 font-medium">Stitching Now</span>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-center">
            <span className="block font-black text-amber-400 text-lg">
              {orders.filter(o => o.status === "Measurement Scheduled").length}
            </span>
            <span className="text-slate-300 font-medium">Scheduled</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h4 className="font-black text-teal-950">Active Orders Overview</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Service & Garment</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-black text-teal-950">{order.orderId}</td>
                  <td className="px-6 py-4 font-semibold">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-600">{order.service}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openDetailModal(order, "order")}
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
    </div>
  );
}