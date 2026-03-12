
import { useState } from "react";
import {
  FaShoppingCart, FaBox, FaUsers, FaRupeeSign,
  FaArrowUp, FaArrowDown, FaExclamationTriangle,
  FaCheckCircle, FaClock, FaTruck, FaTimes,
  FaChartLine, FaBell, FaEye
} from "react-icons/fa";

// ── Stat Card ────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, gradient, change, positive }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "22px 20px",
      border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "box-shadow 0.2s", cursor: "default",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 28px rgba(15,23,42,0.12)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(15,23,42,0.06)"}
    >
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</p>
        <p style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>{value}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {positive
            ? <FaArrowUp style={{ color: "#16a34a", fontSize: 10 }} />
            : <FaArrowDown style={{ color: "#dc2626", fontSize: 10 }} />}
          <span style={{ fontSize: 12, fontWeight: 700, color: positive ? "#16a34a" : "#dc2626" }}>{change}</span>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>vs last month</span>
        </div>
      </div>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: gradient,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
        flexShrink: 0,
      }}>
        <Icon size={22} color="#fff" />
      </div>
    </div>
  );
}

// ── Status Badge ─────────────────────────────────────────────
const STATUS = {
  Pending:    { bg: "#fffbeb", color: "#b45309", border: "#fde68a", icon: FaClock },
  Processing: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe", icon: FaTruck },
  Completed:  { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0", icon: FaCheckCircle },
  Cancelled:  { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca", icon: FaTimes },
};

function Badge({ status }) {
  const cfg = STATUS[status] || STATUS.Pending;
  const Icon = cfg.icon;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 20,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
      fontSize: 11, fontWeight: 700,
    }}>
      <Icon size={9} /> {status}
    </span>
  );
}

