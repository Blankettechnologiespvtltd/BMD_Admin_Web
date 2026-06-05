import React from "react";
import { Plus } from "lucide-react";

export default function CampaignTab({
  list,
  showAddCampaign,
  setShowAddCampaign,
  newCampaign,
  setNewCampaign,
  handleCreateCampaign
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="font-black text-teal-950 text-xl">Marketing Campaigns Ledger</h4>
        <button
          onClick={() => setShowAddCampaign(!showAddCampaign)}
          className="bg-orange-500 hover:bg-orange-600 text-teal-950 font-black px-4 py-2 rounded-xl flex items-center gap-2 transition text-sm shadow-sm"
        >
          <Plus size={16} /> Quick Add Campaign
        </button>
      </div>

      {showAddCampaign && (
        <form onSubmit={handleCreateCampaign} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Campaign Name</label>
            <input
              type="text"
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newCampaign.name}
              onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              placeholder="e.g. Diwali Fashion Blast"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Promo Code</label>
            <input
              type="text"
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase font-bold"
              value={newCampaign.code}
              onChange={(e) => setNewCampaign({ ...newCampaign, code: e.target.value })}
              placeholder="DIWALI50"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Discount Metric</label>
            <input
              type="text"
              className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newCampaign.discount}
              onChange={(e) => setNewCampaign({ ...newCampaign, discount: e.target.value })}
              placeholder="50% OFF / Flat ₹300"
              required
            />
          </div>
          <div className="sm:col-span-3 flex justify-end space-x-3 mt-2">
            <button
              type="button"
              onClick={() => setShowAddCampaign(false)}
              className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-950 hover:bg-teal-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
            >
              Save Campaign Code
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
                <th className="px-6 py-3">Campaign Details</th>
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Discount</th>
                <th className="px-6 py-3">Reach & Conversion</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-black text-teal-950">{camp.name}</td>
                  <td className="px-6 py-4 font-mono font-bold text-xs text-slate-700 bg-slate-50/50">{camp.code}</td>
                  <td className="px-6 py-4 text-orange-600 font-extrabold">{camp.discount}</td>
                  <td className="px-6 py-4 text-xs">
                    <div className="font-semibold text-slate-700">{camp.reached}</div>
                    <div className="text-teal-600 font-medium mt-0.5">Conv Rate: {camp.conversion}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      camp.status === "Running" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}>
                      {camp.status}
                    </span>
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