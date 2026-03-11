import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", icon: "⌂" },
  { label: "Products", icon: "▦" },
  { label: "Inventory", icon: "▤" },
  { label: "Orders", icon: "☰", active: true },
  { label: "Billing", icon: "▣" },
  { label: "Reports", icon: "▧" },
  { label: "Settings", icon: "⚙" },
];

function Sidebar() {
  return (
    <aside style={{
      width: 240, minHeight: "100vh",
      background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
      display: "flex", flexDirection: "column",
      boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
      position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 100,
    }}>
      <div style={{
        padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 18, color: "#fff",
          boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
        }}>S</div>
        <span style={{ fontFamily: "'Georgia', serif", color: "#fff", fontSize: 17, fontWeight: 700 }}>
          Supplier<span style={{ color: "#3b82f6" }}>Panel</span>
        </span>
        <div style={{
          marginLeft: "auto", width: 22, height: 22, borderRadius: "50%",
          background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, color: "#fff",
        }}>✦</div>
      </div>
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV_ITEMS.map(item => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 14px", borderRadius: 10, cursor: "pointer",
            background: item.active ? "linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%)" : "transparent",
            color: item.active ? "#fff" : "rgba(255,255,255,0.55)",
            fontSize: 14, fontWeight: item.active ? 600 : 400,
            boxShadow: item.active ? "0 4px 12px rgba(37,99,235,0.35)" : "none",
          }}>
            <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
      <div style={{
        margin: 16, padding: "12px 14px", borderRadius: 12,
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, color: "#fff", fontWeight: 700,
        }}>S</div>
        <div>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Supplier Name</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Supplier Account</div>
        </div>
      </div>
    </aside>
  );
}