// ── Mini Alert ───────────────────────────────────────────────
function AlertItem({ icon: Icon, message, sub, color, bg, border }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 14px", borderRadius: 10,
      background: bg, border: `1px solid ${border}`,
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9, background: color + "22",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={14} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{message}</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>{sub}</div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────
export default function SupplierHomePage() {
  const [activeOrderTab, setActiveOrderTab] = useState("All");
  const supplierName = localStorage.getItem("userBusiness") || localStorage.getItem("userName") || "Supplier";
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const stats = [
    { title: "Total Products",  value: "24",        icon: FaBox,         gradient: "linear-gradient(135deg,#3b82f6,#1d4ed8)", change: "+12%", positive: true  },
    { title: "Total Orders",    value: "156",        icon: FaShoppingCart,gradient: "linear-gradient(135deg,#10b981,#047857)", change: "+8%",  positive: true  },
    { title: "Revenue",         value: "₹2,45,000",  icon: FaRupeeSign,   gradient: "linear-gradient(135deg,#8b5cf6,#6d28d9)", change: "+15%", positive: true  },
    { title: "Active Buyers",   value: "89",         icon: FaUsers,       gradient: "linear-gradient(135deg,#f97316,#c2410c)", change: "-2%",  positive: false },
  ];

  const recentOrders = [
    { id: "#2281", buyer: "ABC Corp",        product: "Rice Bags",     amount: "₹12,000", status: "Pending",    date: "2025-06-10", qty: 20 },
    { id: "#2280", buyer: "XYZ Ltd",         product: "Oil Bottles",   amount: "₹8,500",  status: "Completed",  date: "2025-06-09", qty: 15 },
    { id: "#2279", buyer: "DEF Industries",  product: "Wheat Flour",   amount: "₹15,200", status: "Processing", date: "2025-06-08", qty: 30 },
    { id: "#2278", buyer: "Star Traders",    product: "Sugar Bags",    amount: "₹6,400",  status: "Completed",  date: "2025-06-07", qty: 10 },
    { id: "#2277", buyer: "Fresh Foods Co",  product: "Spice Packs",   amount: "₹3,900",  status: "Cancelled",  date: "2025-06-06", qty: 8  },
    { id: "#2276", buyer: "Metro Supplies",  product: "Soap Cartons",  amount: "₹5,100",  status: "Processing", date: "2025-06-05", qty: 12 },
  ];

  const alerts = [
    { icon: FaExclamationTriangle, message: "Low stock: Rice Bags",    sub: "Only 8 units remaining",       color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
    { icon: FaBell,                message: "New order from ABC Corp", sub: "₹12,000 · Pending approval",  color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
    { icon: FaExclamationTriangle, message: "Out of stock: Wheat Flour", sub: "Restock needed immediately", color: "#b91c1c", bg: "#fef2f2", border: "#fecaca" },
  ];

  const topProducts = [
    { name: "Rice Bags",    sold: 320, revenue: "₹72,000", pct: 88 },
    { name: "Oil Bottles",  sold: 215, revenue: "₹43,000", pct: 62 },
    { name: "Wheat Flour",  sold: 180, revenue: "₹36,000", pct: 52 },
    { name: "Spice Packs",  sold: 140, revenue: "₹28,000", pct: 41 },
    { name: "Soap Cartons", sold: 95,  revenue: "₹19,000", pct: 27 },
  ];

  const orderTabs = ["All", "Pending", "Processing", "Completed", "Cancelled"];
  const visibleOrders = activeOrderTab === "All"
    ? recentOrders
    : recentOrders.filter(o => o.status === activeOrderTab);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Welcome Banner ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)",
        borderRadius: 20, padding: "32px 36px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 8px 32px rgba(15,23,42,0.2)", overflow: "hidden", position: "relative",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", right: 80, bottom: -60, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%", background: "#4ade80",
              boxShadow: "0 0 8px #4ade80",
            }} />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}>Live Dashboard</span>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>
            Welcome back, {supplierName}! 👋
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, margin: 0 }}>
            Here's what's happening with your business today — {today}
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, position: "relative" }}>
          {[
            { label: "Today's Orders", value: "12" },
            { label: "Pending Actions", value: "3" },
          ].map(b => (
            <div key={b.label} style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14, padding: "16px 22px", textAlign: "center",
            }}>
              <div style={{ color: "#fff", fontSize: 26, fontWeight: 900 }}>{b.value}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, marginTop: 2 }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* ── Middle Row: Alerts + Top Products ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20 }}>

        {/* Alerts */}
        <div style={{
          background: "#fff", borderRadius: 16, overflow: "hidden",
          border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
        }}>
          <div style={{
            background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
            padding: "16px 20px", display: "flex", alignItems: "center", gap: 10,
          }}>
            <FaBell color="#fff" size={14} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Alerts & Notifications</span>
            <span style={{
              marginLeft: "auto", background: "#ef4444", color: "#fff",
              borderRadius: 20, padding: "2px 8px", fontSize: 11, fontWeight: 800,
            }}>{alerts.length}</span>
          </div>
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {alerts.map((a, i) => <AlertItem key={i} {...a} />)}
          </div>
        </div>

        {/* Top Products */}
        <div style={{
          background: "#fff", borderRadius: 16, overflow: "hidden",
          border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
        }}>
          <div style={{
            background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
            padding: "16px 20px", display: "flex", alignItems: "center", gap: 10,
          }}>
            <FaChartLine color="#fff" size={14} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Top Selling Products</span>
          </div>
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
            {topProducts.map((p, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6,
                      background: i === 0 ? "linear-gradient(135deg,#f59e0b,#d97706)" : "#f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 800, color: i === 0 ? "#fff" : "#64748b",
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{p.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{p.sold} sold</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>{p.revenue}</span>
                  </div>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: 99, height: 6, overflow: "hidden" }}>
                  <div style={{
                    width: `${p.pct}%`, height: "100%", borderRadius: 99,
                    background: i === 0
                      ? "linear-gradient(90deg,#3b82f6,#1d4ed8)"
                      : i === 1 ? "linear-gradient(90deg,#10b981,#047857)"
                      : "linear-gradient(90deg,#8b5cf6,#6d28d9)",
                    transition: "width 0.8s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Orders Table ── */}
      <div style={{
        background: "#fff", borderRadius: 16, overflow: "hidden",
        border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
      }}>
        {/* Table Header */}
        <div style={{
          background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
          padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FaShoppingCart color="#fff" size={14} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Recent Orders</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {orderTabs.map(tab => (
              <button key={tab} onClick={() => setActiveOrderTab(tab)} style={{
                padding: "5px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: 11,
                background: activeOrderTab === tab ? "#3b82f6" : "rgba(255,255,255,0.1)",
                color: activeOrderTab === tab ? "#fff" : "rgba(255,255,255,0.55)",
                transition: "all 0.15s",
              }}>{tab}</button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                {["Order ID", "Buyer", "Product", "Qty", "Amount", "Status", "Date", "Action"].map(h => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 700, color: "#374151",
                    letterSpacing: 0.5, whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleOrders.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8", fontSize: 14 }}>
                  No orders found.
                </td></tr>
              ) : visibleOrders.map((order, i) => (
                <tr key={order.id} style={{
                  borderBottom: "1px solid #f1f5f9",
                  background: i % 2 === 0 ? "#fff" : "#fafbff",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbff"}
                >
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#1d4ed8", fontSize: 13 }}>{order.id}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f172a", fontSize: 13 }}>{order.buyer}</td>
                  <td style={{ padding: "12px 16px", color: "#475569", fontSize: 13 }}>{order.product}</td>
                  <td style={{ padding: "12px 16px", color: "#64748b", fontSize: 13 }}>{order.qty}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#15803d", fontSize: 13 }}>{order.amount}</td>
                  <td style={{ padding: "12px 16px" }}><Badge status={order.status} /></td>
                  <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: 12 }}>{order.date}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button style={{
                      padding: "5px 12px", borderRadius: 7,
                      border: "1.5px solid #bfdbfe", background: "#eff6ff",
                      color: "#1d4ed8", fontSize: 11, fontWeight: 700,
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <FaEye size={10} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 20px", background: "#f8fafc", borderTop: "1px solid #e2e8f0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>
            Showing {visibleOrders.length} of {recentOrders.length} recent orders
          </span>
          <button style={{
            padding: "7px 16px", borderRadius: 8, border: "none",
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>
            View All Orders →
          </button>
        </div>
      </div>

    </div>
  );
}