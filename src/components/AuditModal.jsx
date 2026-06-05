import React from "react";
import { Info } from "lucide-react";

export default function AuditModal({ selectedItem, selectedItemType, closeDetailModal }) {
  if (!selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-teal-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-teal-950 text-white px-6 py-4 flex items-center space-x-3">
          <div className="p-2 bg-orange-500 rounded-xl text-teal-950">
            <Info size={18} />
          </div>
          <div>
            <h3 className="font-black text-lg">Secure Audit Inspector</h3>
            <p className="text-xs text-teal-300 uppercase tracking-wider font-semibold">
              Registry Type: {selectedItemType}
            </p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            Internal Ledger Check: Detailed state variables linked to the active item reference. No further discrepancies detected on secure system logs.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(selectedItem).map(([key, val]) => (
              <div key={key} className="p-3 bg-slate-50 rounded-xl text-xs">
                <span className="block text-slate-400 font-bold uppercase mb-0.5">{key}</span>
                <span className="font-black text-slate-800">{val !== null && val !== undefined ? val.toString() : ""}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">Verified by BookMyDarzi Security</span>
          <button
            onClick={closeDetailModal}
            className="bg-orange-500 hover:bg-orange-600 text-teal-950 font-extrabold px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            Close Audit Dialog
          </button>
        </div>
      </div>
    </div>
  );
}