const STATUS_CONFIG = {
  Pending:   { bg: "#fffbeb", color: "#b45309", border: "#fde68a", icon: "⏳", label: "Pending" },
  Shipped:   { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0", icon: "🚚", label: "Shipped" },
  Delivered: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe", icon: "✅", label: "Delivered" },
  Cancelled: { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca", icon: "✕",  label: "Cancelled" },
};

const STATUS_ORDER = ["Pending", "Shipped", "Delivered", "Cancelled"];

const INITIAL_ORDERS = [
  { id: "#1021", buyer: "XYZ Shop",      products: "Rice Bags",     qty: 10, total: 2400, status: "Pending",   date: "2025-06-01", address: "Door 12-3, MG Road, Vijayawada, Andhra Pradesh", phone: "+91 98001 11234" },
  { id: "#1022", buyer: "ABC Mart",       products: "Oil Bottles",   qty: 8,  total: 800,  status: "Shipped",   date: "2025-06-02", address: "45 Market Street, Guntur, Andhra Pradesh",      phone: "+91 98002 22345" },
  { id: "#1023", buyer: "Fresh Foods",    products: "Wheat Flour",   qty: 20, total: 3600, status: "Delivered", date: "2025-06-03", address: "Plot 7, Industrial Area, Visakhapatnam, AP",    phone: "+91 98003 33456" },
  { id: "#1024", buyer: "Star Traders",   products: "Sugar Bags",    qty: 15, total: 1800, status: "Pending",   date: "2025-06-04", address: "22 Gandhi Nagar, Nellore, Andhra Pradesh",      phone: "+91 98004 44567" },
  { id: "#1025", buyer: "Daily Needs",    products: "Pulses Assort", qty: 5,  total: 950,  status: "Cancelled", date: "2025-06-05", address: "8B, Main Bazaar, Kurnool, Andhra Pradesh",      phone: "+91 98005 55678" },
  { id: "#1026", buyer: "Metro Supplies", products: "Spice Packs",   qty: 30, total: 4200, status: "Shipped",   date: "2025-06-06", address: "78, Lake View Road, Tirupati, Andhra Pradesh",  phone: "+91 98006 66789" },
];

function StatCard({ label, value, icon, bg, color, border }) {
  return (
    <div style={{
      background: bg, border: `1px solid ${border}`,
      borderRadius: 14, padding: "18px 20px",
      display: "flex", alignItems: "center", gap: 14,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: color + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 800, color }}>{value}</div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ buyer: "", products: "", qty: "", total: "", address: "", phone: "" });

  const advanceStatus = (id) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const idx = STATUS_ORDER.indexOf(o.status);
      const next = STATUS_ORDER[Math.min(idx + 1, STATUS_ORDER.length - 1)];
      return { ...o, status: next };
    }));
  };

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    setDeleteId(null);
  };

  const handleAddOrder = () => {
    if (!newOrder.buyer || !newOrder.products) return;
    const id = `#${1000 + orders.length + 27}`;
    setOrders(prev => [...prev, {
      ...newOrder,
      id,
      qty: Number(newOrder.qty) || 1,
      total: Number(newOrder.total) || 0,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
    }]);
    setNewOrder({ buyer: "", products: "", qty: "", total: "", address: "", phone: "" });
    setAddModal(false);
  };

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const filtered = orders
    .filter(o => {
      const q = search.toLowerCase();
      return (
        (o.buyer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.products.toLowerCase().includes(q)) &&
        (statusFilter === "All" || o.status === statusFilter)
      );
    })
    .sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy];
      if (sortBy === "total" || sortBy === "qty") { av = Number(av); bv = Number(bv); }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const totalRevenue = orders.reduce((s, o) => s + (o.status !== "Cancelled" ? o.total : 0), 0);

  const SortIcon = ({ col }) => (
    <span style={{ marginLeft: 4, opacity: sortBy === col ? 1 : 0.3, fontSize: 10 }}>
      {sortBy === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    padding: "9px 12px", borderRadius: 8,
    border: "1.5px solid #e5e7eb", background: "#f9fafb",
    fontSize: 13, color: "#111827", outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Sidebar />

      <main style={{ marginLeft: 240, flex: 1, background: "#f1f5f9", minHeight: "100vh", padding: "36px 36px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "#fff", boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
              }}>☰</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", margin: 0 }}>Orders Dashboard</h1>
            </div>
            <p style={{ color: "#64748b", fontSize: 14, margin: 0, paddingLeft: 50 }}>
              Track, manage and update all buyer orders in one place
            </p>
          </div>
          <button onClick={() => setAddModal(true)} style={{
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#fff", border: "none", borderRadius: 11,
            padding: "11px 20px", fontWeight: 700, fontSize: 14,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
          }}>
            + New Order
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 28 }}>
          <StatCard label="Total Orders"  value={orders.length} icon="📦" bg="#fff"    color="#0f172a"  border="#e2e8f0" />
          <StatCard label="Pending"       value={orders.filter(o=>o.status==="Pending").length}   icon="⏳" bg="#fffbeb" color="#b45309" border="#fde68a" />
          <StatCard label="Shipped"       value={orders.filter(o=>o.status==="Shipped").length}   icon="🚚" bg="#f0fdf4" color="#15803d" border="#bbf7d0" />
          <StatCard label="Delivered"     value={orders.filter(o=>o.status==="Delivered").length} icon="✅" bg="#eff6ff" color="#1d4ed8" border="#bfdbfe" />
          <StatCard label="Revenue"       value={`₹${totalRevenue.toLocaleString()}`}            icon="₹"  bg="#faf5ff" color="#7c3aed" border="#ddd6fe" />
        </div>

        {/* Filters */}
        <div style={{
          background: "#fff", borderRadius: 14, padding: "16px 20px",
          display: "flex", gap: 12, alignItems: "center", marginBottom: 20,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0",
          flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
            <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 14 }}>🔍</span>
            <input
              type="text" placeholder="Search by buyer, ID, or product..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 32, border: "1.5px solid #e2e8f0" }}
            />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["All", ...STATUS_ORDER].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{
                padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: 12,
                background: statusFilter === s ? "#1d4ed8" : "#f1f5f9",
                color: statusFilter === s ? "#fff" : "#64748b",
                transition: "all 0.15s",
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: "#fff", borderRadius: 16,
          boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
          border: "1px solid #e2e8f0", overflow: "hidden",
        }}>
          {/* Table Header */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
              {filtered.length} Order{filtered.length !== 1 ? "s" : ""} Found
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              Click column headers to sort
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                  {[
                    { label: "Order ID", col: "id" },
                    { label: "Buyer",    col: "buyer" },
                    { label: "Products", col: "products" },
                    { label: "Qty",      col: "qty" },
                    { label: "Total",    col: "total" },
                    { label: "Date",     col: "date" },
                    { label: "Status",   col: "status" },
                  ].map(h => (
                    <th key={h.col} onClick={() => toggleSort(h.col)} style={{
                      padding: "13px 16px", textAlign: "left",
                      fontSize: 12, fontWeight: 700, color: "#374151",
                      letterSpacing: 0.5, cursor: "pointer",
                      userSelect: "none", whiteSpace: "nowrap",
                    }}>
                      {h.label}<SortIcon col={h.col} />
                    </th>
                  ))}
                  <th style={{ padding: "13px 16px", fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.5 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "48px 0", color: "#94a3b8", fontSize: 15 }}>
                      No orders match your filters.
                    </td>
                  </tr>
                ) : filtered.map((o, i) => {
                  const sc = STATUS_CONFIG[o.status];
                  return (
                    <tr key={o.id} style={{
                      borderBottom: "1px solid #f1f5f9",
                      background: i % 2 === 0 ? "#fff" : "#fafbff",
                      transition: "background 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbff"}
                    >
                      <td style={{ padding: "13px 16px", fontWeight: 700, color: "#1d4ed8", fontSize: 13 }}>{o.id}</td>
                      <td style={{ padding: "13px 16px", fontWeight: 600, color: "#0f172a", fontSize: 13 }}>{o.buyer}</td>
                      <td style={{ padding: "13px 16px", color: "#475569", fontSize: 13 }}>{o.products}</td>
                      <td style={{ padding: "13px 16px", color: "#475569", fontSize: 13, textAlign: "center" }}>{o.qty}</td>
                      <td style={{ padding: "13px 16px", fontWeight: 700, color: "#15803d", fontSize: 13 }}>₹{o.total.toLocaleString()}</td>
                      <td style={{ padding: "13px 16px", color: "#64748b", fontSize: 12 }}>{o.date}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{
                          padding: "5px 11px", borderRadius: 20,
                          background: sc.bg, color: sc.color,
                          border: `1px solid ${sc.border}`,
                          fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
                        }}>
                          {sc.icon} {sc.label}
                        </span>
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <button onClick={() => setSelectedOrder(o)} style={{
                            padding: "6px 11px", borderRadius: 7, border: "1.5px solid #bfdbfe",
                            background: "#eff6ff", color: "#1d4ed8", fontSize: 12, fontWeight: 600,
                            cursor: "pointer", whiteSpace: "nowrap",
                          }}>📍 View</button>
                          {o.status !== "Delivered" && o.status !== "Cancelled" && (
                            <button onClick={() => advanceStatus(o.id)} style={{
                              padding: "6px 11px", borderRadius: 7, border: "none",
                              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                              color: "#fff", fontSize: 12, fontWeight: 600,
                              cursor: "pointer", whiteSpace: "nowrap",
                            }}>→ Advance</button>
                          )}
                          <button onClick={() => setDeleteId(o.id)} style={{
                            padding: "6px 9px", borderRadius: 7, border: "1.5px solid #fecaca",
                            background: "#fef2f2", color: "#b91c1c", fontSize: 13, fontWeight: 700,
                            cursor: "pointer",
                          }}>✕</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div style={{
            padding: "12px 20px", background: "#f8fafc", borderTop: "1px solid #e2e8f0",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              Showing {filtered.length} of {orders.length} orders
            </span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              Total value shown: <strong style={{ color: "#0f172a" }}>
                ₹{filtered.filter(o => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0).toLocaleString()}
              </strong>
            </span>
          </div>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (() => {
        const sc = STATUS_CONFIG[selectedOrder.status];
        return (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
            backdropFilter: "blur(4px)",
          }}>
            <div style={{
              background: "#fff", borderRadius: 20, width: 440, overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            }}>
              <div style={{
                background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
                padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>Order {selectedOrder.id}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>{selectedOrder.date}</div>
                </div>
                <span style={{
                  padding: "5px 13px", borderRadius: 20,
                  background: sc.color + "25", color: sc.color,
                  fontSize: 12, fontWeight: 700, border: `1px solid ${sc.border}`,
                }}>
                  {sc.icon} {sc.label}
                </span>
              </div>
              <div style={{ padding: "24px" }}>
                {[
                  ["Buyer", selectedOrder.buyer],
                  ["Products", selectedOrder.products],
                  ["Quantity", selectedOrder.qty + " units"],
                  ["Total Amount", "₹" + selectedOrder.total.toLocaleString()],
                  ["Phone", selectedOrder.phone || "—"],
                  ["Address", selectedOrder.address],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    display: "flex", gap: 12, padding: "10px 0",
                    borderBottom: "1px solid #f1f5f9",
                  }}>
                    <span style={{ width: 110, fontSize: 12, color: "#94a3b8", fontWeight: 600, flexShrink: 0 }}>{k}</span>
                    <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                  {selectedOrder.status !== "Delivered" && selectedOrder.status !== "Cancelled" && (
                    <button onClick={() => { advanceStatus(selectedOrder.id); setSelectedOrder(null); }} style={{
                      flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}>→ Advance Status</button>
                  )}
                  <button onClick={() => setSelectedOrder(null)} style={{
                    flex: 1, padding: "11px 0", borderRadius: 10,
                    border: "2px solid #e5e7eb", background: "#f9fafb",
                    color: "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer",
                  }}>Close</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
          backdropFilter: "blur(4px)",
        }}>
          <div style={{
            background: "#fff", borderRadius: 18, padding: "32px 28px",
            width: 360, textAlign: "center",
            boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ margin: "0 0 8px", color: "#0f172a", fontWeight: 800, fontSize: 18 }}>Delete Order?</h3>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
              Order <strong>{deleteId}</strong> will be permanently removed.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => deleteOrder(deleteId)} style={{
                flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
                background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}>Delete</button>
              <button onClick={() => setDeleteId(null)} style={{
                flex: 1, padding: "11px 0", borderRadius: 10,
                border: "2px solid #e5e7eb", background: "#f9fafb",
                color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer",
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {addModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
          backdropFilter: "blur(4px)",
        }}>
          <div style={{
            background: "#fff", borderRadius: 20, width: 460, overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
          }}>
            <div style={{
              background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
              padding: "20px 24px",
            }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>+ New Order</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>Fill in the order details below</div>
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Buyer Name *", key: "buyer", placeholder: "e.g. XYZ Shop" },
                { label: "Products *",   key: "products", placeholder: "e.g. Rice Bags" },
                { label: "Quantity",     key: "qty", placeholder: "e.g. 10", type: "number" },
                { label: "Total (₹)",    key: "total", placeholder: "e.g. 2400", type: "number" },
                { label: "Phone",        key: "phone", placeholder: "+91 XXXXX XXXXX" },
                { label: "Address",      key: "address", placeholder: "Delivery address" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>{f.label}</label>
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    value={newOrder[f.key]}
                    onChange={e => setNewOrder(p => ({ ...p, [f.key]: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={handleAddOrder} style={{
                  flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
                }}>Add Order</button>
                <button onClick={() => setAddModal(false)} style={{
                  flex: 1, padding: "11px 0", borderRadius: 10,
                  border: "2px solid #e5e7eb", background: "#f9fafb",
                  color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer",
                }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}