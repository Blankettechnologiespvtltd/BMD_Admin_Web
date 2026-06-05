import React from "react";
import { Eye, ShoppingBag } from "lucide-react";

export default function OrderTab({ list, openDetailModal }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h4 className="font-black text-teal-950 flex items-center gap-2">
          <ShoppingBag size={20} className="text-orange-500" /> Order Book Pipeline
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer & Tailor</th>
              <th className="px-6 py-3">Garment Service</th>
              <th className="px-6 py-3">Fabric Info</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/80 transition">
                <td className="px-6 py-4 font-black text-teal-950">{order.orderId}</td>
                <td className="px-6 py-4 text-xs">
                  <div className="font-bold text-slate-800">Cust: {order.customer}</div>
                  <div className="text-slate-500 mt-0.5">Tailor: {order.tailor}</div>
                  <div className="text-teal-600 font-medium">Helper: {order.helper}</div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">{order.service}</td>
                <td className="px-6 py-4 text-xs text-slate-500">{order.fabricProvided}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800">
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
  );
}