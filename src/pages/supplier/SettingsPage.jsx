//this is settings page
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", icon: "⌂" },
  { label: "Products", icon: "▦" },
  { label: "Inventory", icon: "▤" },
  { label: "Orders", icon: "☰" },
  { label: "Billing", icon: "▣" },
  { label: "Reports", icon: "▧" },
  { label: "Settings", icon: "⚙", active: true },
];

function Sidebar() {
  const userName = localStorage.getItem("userBusiness") || localStorage.getItem("userName") || "Supplier";
  const userInitial = userName.charAt(0).toUpperCase();
  return (
    <aside style={{
      width: 240,
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
      position: "fixed",
      left: 0, top: 0, bottom: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{
        padding: "20px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
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
          fontSize: 11, color: "#fff", cursor: "pointer",
        }}>✦</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV_ITEMS.map(item => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 14px", borderRadius: 10, cursor: "pointer",
            background: item.active ? "linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%)" : "transparent",
            color: item.active ? "#fff" : "rgba(255,255,255,0.55)",
            fontSize: 14, fontWeight: item.active ? 600 : 400,
            transition: "all 0.2s",
            boxShadow: item.active ? "0 4px 12px rgba(37,99,235,0.35)" : "none",
          }}>
            <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      {/* User */}
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
        }}>{userInitial}</div>
        <div>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{userName}</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Supplier Account</div>
        </div>
      </div>
    </aside>
  );
}

function InputField({ label, icon, type = "text", name, value, onChange, placeholder, hint }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: "flex", alignItems: "center", gap: 8,
        fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8,
        letterSpacing: 0.3,
      }}>
        <span style={{
          width: 28, height: 28, borderRadius: 7,
          background: focused ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" : "#eff6ff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, transition: "all 0.2s",
          color: focused ? "#fff" : "#3b82f6",
          boxShadow: focused ? "0 2px 8px rgba(59,130,246,0.35)" : "none",
        }}>{icon}</span>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: "100%", boxSizing: "border-box",
          padding: "11px 14px", borderRadius: 10,
          border: focused ? "2px solid #3b82f6" : "2px solid #e5e7eb",
          background: focused ? "#fafbff" : "#f9fafb",
          fontSize: 14, color: "#111827",
          outline: "none", transition: "all 0.2s",
          boxShadow: focused ? "0 0 0 4px rgba(59,130,246,0.1)" : "none",
          fontFamily: "inherit",
        }}
      />
      {hint && <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 5, paddingLeft: 2 }}>{hint}</p>}
    </div>
  );
}

