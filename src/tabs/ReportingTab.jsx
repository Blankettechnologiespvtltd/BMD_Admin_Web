import React from "react";
import { BarChart3, TrendingUp } from "lucide-react";

export default function ReportingTab({ list }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h4 className="font-black text-teal-950 flex items-center gap-2">
            <BarChart3 size={20} className="text-orange-500" /> Monthly Business Intelligence Insights
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
                <th className="px-6 py-3">Timeline Period</th>
                <th className="px-6 py-3">Gross Intake Revenue</th>
                <th className="px-6 py-3">New Registrations</th>
                <th className="px-6 py-3">Completed Deliveries</th>
                <th className="px-6 py-3">Tailor Payroll Released</th>
                <th className="px-6 py-3">Profit Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-black text-teal-950">{rep.period}</td>
                  <td className="px-6 py-4 font-bold text-emerald-700">₹{rep.revenue.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{rep.newSignups} Users</td>
                  <td className="px-6 py-4 font-medium text-slate-600">{rep.ordersCompleted} Fits</td>
                  <td className="px-6 py-4 text-slate-500">₹{rep.tailorPayout.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 font-black text-orange-600 flex items-center gap-1">
                    <TrendingUp size={14} /> {rep.profitMargin}
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