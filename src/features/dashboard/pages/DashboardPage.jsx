/**
 * DASHBOARD PAGE
 * ─────────────────────────────────────────────────────────────────────────────
 * Landing page of the admin panel.
 * Currently shows placeholder cards.
 * Future: connect to analytics/summary APIs.
 */

export default function DashboardPage() {
  const stats = [
    { label: "Total Users",   value: "–", color: "bg-teal-500",  desc: "Registered users" },
    { label: "Active Orders", value: "–", color: "bg-blue-500",  desc: "Orders in progress" },
    { label: "Tailors",       value: "–", color: "bg-purple-500", desc: "Registered tailors" },
    { label: "Revenue",       value: "–", color: "bg-orange-500", desc: "This month" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Welcome to BookMyDarzi Admin</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${s.color} rounded-xl mb-3 flex items-center justify-center`}>
              <span className="text-white text-lg font-bold">–</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <p className="text-sm font-medium text-gray-600 mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Placeholder for future charts */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <p className="text-gray-400 text-sm">
          📊 Analytics charts will appear here once the analytics module is connected.
        </p>
      </div>
    </div>
  );
}