function SelectField({ label, icon, name, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: "flex", alignItems: "center", gap: 8,
        fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8,
        letterSpacing: 0.3,
      }}>
        <span style={{
          width: 28, height: 28, borderRadius: 7,
          background: focused ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" : "#eff6ff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, transition: "all 0.2s",
          color: focused ? "#fff" : "#3b82f6",
        }}>{icon}</span>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "11px 14px", borderRadius: 10,
          border: focused ? "2px solid #3b82f6" : "2px solid #e5e7eb",
          background: focused ? "#fafbff" : "#f9fafb",
          fontSize: 14, color: "#111827",
          outline: "none", transition: "all 0.2s",
          cursor: "pointer", fontFamily: "inherit",
          boxShadow: focused ? "0 0 0 4px rgba(59,130,246,0.1)" : "none",
          appearance: "none",
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export default function SettingsPage() {
  const [formData, setFormData] = useState(() => ({
    business: localStorage.getItem("userBusiness") || "ABC Traders",
    email: localStorage.getItem("userEmail") || "supplier@example.com",
    phone: localStorage.getItem("userPhone") || "+91 98765 43210",
    gst: localStorage.getItem("userGst") || "22AAAAA0000A1Z5",
    pan: localStorage.getItem("userPan") || "AAAAA0000A",
    businessType: localStorage.getItem("userBusinessType") || "retail",
    address: localStorage.getItem("userAddress") || "123, MG Road, Guntur, Andhra Pradesh",
    pincode: localStorage.getItem("userPincode") || "522001",
    website: localStorage.getItem("userWebsite") || "www.abctraders.com",
    password: "",
    confirmPassword: "",
  }));

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("business");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Persist all fields to localStorage
    localStorage.setItem("userBusiness", formData.business);
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userPhone", formData.phone);
    localStorage.setItem("userGst", formData.gst);
    localStorage.setItem("userPan", formData.pan);
    localStorage.setItem("userBusinessType", formData.businessType);
    localStorage.setItem("userAddress", formData.address);
    localStorage.setItem("userPincode", formData.pincode);
    localStorage.setItem("userWebsite", formData.website);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "business", label: "Business Info", icon: "▦" },
    { id: "contact", label: "Contact & Address", icon: "✉" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Sidebar />

      {/* Main */}
      <main style={{
        marginLeft: 240, flex: 1,
        background: "#f1f5f9",
        minHeight: "100vh", padding: "36px 40px",
      }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: "#fff",
              boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
            }}>⚙</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Supplier Settings
            </h1>
          </div>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0, paddingLeft: 50 }}>
            Manage your business profile, contact info, and account security
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "#e2e8f0", padding: 4, borderRadius: 12, width: "fit-content" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer",
              background: activeTab === tab.id ? "#fff" : "transparent",
              color: activeTab === tab.id ? "#1d4ed8" : "#64748b",
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: 13, transition: "all 0.2s",
              boxShadow: activeTab === tab.id ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 18,
          boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
          border: "1px solid #e2e8f0",
          maxWidth: 680, overflow: "hidden",
        }}>
          {/* Card Header */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            padding: "20px 28px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, border: "1px solid rgba(255,255,255,0.2)",
            }}>
              {tabs.find(t => t.id === activeTab)?.icon}
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
                {tabs.find(t => t.id === activeTab)?.label}
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                {activeTab === "business" && "Update your business identity and tax details"}
                {activeTab === "contact" && "Keep your contact information up to date"}
                {activeTab === "security" && "Secure your supplier account"}
              </div>
            </div>
          </div>

          <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Business Tab */}
            {activeTab === "business" && <>
              <InputField label="Business Name" icon="▦" name="business" value={formData.business} onChange={handleChange} />
              <SelectField
                label="Business Type" icon="◈" name="businessType" value={formData.businessType} onChange={handleChange}
                options={[
                  { value: "retail", label: "Retail" },
                  { value: "wholesale", label: "Wholesale" },
                  { value: "manufacturer", label: "Manufacturer" },
                  { value: "distributor", label: "Distributor" },
                  { value: "service", label: "Service Provider" },
                ]}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <InputField label="GST Number" icon="▤" name="gst" value={formData.gst} onChange={handleChange} hint="Format: 22AAAAA0000A1Z5" />
                <InputField label="PAN Number" icon="▣" name="pan" value={formData.pan} onChange={handleChange} hint="10-character alphanumeric" />
              </div>
              <InputField label="Business Website" icon="⊕" name="website" value={formData.website} onChange={handleChange} placeholder="www.example.com" />
            </>}

            {/* Contact Tab */}
            {activeTab === "contact" && <>
              <InputField label="Contact Email" icon="✉" type="email" name="email" value={formData.email} onChange={handleChange} />
              <InputField label="Phone Number" icon="☎" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
              <InputField label="Business Address" icon="⌖" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City, State" />
              <InputField label="PIN Code" icon="◎" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="6-digit PIN" hint="Enter your area's postal code" />
            </>}

            {/* Security Tab */}
            {activeTab === "security" && <>
              <div style={{
                padding: "14px 16px", borderRadius: 10,
                background: "#eff6ff", border: "1px solid #bfdbfe",
                display: "flex", alignItems: "flex-start", gap: 10,
              }}>
                <span style={{ fontSize: 18, color: "#3b82f6" }}>ℹ</span>
                <div style={{ fontSize: 13, color: "#1e40af", lineHeight: 1.6 }}>
                  <strong>Password tips:</strong> Use 8+ characters with a mix of uppercase, lowercase, numbers, and symbols for a strong password.
                </div>
              </div>
              <InputField label="New Password" icon="🔒" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter new password" />
              <InputField label="Confirm Password" icon="🔑" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter new password" />
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div style={{ color: "#ef4444", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                  ⚠ Passwords do not match
                </div>
              )}
            </>}

            {/* Divider */}
            <div style={{ height: 1, background: "#f1f5f9", margin: "4px 0" }} />

            {/* Footer */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={handleSubmit} style={{
                flex: 1, padding: "13px 0", borderRadius: 12, border: "none",
                background: saved
                  ? "linear-gradient(135deg, #16a34a, #15803d)"
                  : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#fff", fontWeight: 700, fontSize: 15,
                cursor: "pointer", transition: "all 0.3s",
                boxShadow: saved ? "0 4px 16px rgba(22,163,74,0.35)" : "0 4px 16px rgba(37,99,235,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                {saved ? "✓ Changes Saved!" : "💾 Save Changes"}
              </button>
              <button onClick={() => setFormData({
                business: localStorage.getItem("userBusiness") || "ABC Traders",
                email: localStorage.getItem("userEmail") || "supplier@example.com",
                phone: localStorage.getItem("userPhone") || "+91 98765 43210",
                gst: localStorage.getItem("userGst") || "22AAAAA0000A1Z5",
                pan: localStorage.getItem("userPan") || "AAAAA0000A",
                businessType: localStorage.getItem("userBusinessType") || "retail",
                address: localStorage.getItem("userAddress") || "123, MG Road, Guntur, Andhra Pradesh",
                pincode: localStorage.getItem("userPincode") || "522001",
                website: localStorage.getItem("userWebsite") || "www.abctraders.com",
                password: "", confirmPassword: "",
              })} style={{
                padding: "13px 18px", borderRadius: 12, border: "2px solid #e5e7eb",
                background: "#f9fafb", color: "#64748b", fontWeight: 600,
                fontSize: 14, cursor: "pointer", transition: "all 0.2s",
              }}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div style={{ display: "flex", gap: 16, marginTop: 24, maxWidth: 680 }}>
          {[
            { icon: "✦", label: "Account Status", value: "Verified Supplier", color: "#16a34a", bg: "#f0fdf4" },
            { icon: "▦", label: "Products Listed", value: "142 Active", color: "#2563eb", bg: "#eff6ff" },
            { icon: "☰", label: "Pending Orders", value: "8 Orders", color: "#d97706", bg: "#fffbeb" },
          ].map(card => (
            <div key={card.label} style={{
              flex: 1, padding: "14px 16px", borderRadius: 12,
              background: card.bg, border: `1px solid ${card.color}22`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: card.color + "22",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: card.color, fontSize: 16,
              }}>{card.icon}</div>
              <div>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>{card.label}</div>
                <div style={{ fontSize: 14, color: card.color, fontWeight: 700 }}>{card.value}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}