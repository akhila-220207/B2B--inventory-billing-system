
import { useState } from "react";
import {
  FaSearch, FaBox, FaPlus, FaEdit, FaTrash,
  FaSave, FaTimes, FaRupeeSign, FaLayerGroup, FaTag
} from "react-icons/fa";

// ── Sample Data ───────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { _id: "1", name: "Rice Bags",       price: 850,  stock: 50,  category: "Grains",       status: "Active" },
  { _id: "2", name: "Oil Bottles",     price: 120,  stock: 8,   category: "Beverages",    status: "Active" },
  { _id: "3", name: "Wheat Flour",     price: 480,  stock: 0,   category: "Grains",       status: "Inactive" },
  { _id: "4", name: "Soap Cartons",    price: 35,   stock: 200, category: "Personal Care", status: "Active" },
  { _id: "5", name: "Spice Packs",     price: 65,   stock: 75,  category: "Spices",       status: "Active" },
  { _id: "6", name: "Milk Packets",    price: 28,   stock: 12,  category: "Dairy",        status: "Active" },
];

const CATEGORIES = ["Grains", "Beverages", "Personal Care", "Dairy", "Spices", "Snacks", "Other"];

const EMPTY_FORM = { name: "", price: "", stock: "", category: "Grains", status: "Active" };

