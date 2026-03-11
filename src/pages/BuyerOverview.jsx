import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaRocket, 
  FaArrowRight, 
  FaChartLine, 
  FaStore, 
  FaClipboardList, 
  FaFileInvoiceDollar 
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

export default function BuyerOverview() {
  const [stats, setStats] = useState({ orders: 0, spending: 0, items: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const orders = await res.json();
          const totalSpent = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
          const totalItems = orders.reduce(
            (s, o) => s + o.items.reduce((si, i) => si + (i.quantity || 0), 0),
            0
          );
          setStats({ orders: orders.length, spending: totalSpent, items: totalItems });
        }
      } catch (err) {
        console.error("Error fetching overview stats:", err);
      }
    };
    fetchStats();
  }, []);

  const quickLinks = [
    { 
      label: "Shop", 
      desc: "Buy new products", 
      to: "/buyer-dashboard/marketplace", 
      icon: FaStore, 
      color: "bg-blue-600" 
    },
    { 
      label: "Reports", 
      desc: "See your buying habits", 
      to: "/buyer-dashboard/reports", 
      icon: FaChartLine, 
      color: "bg-indigo-600" 
    },
    { 
      label: "Invoices", 
      desc: "Manage your bills", 
      to: "/buyer-dashboard/invoices", 
      icon: FaFileInvoiceDollar, 
      color: "bg-slate-900" 
    },
    { 
      label: "Orders", 
      desc: "Track your items", 
      to: "/buyer-dashboard/orders", 
      icon: FaClipboardList, 
      color: "bg-emerald-600" 
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Welcome Section */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">
              Welcome to Your <span className="text-blue-600">Dashboard</span>
            </h2>

            <p className="max-w-md text-slate-500 font-medium leading-relaxed">
              Manage your business here. Check your orders, track shipments, and view your bills all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/buyer-dashboard/marketplace")}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
              >
                <FaRocket className="text-blue-400" />
                Start Shopping
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 py-6 px-8 rounded-3xl border border-slate-100/50">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                Total Spent
              </p>
              <p className="text-xl font-black text-slate-900">
                ₹{stats.spending.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="bg-slate-50 py-6 px-8 rounded-3xl border border-slate-100/50">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                Total Orders
              </p>
              <p className="text-xl font-black text-slate-900">{stats.orders}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-8 ml-2">
          Quick Links
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {quickLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 border-l-4 border-l-blue-900 shadow-lg shadow-slate-200/20 hover:shadow-2xl hover:-translate-y-1 hover:border-l-blue-700 transition-all group"
            >
              <div
                className={`w-14 h-14 ${link.color} rounded-2xl flex items-center justify-center text-white text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <link.icon />
              </div>

              <h4 className="text-sm font-black text-slate-900 mb-1">
                {link.label}
              </h4>

              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide flex items-center gap-2">
                {link.desc}
                <FaArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </p>
            </Link>
          ))}

        </div>
      </div>

      {/* Strategic Tip */}
      <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white flex items-center justify-between gap-8 shadow-2xl shadow-blue-200">

        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl shrink-0">
            💡
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-widest text-blue-100 mb-1">
              Helpful Tip
            </p>

            <p className="text-sm font-medium opacity-90 leading-relaxed">
              Download your invoice list every month to keep track of your business spending.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/buyer-dashboard/invoices")}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-blue-50 transition-colors shrink-0"
        >
          Go to Invoices
        </button>

      </div>

    </div>
  );
}