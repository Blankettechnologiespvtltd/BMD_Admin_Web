import React from "react";
import { Eye, CreditCard } from "lucide-react";

export default function PaymentTab({ list, openDetailModal }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h4 className="font-black text-teal-950 flex items-center gap-2">
          <CreditCard size={20} className="text-orange-500" /> Transaction Audit Vault
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Linked Order</th>
              <th className="px-6 py-3">Payer Client</th>
              <th className="px-6 py-3">Gateway Method</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition">
                <td className="px-6 py-4 font-mono font-bold text-xs text-slate-600">{p.transactionId}</td>
                <td className="px-6 py-4 font-black text-teal-950">{p.orderId}</td>
                <td className="px-6 py-4 font-semibold text-slate-700">{p.payer}</td>
                <td className="px-6 py-4 text-xs font-medium text-slate-500">{p.method}</td>
                <td className="px-6 py-4 font-black text-slate-900">₹{p.amount.toLocaleString("en-IN")}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    p.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}>
                    {p.status}
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