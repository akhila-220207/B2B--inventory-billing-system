//this is home page  of supplier dashboard
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart, FaBox, FaUsers, FaRupeeSign,
  FaArrowUp, FaArrowDown, FaExclamationTriangle,
  FaCheckCircle, FaClock, FaTruck, FaTimes,
  FaChartLine, FaBell, FaEye, FaTrash
} from "react-icons/fa";

const API_BASE = "http://127.0.0.1:5000/api";

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
function AlertItem({ icon: Icon, message, sub, color, bg, border, action }) {
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
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{message}</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>{sub}</div>
      </div>
      {action && (
        <button onClick={action.onClick} style={{
          padding: "6px 12px", borderRadius: 6, border: "none",
          background: color, color: "#fff", fontSize: 11, fontWeight: 700,
          cursor: "pointer", whiteSpace: "nowrap",
        }}>
          {action.label}
        </button>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────
export default function SupplierHomePage() {
  const [activeOrderTab, setActiveOrderTab] = useState("All");
  const [recentOrders, setRecentOrders] = useState([]);
  const [refillModal, setRefillModal] = useState({ isOpen: false, product: null, addAmount: '' });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
    activeBuyers: 0,
    alerts: [],
    topProducts: [],
  });
  const navigate = useNavigate();
  const supplierName = localStorage.getItem("userBusiness") || localStorage.getItem("userName") || "Supplier";
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  // Fetch all data dynamically
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch orders
        const ordersRes = await fetch(`${API_BASE}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ordersData = ordersRes.ok ? await ordersRes.json() : [];
        
        // Fetch products
        const productsRes = await fetch(`${API_BASE}/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const productsData = productsRes.ok ? await productsRes.json() : [];
        
        // Sort orders by date (newest first)
        const sortedOrders = ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentOrders(sortedOrders);
        
        // Calculate stats
        const totalOrders = ordersData.length;
        const totalRevenue = ordersData.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        const totalProducts = productsData.length;
        
        // Calculate active buyers (unique buyers)
        const uniqueBuyers = new Set(ordersData.map(o => o.buyerId || o.buyer)).size;
        
        // Calculate top selling products
        const productSalesMap = {};
        ordersData.forEach(order => {
          order.items?.forEach(item => {
            if (!productSalesMap[item._id]) {
              productSalesMap[item._id] = {
                id: item._id,
                name: item.name,
                sold: 0,
                revenue: 0,
              };
            }
            productSalesMap[item._id].sold += item.quantity || 0;
            productSalesMap[item._id].revenue += (item.price * (item.quantity || 0)) || 0;
          });
        });
        
        const topSellingProducts = Object.values(productSalesMap)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5)
          .map(p => ({
            id: p.id,
            name: p.name,
            sold: p.sold,
            revenue: `₹${p.revenue.toLocaleString("en-IN")}`,
            pct: Math.min(100, Math.round((p.sold / 500) * 100))
          }));
        
        // Generate dynamic alerts
        const dynamicAlerts = [];
        
        // Alert for pending orders
        const pendingOrders = ordersData.filter(o => o.status === 'Processing').length;
        if (pendingOrders > 0) {
          dynamicAlerts.push({
            icon: FaTruck,
            message: `${pendingOrders} pending orders`,
            sub: `${pendingOrders} order${pendingOrders > 1 ? 's' : ''} awaiting processing`,
            color: "#1d4ed8",
            bg: "#eff6ff",
            border: "#bfdbfe"
          });
        }
        
        // Alert for recent orders
        const recentOrdersCount = ordersData.filter(o => {
          const orderDate = new Date(o.createdAt);
          const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
          return orderDate > oneDayAgo;
        }).length;
        
        if (recentOrdersCount > 0) {
          dynamicAlerts.push({
            icon: FaBell,
            message: `${recentOrdersCount} new orders today`,
            sub: `Total revenue: ₹${ordersData.filter(o => {
              const orderDate = new Date(o.createdAt);
              const todayStart = new Date();
              todayStart.setHours(0, 0, 0, 0);
              return orderDate > todayStart;
            }).reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString("en-IN")}`,
            color: "#1d4ed8",
            bg: "#eff6ff",
            border: "#bfdbfe"
          });
        }
        
        // Alert for low stock products (< 30% of initial stock)
        const lowStockProducts = productsData.filter(p => {
          const currentStock = p.stockQty ?? 0;
          const initialStock = (p.initialStockQty && p.initialStockQty > 0) ? p.initialStockQty : Math.max(currentStock, 100);
          return currentStock <= (0.3 * initialStock);
        });
        
        if (lowStockProducts.length > 0) {
          if (lowStockProducts.length === 1) {
            dynamicAlerts.push({
              icon: FaExclamationTriangle,
              message: `Restock Alert: ${lowStockProducts[0].name}`,
              sub: `Stock dropped to 30% or below (${lowStockProducts[0].stockQty ?? 0} units left). Please restock!`,
              color: "#b45309",
              bg: "#fffbeb",
              border: "#fde68a",
              action: { label: "Refill", onClick: () => setRefillModal({ isOpen: true, product: lowStockProducts[0], addAmount: '' }) }
            });
          } else {
            dynamicAlerts.push({
              icon: FaExclamationTriangle,
              message: `Restock Alert: ${lowStockProducts.length} products low on stock`,
              sub: `Multiple products have dropped to 30% or below. Please check your inventory!`,
              color: "#b45309",
              bg: "#fffbeb",
              border: "#fde68a",
              action: { label: "Manage", onClick: () => navigate("/supplier-dashboard/products") }
            });
            // highlight the one with the lowest stock
            const critical = [...lowStockProducts].sort((a,b) => (a.stockQty||0) - (b.stockQty||0))[0];
            dynamicAlerts.push({
              icon: FaExclamationTriangle,
              message: `Critical item: ${critical.name}`,
              sub: `Only ${critical.stockQty ?? 0} units remaining.`,
              color: "#dc2626",
              bg: "#fef2f2",
              border: "#fecaca",
              action: { label: "Refill", onClick: () => setRefillModal({ isOpen: true, product: critical, addAmount: '' }) }
            });
          }
        }
        
        setStats({
          totalProducts,
          totalOrders,
          revenue: totalRevenue,
          activeBuyers: uniqueBuyers,
          alerts: dynamicAlerts,
          topProducts: topSellingProducts,
        });
        
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This will remove it from the marketplace.`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        // Update local status to reflect deletion
        setStats(prev => ({
          ...prev,
          totalProducts: prev.totalProducts - 1,
          topProducts: prev.topProducts.filter(p => p.id !== id)
        }));
        alert("Product deleted successfully");
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to delete product");
      }
    } catch (err) {
      console.error("Delete product error:", err);
      alert("Network error. Could not delete product.");
    }
  };

  const statCards = [
    { title: "Total Products",  value: stats.totalProducts.toString(),        icon: FaBox,         gradient: "linear-gradient(135deg,#3b82f6,#1d4ed8)", change: "+12%", positive: true  },
    { title: "Total Orders",    value: stats.totalOrders.toString(),        icon: FaShoppingCart,gradient: "linear-gradient(135deg,#10b981,#047857)", change: "+8%",  positive: true  },
    { title: "Revenue",         value: `₹${stats.revenue.toLocaleString("en-IN")}`,  icon: FaRupeeSign,   gradient: "linear-gradient(135deg,#8b5cf6,#6d28d9)", change: "+15%", positive: true  },
    { title: "Active Buyers",   value: stats.activeBuyers.toString(),         icon: FaUsers,       gradient: "linear-gradient(135deg,#f97316,#c2410c)", change: "-2%",  positive: false },
  ];

  const alerts = !stats.alerts || stats.alerts.length === 0 ? [
    { icon: FaCheckCircle, message: "All systems operational",    sub: "Your business is running smoothly",       color: "#10b981", bg: "#f0fdf4", border: "#bbf7d0" },
  ] : stats.alerts;

  const topProducts = stats.topProducts && stats.topProducts.length > 0 ? stats.topProducts : [];

  const orderTabs = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
  
  // Filter orders based on active tab
  const visibleOrders = activeOrderTab === "All"
    ? recentOrders.slice(0, 10)
    : recentOrders.filter(o => o.status === activeOrderTab).slice(0, 10);

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
            { label: "Today's Orders", value: recentOrders.filter(o => {
              const orderDate = new Date(o.createdAt);
              const todayStart = new Date();
              todayStart.setHours(0, 0, 0, 0);
              return orderDate > todayStart;
            }).length.toString() },
            { label: "Pending Actions", value: recentOrders.filter(o => o.status === 'Processing').length.toString() },
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
        {statCards.map((s, i) => <StatCard key={i} {...s} />)}
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
              marginLeft: "auto", background: stats.alerts && stats.alerts.length > 0 ? "#ef4444" : "#10b981", color: "#fff",
              borderRadius: 20, padding: "2px 8px", fontSize: 11, fontWeight: 800,
            }}>{stats.alerts ? stats.alerts.length : 0}</span>
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
            {topProducts && topProducts.length > 0 ? (
              topProducts.map((p, i) => (
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
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#64748b" }}>{p.sold} sold</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>{p.revenue}</span>
                      <button 
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        style={{
                          background: "transparent", border: "none", color: "#ef4444",
                          cursor: "pointer", padding: "4px", borderRadius: "50%",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        title="Delete Product"
                      >
                        <FaTrash size={12} />
                      </button>
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
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "#94a3b8", fontSize: 13 }}>
                No products sold yet.
              </div>
            )}
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
                <tr key={order._id} style={{
                  borderBottom: "1px solid #f1f5f9",
                  background: i % 2 === 0 ? "#fff" : "#fafbff",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbff"}
                >
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#1d4ed8", fontSize: 13 }}>#{order._id.slice(-8).toUpperCase()}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f172a", fontSize: 13 }}>{order.buyerName || "N/A"}</td>
                  <td style={{ padding: "12px 16px", color: "#475569", fontSize: 13 }}>{order.items?.length > 0 ? order.items[0]?.name : "N/A"}</td>
                  <td style={{ padding: "12px 16px", color: "#64748b", fontSize: 13 }}>{order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#15803d", fontSize: 13 }}>₹{order.totalAmount?.toLocaleString("en-IN") || 0}</td>
                  <td style={{ padding: "12px 16px" }}><Badge status={order.status} /></td>
                  <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: 12 }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button 
                      onClick={() => navigate(`/order-tracking/${order._id}`)}
                      style={{
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
          <button 
            onClick={() => navigate("/supplier-dashboard/orders")}
            style={{
              padding: "7px 16px", borderRadius: 8, border: "none",
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}>
            View All Orders →
          </button>
        </div>
      </div>

      {/* ── Refill Stock Modal ── */}
      {refillModal.isOpen && (
        <div onClick={() => setRefillModal({ isOpen: false, product: null, addAmount: '' })} style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 200, backdropFilter: "blur(4px)",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#fff", borderRadius: 18, padding: "32px 28px",
            width: 360, boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          }}>
            <h3 style={{ margin: "0 0 16px", color: "#0f172a", fontWeight: 900, fontSize: 18, textAlign: "center" }}>
              Refill Stock: {refillModal.product?.name}
            </h3>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20, textAlign: "center" }}>
              Current Stock: <strong style={{color:"#0f172a"}}>{refillModal.product?.stockQty ?? 0}</strong> units
            </p>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                Quantity to Add *
              </label>
              <input 
                type="number" 
                value={refillModal.addAmount}
                onChange={e => setRefillModal({ ...refillModal, addAmount: e.target.value })}
                placeholder="e.g. 50"
                style={{
                  width: "100%", padding: "10px 13px", borderRadius: 9,
                  border: "2px solid #e5e7eb", background: "#f9fafb",
                  fontSize: 13, color: "#111827", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button 
                onClick={async () => {
                  const toAdd = Number(refillModal.addAmount);
                  if (!toAdd || toAdd <= 0) return alert("Enter a valid amount to add.");
                  try {
                    const res = await fetch(`${API_BASE}/products/refill/${refillModal.product._id}`, {
                      method: "PUT",
                      headers: { 
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                      },
                      body: JSON.stringify({ quantity: toAdd })
                    });
                    if (res.ok) {
                      alert("Stock restocked successfully!");
                      window.location.reload();
                    } else {
                      alert("Failed to update stock in database.");
                    }
                  } catch(e) { alert("Network error. Could not connect to the server."); }
                }}
                style={{
                  flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
                }}>Refill Stock</button>
              <button onClick={() => setRefillModal({ isOpen: false, product: null, addAmount: '' })} style={{
                flex: 1, padding: "11px 0", borderRadius: 10,
                border: "2px solid #e5e7eb", background: "#f9fafb",
                color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer",
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
