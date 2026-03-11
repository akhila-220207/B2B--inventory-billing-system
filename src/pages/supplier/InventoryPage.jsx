import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", icon: "⌂" },
  { label: "Products", icon: "▦" },
  { label: "Inventory", icon: "▤", active: true },
  { label: "Orders", icon: "☰" },
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

const getStockStatus = (stock, threshold) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= threshold) return "Low Stock";
  return "Normal";
};

const STATUS_CONFIG = {
  "Normal":       { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0", icon: "✅" },
  "Low Stock":    { bg: "#fffbeb", color: "#b45309", border: "#fde68a", icon: "⚠" },
  "Out of Stock": { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca", icon: "✕" },
};

const CATEGORY_OPTIONS = ["All", "Grains", "Beverages", "Personal Care", "Dairy", "Spices", "Snacks"];

const INITIAL_INVENTORY = [
  { id: 1, product: "Rice Bags",       category: "Grains",        stock: 50,  threshold: 10, unit: "Bags",    price: 850,  lastUpdated: "2025-06-06" },
  { id: 2, product: "Oil Bottles",     category: "Beverages",     stock: 8,   threshold: 15, unit: "Bottles", price: 120,  lastUpdated: "2025-06-05" },
  { id: 3, product: "Soap",            category: "Personal Care",  stock: 200, threshold: 20, unit: "Pcs",     price: 35,   lastUpdated: "2025-06-04" },
  { id: 4, product: "Wheat Flour",     category: "Grains",        stock: 0,   threshold: 10, unit: "Bags",    price: 480,  lastUpdated: "2025-06-03" },
  { id: 5, product: "Milk Packets",    category: "Dairy",         stock: 12,  threshold: 20, unit: "Packets", price: 28,   lastUpdated: "2025-06-06" },
  { id: 6, product: "Spice Packs",     category: "Spices",        stock: 75,  threshold: 10, unit: "Packs",   price: 65,   lastUpdated: "2025-06-02" },
  { id: 7, product: "Biscuit Boxes",   category: "Snacks",        stock: 5,   threshold: 15, unit: "Boxes",   price: 55,   lastUpdated: "2025-06-01" },
  { id: 8, product: "Shampoo Bottles", category: "Personal Care",  stock: 90,  threshold: 10, unit: "Bottles", price: 145,  lastUpdated: "2025-06-05" },
];

function StatCard({ label, value, icon, bg, color, border }) {
  return (
    <div style={{
      background: bg, border: `1px solid ${border}`, borderRadius: 14,
      padding: "18px 20px", display: "flex", alignItems: "center", gap: 14,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, background: color + "18",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 500, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color }}>{value}</div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box",
  padding: "9px 12px", borderRadius: 8,
  border: "1.5px solid #e5e7eb", background: "#f9fafb",
  fontSize: 13, color: "#111827", outline: "none", fontFamily: "inherit",
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("product");
  const [sortDir, setSortDir] = useState("asc");
  const [editItem, setEditItem] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [restockId, setRestockId] = useState(null);
  const [restockQty, setRestockQty] = useState("");
  const [newItem, setNewItem] = useState({ product: "", category: "Grains", stock: "", threshold: "10", unit: "Pcs", price: "" });

  const withStatus = inventory.map(i => ({ ...i, status: getStockStatus(i.stock, i.threshold) }));

  const filtered = withStatus
    .filter(i => {
      const q = search.toLowerCase();
      return (
        (i.product.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)) &&
        (categoryFilter === "All" || i.category === categoryFilter) &&
        (statusFilter === "All" || i.status === statusFilter)
      );
    })
    .sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy];
      if (sortBy === "stock" || sortBy === "price" || sortBy === "threshold") { av = Number(av); bv = Number(bv); }
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const totalValue = withStatus.reduce((s, i) => s + i.stock * i.price, 0);
  const lowCount = withStatus.filter(i => i.status === "Low Stock").length;
  const outCount = withStatus.filter(i => i.status === "Out of Stock").length;

  const handleAdd = () => {
    if (!newItem.product) return;
    setInventory(prev => [...prev, {
      ...newItem, id: Date.now(),
      stock: Number(newItem.stock) || 0,
      threshold: Number(newItem.threshold) || 10,
      price: Number(newItem.price) || 0,
      lastUpdated: new Date().toISOString().slice(0, 10),
    }]);
    setNewItem({ product: "", category: "Grains", stock: "", threshold: "10", unit: "Pcs", price: "" });
    setAddModal(false);
  };

  const handleEdit = () => {
    setInventory(prev => prev.map(i => i.id === editItem.id ? {
      ...editItem,
      stock: Number(editItem.stock),
      threshold: Number(editItem.threshold),
      price: Number(editItem.price),
      lastUpdated: new Date().toISOString().slice(0, 10),
    } : i));
    setEditItem(null);
  };

  const handleRestock = () => {
    const qty = Number(restockQty);
    if (!qty || qty <= 0) return;
    setInventory(prev => prev.map(i => i.id === restockId
      ? { ...i, stock: i.stock + qty, lastUpdated: new Date().toISOString().slice(0, 10) } : i));
    setRestockId(null);
    setRestockQty("");
  };

  const SortIcon = ({ col }) => (
    <span style={{ marginLeft: 4, opacity: sortBy === col ? 1 : 0.3, fontSize: 10 }}>
      {sortBy === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  // Reusable Modal wrapper
  const Modal = ({ children, onClose }) => (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 200, backdropFilter: "blur(4px)",
    }}>
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );

  const ModalCard = ({ title, subtitle, children }) => (
    <div style={{ background: "#fff", borderRadius: 20, width: 460, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
      <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", padding: "20px 24px" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>{title}</div>
        {subtitle && <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
    </div>
  );

  const Field = ({ label, children }) => (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );

  const ActionBtn = ({ onClick, color, bg, border, children, flex }) => (
    <button onClick={onClick} style={{
      flex: flex ?? 1, padding: "11px 0", borderRadius: 10,
      border: border || "none", background: bg, color, fontWeight: 700,
      fontSize: 14, cursor: "pointer",
    }}>{children}</button>
  );

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
              }}>▤</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", margin: 0 }}>Inventory Dashboard</h1>
            </div>
            <p style={{ color: "#64748b", fontSize: 14, margin: 0, paddingLeft: 50 }}>
              Track stock levels, restock items, and manage your product inventory
            </p>
          </div>
          <button onClick={() => setAddModal(true)} style={{
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff",
            border: "none", borderRadius: 11, padding: "11px 20px",
            fontWeight: 700, fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
          }}>+ Add Product</button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 28 }}>
          <StatCard label="Total Products"  value={inventory.length}                        icon="📦" bg="#fff"    color="#0f172a" border="#e2e8f0" />
          <StatCard label="Normal Stock"    value={withStatus.filter(i=>i.status==="Normal").length} icon="✅" bg="#f0fdf4" color="#15803d" border="#bbf7d0" />
          <StatCard label="Low Stock"       value={lowCount}                                icon="⚠"  bg="#fffbeb" color="#b45309" border="#fde68a" />
          <StatCard label="Out of Stock"    value={outCount}                                icon="✕"  bg="#fef2f2" color="#b91c1c" border="#fecaca" />
          <StatCard label="Total Value"     value={`₹${(totalValue/1000).toFixed(1)}k`}    icon="₹"  bg="#faf5ff" color="#7c3aed" border="#ddd6fe" />
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
            <input type="text" placeholder="Search products or categories..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 32, border: "1.5px solid #e2e8f0" }} />
          </div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{
            ...inputStyle, width: "auto", cursor: "pointer", appearance: "none", paddingRight: 28,
          }}>
            {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{ display: "flex", gap: 6 }}>
            {["All", "Normal", "Low Stock", "Out of Stock"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{
                padding: "7px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: 12,
                background: statusFilter === s ? "#1d4ed8" : "#f1f5f9",
                color: statusFilter === s ? "#fff" : "#64748b",
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Low stock alert banner */}
        {(lowCount > 0 || outCount > 0) && (
          <div style={{
            background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12,
            padding: "12px 18px", marginBottom: 18,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>⚠</span>
            <span style={{ fontSize: 13, color: "#92400e", fontWeight: 600 }}>
              Attention: {lowCount > 0 && `${lowCount} product${lowCount > 1 ? "s" : ""} low on stock`}
              {lowCount > 0 && outCount > 0 && " · "}
              {outCount > 0 && `${outCount} product${outCount > 1 ? "s" : ""} out of stock`}
              {" — consider restocking soon."}
            </span>
          </div>
        )}

        {/* Table */}
        <div style={{
          background: "#fff", borderRadius: 16,
          boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
          border: "1px solid #e2e8f0", overflow: "hidden",
        }}>
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
              {filtered.length} Product{filtered.length !== 1 ? "s" : ""} Found
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Click column headers to sort</div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                  {[
                    { label: "Product",    col: "product" },
                    { label: "Category",   col: "category" },
                    { label: "Stock",      col: "stock" },
                    { label: "Unit",       col: "unit" },
                    { label: "Low Threshold", col: "threshold" },
                    { label: "Price (₹)", col: "price" },
                    { label: "Stock Value", col: null },
                    { label: "Last Updated", col: "lastUpdated" },
                    { label: "Status",     col: "status" },
                  ].map(h => (
                    <th key={h.label} onClick={() => h.col && toggleSort(h.col)} style={{
                      padding: "13px 14px", textAlign: "left", fontSize: 12,
                      fontWeight: 700, color: "#374151", letterSpacing: 0.4,
                      cursor: h.col ? "pointer" : "default", whiteSpace: "nowrap",
                      userSelect: "none",
                    }}>
                      {h.label}{h.col && <SortIcon col={h.col} />}
                    </th>
                  ))}
                  <th style={{ padding: "13px 14px", fontSize: 12, fontWeight: 700, color: "#374151" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={10} style={{ textAlign: "center", padding: "48px 0", color: "#94a3b8", fontSize: 15 }}>
                    No products match your filters.
                  </td></tr>
                ) : filtered.map((item, i) => {
                  const sc = STATUS_CONFIG[item.status];
                  const stockVal = item.stock * item.price;
                  return (
                    <tr key={item.id} style={{
                      borderBottom: "1px solid #f1f5f9",
                      background: i % 2 === 0 ? "#fff" : "#fafbff",
                      transition: "background 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbff"}
                    >
                      <td style={{ padding: "13px 14px", fontWeight: 700, color: "#0f172a", fontSize: 13 }}>
                        📦 {item.product}
                      </td>
                      <td style={{ padding: "13px 14px" }}>
                        <span style={{
                          background: "#eff6ff", color: "#1d4ed8", borderRadius: 6,
                          padding: "3px 9px", fontSize: 11, fontWeight: 600,
                        }}>{item.category}</span>
                      </td>
                      <td style={{
                        padding: "13px 14px", fontWeight: 800, fontSize: 15,
                        color: item.stock === 0 ? "#b91c1c" : item.stock <= item.threshold ? "#b45309" : "#15803d",
                      }}>{item.stock}</td>
                      <td style={{ padding: "13px 14px", color: "#64748b", fontSize: 12 }}>{item.unit}</td>
                      <td style={{ padding: "13px 14px", color: "#94a3b8", fontSize: 13 }}>{item.threshold}</td>
                      <td style={{ padding: "13px 14px", color: "#475569", fontSize: 13, fontWeight: 600 }}>₹{item.price}</td>
                      <td style={{ padding: "13px 14px", color: "#7c3aed", fontWeight: 700, fontSize: 13 }}>
                        ₹{stockVal.toLocaleString()}
                      </td>
                      <td style={{ padding: "13px 14px", color: "#94a3b8", fontSize: 12 }}>{item.lastUpdated}</td>
                      <td style={{ padding: "13px 14px" }}>
                        <span style={{
                          padding: "5px 10px", borderRadius: 20,
                          background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                          fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
                        }}>{sc.icon} {item.status}</span>
                      </td>
                      <td style={{ padding: "13px 14px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => { setRestockId(item.id); setRestockQty(""); }} style={{
                            padding: "6px 10px", borderRadius: 7,
                            border: "1.5px solid #bbf7d0", background: "#f0fdf4",
                            color: "#15803d", fontSize: 12, fontWeight: 600, cursor: "pointer",
                          }}>+ Stock</button>
                          <button onClick={() => setEditItem({ ...item })} style={{
                            padding: "6px 10px", borderRadius: 7,
                            border: "1.5px solid #bfdbfe", background: "#eff6ff",
                            color: "#1d4ed8", fontSize: 12, fontWeight: 600, cursor: "pointer",
                          }}>✎ Edit</button>
                          <button onClick={() => setDeleteId(item.id)} style={{
                            padding: "6px 9px", borderRadius: 7,
                            border: "1.5px solid #fecaca", background: "#fef2f2",
                            color: "#b91c1c", fontSize: 13, fontWeight: 700, cursor: "pointer",
                          }}>✕</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{
            padding: "12px 20px", background: "#f8fafc", borderTop: "1px solid #e2e8f0",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>Showing {filtered.length} of {inventory.length} products</span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              Visible stock value: <strong style={{ color: "#7c3aed" }}>
                ₹{filtered.reduce((s, i) => s + i.stock * i.price, 0).toLocaleString()}
              </strong>
            </span>
          </div>
        </div>
      </main>

      {/* Add Modal */}
      {addModal && (
        <Modal onClose={() => setAddModal(false)}>
          <ModalCard title="+ Add New Product" subtitle="Fill in the product inventory details">
            <Field label="Product Name *">
              <input value={newItem.product} onChange={e => setNewItem(p => ({ ...p, product: e.target.value }))}
                placeholder="e.g. Rice Bags" style={inputStyle} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Category">
                <select value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}
                  style={{ ...inputStyle, appearance: "none" }}>
                  {CATEGORY_OPTIONS.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Unit">
                <input value={newItem.unit} onChange={e => setNewItem(p => ({ ...p, unit: e.target.value }))}
                  placeholder="e.g. Bags, Pcs" style={inputStyle} />
              </Field>
              <Field label="Stock Quantity">
                <input type="number" value={newItem.stock} onChange={e => setNewItem(p => ({ ...p, stock: e.target.value }))}
                  placeholder="0" style={inputStyle} />
              </Field>
              <Field label="Low Stock Threshold">
                <input type="number" value={newItem.threshold} onChange={e => setNewItem(p => ({ ...p, threshold: e.target.value }))}
                  placeholder="10" style={inputStyle} />
              </Field>
              <Field label="Unit Price (₹)">
                <input type="number" value={newItem.price} onChange={e => setNewItem(p => ({ ...p, price: e.target.value }))}
                  placeholder="0" style={inputStyle} />
              </Field>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <ActionBtn onClick={handleAdd} bg="linear-gradient(135deg,#2563eb,#1d4ed8)" color="#fff">Add Product</ActionBtn>
              <ActionBtn onClick={() => setAddModal(false)} bg="#f9fafb" color="#374151" border="2px solid #e5e7eb">Cancel</ActionBtn>
            </div>
          </ModalCard>
        </Modal>
      )}

      {/* Edit Modal */}
      {editItem && (
        <Modal onClose={() => setEditItem(null)}>
          <ModalCard title="✎ Edit Product" subtitle={`Editing: ${editItem.product}`}>
            <Field label="Product Name">
              <input value={editItem.product} onChange={e => setEditItem(p => ({ ...p, product: e.target.value }))} style={inputStyle} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Category">
                <select value={editItem.category} onChange={e => setEditItem(p => ({ ...p, category: e.target.value }))}
                  style={{ ...inputStyle, appearance: "none" }}>
                  {CATEGORY_OPTIONS.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Unit">
                <input value={editItem.unit} onChange={e => setEditItem(p => ({ ...p, unit: e.target.value }))} style={inputStyle} />
              </Field>
              <Field label="Stock Quantity">
                <input type="number" value={editItem.stock} onChange={e => setEditItem(p => ({ ...p, stock: e.target.value }))} style={inputStyle} />
              </Field>
              <Field label="Low Stock Threshold">
                <input type="number" value={editItem.threshold} onChange={e => setEditItem(p => ({ ...p, threshold: e.target.value }))} style={inputStyle} />
              </Field>
              <Field label="Unit Price (₹)">
                <input type="number" value={editItem.price} onChange={e => setEditItem(p => ({ ...p, price: e.target.value }))} style={inputStyle} />
              </Field>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <ActionBtn onClick={handleEdit} bg="linear-gradient(135deg,#2563eb,#1d4ed8)" color="#fff">Save Changes</ActionBtn>
              <ActionBtn onClick={() => setEditItem(null)} bg="#f9fafb" color="#374151" border="2px solid #e5e7eb">Cancel</ActionBtn>
            </div>
          </ModalCard>
        </Modal>
      )}

      {/* Restock Modal */}
      {restockId && (
        <Modal onClose={() => setRestockId(null)}>
          <div style={{ background: "#fff", borderRadius: 20, width: 380, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", padding: "20px 24px" }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>+ Restock Product</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>
                {inventory.find(i => i.id === restockId)?.product}
              </div>
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
              <Field label="Quantity to Add">
                <input type="number" value={restockQty} onChange={e => setRestockQty(e.target.value)}
                  placeholder="e.g. 50" style={inputStyle} autoFocus />
              </Field>
              <div style={{ display: "flex", gap: 10 }}>
                <ActionBtn onClick={handleRestock} bg="linear-gradient(135deg,#15803d,#16a34a)" color="#fff">Restock</ActionBtn>
                <ActionBtn onClick={() => setRestockId(null)} bg="#f9fafb" color="#374151" border="2px solid #e5e7eb">Cancel</ActionBtn>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <Modal onClose={() => setDeleteId(null)}>
          <div style={{
            background: "#fff", borderRadius: 18, padding: "32px 28px",
            width: 360, textAlign: "center", boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ margin: "0 0 8px", color: "#0f172a", fontWeight: 800, fontSize: 18 }}>Delete Product?</h3>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
              <strong>{inventory.find(i => i.id === deleteId)?.product}</strong> will be permanently removed from inventory.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <ActionBtn onClick={() => { setInventory(p => p.filter(i => i.id !== deleteId)); setDeleteId(null); }}
                bg="linear-gradient(135deg,#ef4444,#b91c1c)" color="#fff">Delete</ActionBtn>
              <ActionBtn onClick={() => setDeleteId(null)} bg="#f9fafb" color="#374151" border="2px solid #e5e7eb">Cancel</ActionBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}