// ── Helpers ───────────────────────────────────────────────────
function getStockBadge(stock) {
  if (stock === 0)  return { label: "Out of Stock", bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" };
  if (stock <= 15)  return { label: "Low Stock",    bg: "#fffbeb", color: "#b45309", border: "#fde68a" };
  return               { label: "In Stock",      bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" };
}

const inputStyle = (focused) => ({
  width: "100%", boxSizing: "border-box",
  padding: "10px 13px", borderRadius: 9,
  border: focused ? "2px solid #3b82f6" : "2px solid #e5e7eb",
  background: focused ? "#fafbff" : "#f9fafb",
  fontSize: 13, color: "#111827", outline: "none",
  transition: "all 0.2s", fontFamily: "inherit",
  boxShadow: focused ? "0 0 0 4px rgba(59,130,246,0.1)" : "none",
});

// ── Inline Field ──────────────────────────────────────────────
function Field({ label, icon: Icon, children }) {
  return (
    <div style={{ flex: 1, minWidth: 140 }}>
      <label style={{
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6,
      }}>
        <Icon size={11} color="#3b82f6" /> {label}
      </label>
      {children}
    </div>
  );
}

// ── FocusInput ────────────────────────────────────────────────
function FInput({ type = "text", placeholder, value, onChange }) {
  const [f, setF] = useState(false);
  return (
    <input
      type={type} placeholder={placeholder} value={value}
      onChange={onChange}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={inputStyle(f)}
    />
  );
}

function FSelect({ value, onChange, options }) {
  const [f, setF] = useState(false);
  return (
    <select value={value} onChange={onChange}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ ...inputStyle(f), appearance: "none", cursor: "pointer" }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts]         = useState(INITIAL_PRODUCTS);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [editingId, setEditingId]       = useState(null);
  const [searchTerm, setSearchTerm]     = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm]         = useState(false);
  const [deleteId, setDeleteId]         = useState(null);
  const [sortBy, setSortBy]             = useState("name");
  const [sortDir, setSortDir]           = useState("asc");
  const [toast, setToast]               = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  // ── Toast ──────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Field helper ──────────────────────────────────────────
  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  // ── CRUD ──────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!form.name.trim() || !form.price || !form.stock) {
      showToast("Please fill all required fields", "error"); return;
    }
    if (Number(form.price) <= 0 || Number(form.stock) < 0) {
      showToast("Price must be > 0 and stock ≥ 0", "error"); return;
    }

    if (editingId) {
      setProducts(prev => prev.map(p => p._id === editingId
        ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) }
        : p));
      showToast("Product updated successfully");
    } else {
      setProducts(prev => [...prev, {
        ...form,
        _id: Date.now().toString(),
        price: Number(form.price),
        stock: Number(form.stock),
      }]);
      showToast("Product added successfully");
    }
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const p = products.find(p => p._id === id);
    setForm({ name: p.name, price: p.price, stock: p.stock, category: p.category, status: p.status });
    setEditingId(id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p._id !== id));
    setDeleteId(null);
    showToast("Product deleted");
  };

  const cancelForm = () => {
    setForm(EMPTY_FORM); setEditingId(null); setShowForm(false);
  };

  // ── Filter + Sort ─────────────────────────────────────────
  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const filtered = products
    .filter(p => {
      const q = searchTerm.toLowerCase();
      return (
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (categoryFilter === "All" || p.category === categoryFilter) &&
        (statusFilter === "All" || p.status === statusFilter)
      );
    })
    .sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy];
      if (sortBy === "price" || sortBy === "stock") { av = Number(av); bv = Number(bv); }
      if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      return (av < bv ? -1 : av > bv ? 1 : 0) * (sortDir === "asc" ? 1 : -1);
    });

  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);
  const SortIcon = ({ col }) => (
    <span style={{ marginLeft: 3, opacity: sortBy === col ? 1 : 0.3, fontSize: 9 }}>
      {sortBy === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 24, zIndex: 999,
          padding: "12px 20px", borderRadius: 12, fontWeight: 700, fontSize: 13,
          background: toast.type === "error" ? "#fef2f2" : "#f0fdf4",
          color: toast.type === "error" ? "#b91c1c" : "#15803d",
          border: `1px solid ${toast.type === "error" ? "#fecaca" : "#bbf7d0"}`,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {toast.type === "error" ? "✕" : "✓"} {toast.msg}
        </div>
      )}

      {/* ── Page Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
            }}><FaBox color="#fff" size={16} /></div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", margin: 0 }}>Product Management</h1>
          </div>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0, paddingLeft: 50 }}>
            Add, edit, and manage your product catalogue
          </p>
        </div>
        <button onClick={() => { setShowForm(!showForm); if (showForm) cancelForm(); }} style={{
          background: showForm ? "#f1f5f9" : "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: showForm ? "#374151" : "#fff",
          border: showForm ? "2px solid #e2e8f0" : "none",
          borderRadius: 11, padding: "11px 20px",
          fontWeight: 700, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8,
          boxShadow: showForm ? "none" : "0 4px 14px rgba(37,99,235,0.35)",
        }}>
          {showForm ? <><FaTimes size={12} /> Cancel</> : <><FaPlus size={12} /> Add Product</>}
        </button>
      </div>

      {/* ── Stat Pills ── */}
      <div style={{ display: "flex", gap: 14 }}>
        {[
          { label: "Total Products",  val: products.length,                                      color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
          { label: "Active",          val: products.filter(p=>p.status==="Active").length,       color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
          { label: "Low / Out",       val: products.filter(p=>p.stock<=15).length,               color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
          { label: "Catalogue Value", val: `₹${totalValue.toLocaleString()}`,                    color: "#7c3aed", bg: "#faf5ff", border: "#ddd6fe" },
        ].map(s => (
          <div key={s.label} style={{
            padding: "14px 18px", borderRadius: 12,
            background: s.bg, border: `1px solid ${s.border}`,
            display: "flex", flexDirection: "column", gap: 3,
          }}>
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>{s.label}</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.val}</span>
          </div>
        ))}
      </div>

      {/* ── Add / Edit Form ── */}
      {showForm && (
        <div style={{
          background: "#fff", borderRadius: 16, overflow: "hidden",
          border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(15,23,42,0.1)",
        }}>
          <div style={{
            background: "linear-gradient(135deg,#0f172a,#1e3a5f)",
            padding: "16px 22px", display: "flex", alignItems: "center", gap: 10,
          }}>
            {editingId ? <FaEdit color="#fff" size={14} /> : <FaPlus color="#fff" size={14} />}
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
              {editingId ? "Edit Product" : "Add New Product"}
            </span>
          </div>
          <div style={{ padding: "22px 24px" }}>
            {/* Row 1 */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              <Field label="Product Name *" icon={FaTag}>
                <FInput placeholder="e.g. Rice Bags" value={form.name} onChange={set("name")} />
              </Field>
              <Field label="Price (₹) *" icon={FaRupeeSign}>
                <FInput type="number" placeholder="e.g. 850" value={form.price} onChange={set("price")} />
              </Field>
              <Field label="Stock Qty *" icon={FaLayerGroup}>
                <FInput type="number" placeholder="e.g. 100" value={form.stock} onChange={set("stock")} />
              </Field>
            </div>
            {/* Row 2 */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Field label="Category" icon={FaBox}>
                <FSelect value={form.category} onChange={set("category")} options={CATEGORIES} />
              </Field>
              <Field label="Status" icon={FaTag}>
                <FSelect value={form.status} onChange={set("status")} options={["Active", "Inactive"]} />
              </Field>
              <div style={{ flex: 1, minWidth: 140, display: "flex", alignItems: "flex-end", gap: 10 }}>
                <button onClick={handleSubmit} style={{
                  flex: 1, padding: "10px 0", borderRadius: 9, border: "none",
                  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  {editingId ? <><FaSave size={12} /> Update</> : <><FaPlus size={12} /> Add Product</>}
                </button>
                <button onClick={cancelForm} style={{
                  padding: "10px 14px", borderRadius: 9, border: "2px solid #e5e7eb",
                  background: "#f9fafb", color: "#64748b", fontWeight: 600,
                  fontSize: 13, cursor: "pointer",
                }}><FaTimes size={12} /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Filters ── */}
      <div style={{
        background: "#fff", borderRadius: 14, padding: "14px 18px",
        display: "flex", gap: 12, alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0",
        flexWrap: "wrap",
      }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <FaSearch style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 13 }} />
          <input
            type="text" placeholder="Search by name or category..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
            style={{ ...inputStyle(searchFocused), paddingLeft: 32, border: "1.5px solid #e2e8f0" }}
          />
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{
          padding: "9px 12px", borderRadius: 9, border: "1.5px solid #e2e8f0",
          background: "#f9fafb", fontSize: 13, color: "#374151", cursor: "pointer",
          outline: "none", fontFamily: "inherit",
        }}>
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "Active", "Inactive"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{
              padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 12,
              background: statusFilter === s ? "#1d4ed8" : "#f1f5f9",
              color: statusFilter === s ? "#fff" : "#64748b",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{
        background: "#fff", borderRadius: 16, overflow: "hidden",
        border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
      }}>
        <div style={{
          background: "linear-gradient(135deg,#0f172a,#1e3a5f)",
          padding: "15px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
            {filtered.length} Product{filtered.length !== 1 ? "s" : ""} Found
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Click headers to sort</div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                {[
                  { label: "#",         col: null },
                  { label: "Product",   col: "name" },
                  { label: "Category",  col: "category" },
                  { label: "Price (₹)", col: "price" },
                  { label: "Stock",     col: "stock" },
                  { label: "Stock Value", col: null },
                  { label: "Status",    col: "status" },
                  { label: "Stock Status", col: null },
                  { label: "Actions",   col: null },
                ].map(h => (
                  <th key={h.label} onClick={() => h.col && toggleSort(h.col)} style={{
                    padding: "12px 14px", textAlign: "left", fontSize: 11,
                    fontWeight: 700, color: "#374151", letterSpacing: 0.4,
                    cursor: h.col ? "pointer" : "default", whiteSpace: "nowrap",
                    userSelect: "none",
                  }}>
                    {h.label}{h.col && <SortIcon col={h.col} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: "center", padding: "48px 0", color: "#94a3b8", fontSize: 14 }}>
                  No products match your search.
                </td></tr>
              ) : filtered.map((p, i) => {
                const sb = getStockBadge(p.stock);
                return (
                  <tr key={p._id} style={{
                    borderBottom: "1px solid #f1f5f9",
                    background: i % 2 === 0 ? "#fff" : "#fafbff",
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbff"}
                  >
                    <td style={{ padding: "13px 14px", color: "#94a3b8", fontSize: 12 }}>{i + 1}</td>
                    <td style={{ padding: "13px 14px", fontWeight: 700, color: "#0f172a", fontSize: 13 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: 8,
                          background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}><FaBox color="#3b82f6" size={12} /></div>
                        {p.name}
                      </div>
                    </td>
                    <td style={{ padding: "13px 14px" }}>
                      <span style={{
                        background: "#eff6ff", color: "#1d4ed8", borderRadius: 6,
                        padding: "3px 9px", fontSize: 11, fontWeight: 600,
                      }}>{p.category}</span>
                    </td>
                    <td style={{ padding: "13px 14px", fontWeight: 700, color: "#0f172a", fontSize: 13 }}>₹{p.price.toLocaleString()}</td>
                    <td style={{
                      padding: "13px 14px", fontWeight: 800, fontSize: 14,
                      color: p.stock === 0 ? "#b91c1c" : p.stock <= 15 ? "#b45309" : "#15803d",
                    }}>{p.stock}</td>
                    <td style={{ padding: "13px 14px", color: "#7c3aed", fontWeight: 700, fontSize: 13 }}>
                      ₹{(p.price * p.stock).toLocaleString()}
                    </td>
                    <td style={{ padding: "13px 14px" }}>
                      <span style={{
                        padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                        background: p.status === "Active" ? "#f0fdf4" : "#f8fafc",
                        color: p.status === "Active" ? "#15803d" : "#64748b",
                        border: `1px solid ${p.status === "Active" ? "#bbf7d0" : "#e2e8f0"}`,
                      }}>{p.status === "Active" ? "● Active" : "○ Inactive"}</span>
                    </td>
                    <td style={{ padding: "13px 14px" }}>
                      <span style={{
                        padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                        background: sb.bg, color: sb.color, border: `1px solid ${sb.border}`,
                      }}>{sb.label}</span>
                    </td>
                    <td style={{ padding: "13px 14px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => handleEdit(p._id)} style={{
                          padding: "6px 11px", borderRadius: 7,
                          border: "1.5px solid #bfdbfe", background: "#eff6ff",
                          color: "#1d4ed8", fontSize: 12, fontWeight: 600, cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 4,
                        }}><FaEdit size={10} /> Edit</button>
                        <button onClick={() => setDeleteId(p._id)} style={{
                          padding: "6px 9px", borderRadius: 7,
                          border: "1.5px solid #fecaca", background: "#fef2f2",
                          color: "#b91c1c", fontSize: 12, fontWeight: 600, cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 4,
                        }}><FaTrash size={9} /></button>
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
          <span style={{ fontSize: 12, color: "#94a3b8" }}>
            Showing {filtered.length} of {products.length} products
          </span>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>
            Visible stock value: <strong style={{ color: "#7c3aed" }}>
              ₹{filtered.reduce((s, p) => s + p.price * p.stock, 0).toLocaleString()}
            </strong>
          </span>
        </div>
      </div>

      {/* ── Delete Modal ── */}
      {deleteId && (
        <div onClick={() => setDeleteId(null)} style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 200, backdropFilter: "blur(4px)",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#fff", borderRadius: 18, padding: "32px 28px",
            width: 360, textAlign: "center", boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ margin: "0 0 8px", color: "#0f172a", fontWeight: 800, fontSize: 18 }}>Delete Product?</h3>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
              <strong>{products.find(p => p._id === deleteId)?.name}</strong> will be permanently removed.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => handleDelete(deleteId)} style={{
                flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
                background: "linear-gradient(135deg,#ef4444,#b91c1c)",
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
    </div>
  );
}