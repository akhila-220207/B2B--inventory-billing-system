// import { useState } from "react";
// import { FaUser, FaBuilding, FaLock, FaBell, FaShieldAlt, FaSave } from "react-icons/fa";

// export default function SettingsPage() {
//   const [formData, setFormData] = useState({
//     name: "John Doe",
//     email: "john@example.com",
//     business: "XYZ Store",
//     taxId: "GST-9922-881",
//     address: "123 Business Park, Mumbai",
//     currentPassword: "",
//     newPassword: "",
//     notifications: true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Settings saved successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans animate-in fade-in duration-700">
//       <div className="max-w-4xl mx-auto">
//         <header className="mb-10">
//           <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Account Settings</h2>
//           <p className="text-slate-500 text-sm font-medium">Manage your profile and business information.</p>
//         </header>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Profile Section */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
//                 <FaUser />
//               </div>
//               <div>
//                 <h3 className="text-lg font-black text-slate-900">Your Profile</h3>
//                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Personal Information</p>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Business Section */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
//                 <FaBuilding />
//               </div>
//               <div>
//                 <h3 className="text-lg font-black text-slate-900">Business Details</h3>
//                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Company Information</p>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Company Name</label>
//                   <input
//                     type="text"
//                     name="business"
//                     value={formData.business}
//                     onChange={handleChange}
//                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 transition-all"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Tax ID / GST Number</label>
//                   <input
//                     type="text"
//                     name="taxId"
//                     value={formData.taxId}
//                     onChange={handleChange}
//                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 transition-all"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Business Address</label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   rows="2"
//                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 transition-all resize-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Security & System Section */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
//                 <FaShieldAlt />
//               </div>
//               <div>
//                 <h3 className="text-lg font-black text-slate-900">Security & Notifications</h3>
//                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Safety and Updates</p>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-12">
//               <div className="space-y-4">
//                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
//                     <div className="flex items-center gap-3">
//                        <FaBell className="text-indigo-400" />
//                        <span className="text-sm font-bold text-slate-700">Email Notifications</span>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         name="notifications"
//                         checked={formData.notifications}
//                         onChange={handleChange}
//                         className="sr-only peer" 
//                       />
//                       <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                  </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">New Password</label>
//                   <input
//                     type="password"
//                     name="newPassword"
//                     value={formData.newPassword}
//                     onChange={handleChange}
//                     placeholder="Leave blank to keep current"
//                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 transition-all"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Button */}
//           <div className="flex justify-end pt-4 pb-12">
//             <button
//               type="submit"
//               className="flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
//             >
//               <FaSave size={16} /> Save Settings
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import {
  FaUser, FaBuilding, FaLock, FaBell, FaShieldAlt, FaSave,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaIdCard,
  FaUndo, FaCheckCircle, FaExclamationTriangle, FaBriefcase
} from "react-icons/fa";

// ── Focused Input ─────────────────────────────────────────────
function FInput({ type = "text", name, value, onChange, placeholder, disabled }) {
  const [f, setF] = useState(false);
  return (
    <input
      type={type} name={name} value={value} onChange={onChange}
      placeholder={placeholder} disabled={disabled}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "11px 14px", borderRadius: 10,
        border: f ? "2px solid #3b82f6" : "2px solid #e5e7eb",
        background: disabled ? "#f1f5f9" : f ? "#fafbff" : "#f9fafb",
        fontSize: 13, color: disabled ? "#94a3b8" : "#111827",
        outline: "none", transition: "all 0.2s", fontFamily: "inherit",
        boxShadow: f ? "0 0 0 4px rgba(59,130,246,0.1)" : "none",
        cursor: disabled ? "not-allowed" : "text",
      }}
    />
  );
}

function FTextarea({ name, value, onChange, rows = 2 }) {
  const [f, setF] = useState(false);
  return (
    <textarea
      name={name} value={value} onChange={onChange} rows={rows}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "11px 14px", borderRadius: 10,
        border: f ? "2px solid #3b82f6" : "2px solid #e5e7eb",
        background: f ? "#fafbff" : "#f9fafb",
        fontSize: 13, color: "#111827", outline: "none",
        transition: "all 0.2s", fontFamily: "inherit",
        boxShadow: f ? "0 0 0 4px rgba(59,130,246,0.1)" : "none",
        resize: "none",
      }}
    />
  );
}

function FSelect({ name, value, onChange, options }) {
  const [f, setF] = useState(false);
  return (
    <select name={name} value={value} onChange={onChange}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "11px 14px", borderRadius: 10,
        border: f ? "2px solid #3b82f6" : "2px solid #e5e7eb",
        background: f ? "#fafbff" : "#f9fafb",
        fontSize: 13, color: "#111827", outline: "none",
        transition: "all 0.2s", fontFamily: "inherit", appearance: "none",
        boxShadow: f ? "0 0 0 4px rgba(59,130,246,0.1)" : "none",
        cursor: "pointer",
      }}
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

// ── Section Card ──────────────────────────────────────────────
function SectionCard({ icon: Icon, iconColor, iconBg, title, subtitle, children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, overflow: "hidden",
      border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
        padding: "16px 22px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon color={iconColor} size={15} />
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{title}</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase" }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ padding: "24px" }}>{children}</div>
    </div>
  );
}

// ── Field Label ───────────────────────────────────────────────
function Label({ icon: Icon, text }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: 6,
      fontSize: 11, fontWeight: 700, color: "#374151",
      textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 7,
    }}>
      {Icon && <Icon size={10} color="#3b82f6" />} {text}
    </label>
  );
}

// ── Toggle Switch ─────────────────────────────────────────────
function Toggle({ checked, onChange, name }) {
  return (
    <label style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
      <input type="checkbox" name={name} checked={checked} onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <div style={{
        width: 44, height: 24, borderRadius: 99,
        background: checked ? "#2563eb" : "#e2e8f0",
        transition: "background 0.2s", position: "relative",
        boxShadow: checked ? "0 2px 8px rgba(37,99,235,0.4)" : "none",
      }}>
        <div style={{
          position: "absolute", top: 3, left: checked ? 23 : 3,
          width: 18, height: 18, borderRadius: "50%", background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)", transition: "left 0.2s",
        }} />
      </div>
    </label>
  );
}

// ── Grid ──────────────────────────────────────────────────────
function Grid({ cols = 2, children, gap = 16 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
      {children}
    </div>
  );
}

// ── TABS ──────────────────────────────────────────────────────
const TABS = [
  { id: "profile",       label: "Profile",           icon: FaUser },
  { id: "business",      label: "Business Details",  icon: FaBuilding },
  { id: "security",      label: "Security",          icon: FaShieldAlt },
  { id: "notifications", label: "Notifications",     icon: FaBell },
];

const DEFAULTS = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 98765 43210",
  website: "www.xyzstore.com",
  business: "XYZ Store",
  taxId: "GST-9922-881",
  pan: "AAAAA0000A",
  businessType: "Wholesale",
  address: "123 Business Park, Mumbai, Maharashtra",
  pincode: "400001",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  notifications: true,
  orderAlerts: true,
  stockAlerts: true,
  billingAlerts: false,
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData]   = useState(DEFAULTS);
  const [saved, setSaved]         = useState(false);
  const [pwError, setPwError]     = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setSaved(false);
    if (name === "confirmPassword" || name === "newPassword") setPwError("");
  };

  const handleSave = () => {
    if (activeTab === "security") {
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        setPwError("Passwords do not match"); return;
      }
      if (formData.newPassword && formData.newPassword.length < 8) {
        setPwError("Password must be at least 8 characters"); return;
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => { setFormData(DEFAULTS); setSaved(false); setPwError(""); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Page Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
            }}><FaShieldAlt color="#fff" size={16} /></div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", margin: 0 }}>Account Settings</h1>
          </div>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0, paddingLeft: 50 }}>
            Manage your profile, business info, security and notifications
          </p>
        </div>
        <div style={{
          padding: "8px 14px", borderRadius: 10,
          background: "#f0fdf4", border: "1px solid #bbf7d0",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <FaCheckCircle size={11} color="#15803d" />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>Verified Account</span>
        </div>
      </div>

      {/* ── Profile Summary Banner ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)",
        borderRadius: 16, padding: "24px 28px",
        display: "flex", alignItems: "center", gap: 20,
        boxShadow: "0 8px 32px rgba(15,23,42,0.2)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", right: 60, bottom: -50, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, fontWeight: 900, color: "#fff",
          boxShadow: "0 4px 16px rgba(99,102,241,0.4)", flexShrink: 0,
        }}>
          {formData.name.charAt(0).toUpperCase()}
        </div>

        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>{formData.name}</div>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginTop: 2 }}>{formData.email}</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
            {formData.business} · {formData.businessType}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, position: "relative" }}>
          {[{ label: "Products", value: "24" }, { label: "Orders", value: "156" }].map(s => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12, padding: "12px 20px", textAlign: "center",
            }}>
              <div style={{ color: "#fff", fontSize: 20, fontWeight: 900 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div style={{
        background: "#fff", borderRadius: 14, padding: 6,
        display: "flex", gap: 4, border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: "10px 14px", borderRadius: 10, border: "none",
              cursor: "pointer", transition: "all 0.2s",
              background: active ? "linear-gradient(135deg,#1d4ed8,#2563eb)" : "transparent",
              color: active ? "#fff" : "#64748b",
              fontWeight: active ? 700 : 500, fontSize: 13,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              boxShadow: active ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
            }}>
              <Icon size={12} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Profile Tab ── */}
      {activeTab === "profile" && (
        <SectionCard icon={FaUser} iconColor="#3b82f6" iconBg="rgba(59,130,246,0.15)"
          title="Your Profile" subtitle="Personal Information">
          <Grid cols={2} gap={18}>
            <div>
              <Label icon={FaUser} text="Full Name" />
              <FInput name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <Label icon={FaEnvelope} text="Email Address" />
              <FInput type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <Label icon={FaPhone} text="Phone Number" />
              <FInput name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <Label icon={FaGlobe} text="Website" />
              <FInput name="website" value={formData.website} onChange={handleChange} placeholder="www.example.com" />
            </div>
          </Grid>
        </SectionCard>
      )}

      {/* ── Business Tab ── */}
      {activeTab === "business" && (
        <SectionCard icon={FaBuilding} iconColor="#10b981" iconBg="rgba(16,185,129,0.15)"
          title="Business Details" subtitle="Company Information">
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Grid cols={2} gap={18}>
              <div>
                <Label icon={FaBuilding} text="Company Name" />
                <FInput name="business" value={formData.business} onChange={handleChange} />
              </div>
              <div>
                <Label icon={FaBriefcase} text="Business Type" />
                <FSelect name="businessType" value={formData.businessType} onChange={handleChange}
                  options={["Retail", "Wholesale", "Manufacturer", "Distributor", "Service Provider"]} />
              </div>
              <div>
                <Label icon={FaIdCard} text="GST Number" />
                <FInput name="taxId" value={formData.taxId} onChange={handleChange} />
              </div>
              <div>
                <Label icon={FaIdCard} text="PAN Number" />
                <FInput name="pan" value={formData.pan} onChange={handleChange} />
              </div>
            </Grid>
            <div>
              <Label icon={FaMapMarkerAlt} text="Business Address" />
              <FTextarea name="address" value={formData.address} onChange={handleChange} />
            </div>
            <Grid cols={2} gap={18}>
              <div>
                <Label icon={FaMapMarkerAlt} text="PIN Code" />
                <FInput name="pincode" value={formData.pincode} onChange={handleChange} placeholder="6-digit PIN" />
              </div>
              <div>
                <Label icon={FaGlobe} text="Website" />
                <FInput name="website" value={formData.website} onChange={handleChange} placeholder="www.example.com" />
              </div>
            </Grid>
          </div>
        </SectionCard>
      )}

      {/* ── Security Tab ── */}
      {activeTab === "security" && (
        <SectionCard icon={FaLock} iconColor="#6366f1" iconBg="rgba(99,102,241,0.15)"
          title="Security" subtitle="Password & Account Safety">
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{
              padding: "12px 16px", borderRadius: 10,
              background: "#eff6ff", border: "1px solid #bfdbfe",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <FaShieldAlt color="#3b82f6" size={14} />
              <span style={{ fontSize: 13, color: "#1e40af", fontWeight: 500 }}>
                Use 8+ characters with uppercase, lowercase, numbers and symbols for a strong password.
              </span>
            </div>
            <Grid cols={2} gap={18}>
              <div>
                <Label icon={FaLock} text="Current Password" />
                <FInput type="password" name="currentPassword" value={formData.currentPassword}
                  onChange={handleChange} placeholder="Enter current password" />
              </div>
              <div />
              <div>
                <Label icon={FaLock} text="New Password" />
                <FInput type="password" name="newPassword" value={formData.newPassword}
                  onChange={handleChange} placeholder="Enter new password" />
              </div>
              <div>
                <Label icon={FaLock} text="Confirm New Password" />
                <FInput type="password" name="confirmPassword" value={formData.confirmPassword}
                  onChange={handleChange} placeholder="Re-enter new password" />
              </div>
            </Grid>
            {pwError && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#b91c1c", fontSize: 13, fontWeight: 600 }}>
                <FaExclamationTriangle size={12} /> {pwError}
              </div>
            )}
            {formData.newPassword && (
              <div>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginBottom: 6 }}>Password Strength</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 2, 3, 4].map(i => {
                    const s = Math.min(4, Math.floor(formData.newPassword.length / 3));
                    return (
                      <div key={i} style={{
                        flex: 1, height: 5, borderRadius: 99, transition: "background 0.3s",
                        background: i <= s ? (s <= 1 ? "#ef4444" : s === 2 ? "#f97316" : s === 3 ? "#eab308" : "#22c55e") : "#e2e8f0",
                      }} />
                    );
                  })}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                  {formData.newPassword.length < 4 ? "Too weak" : formData.newPassword.length < 7 ? "Weak" : formData.newPassword.length < 10 ? "Fair" : "Strong"}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {/* ── Notifications Tab ── */}
      {activeTab === "notifications" && (
        <SectionCard icon={FaBell} iconColor="#f59e0b" iconBg="rgba(245,158,11,0.15)"
          title="Notifications" subtitle="Alerts & Updates">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { key: "notifications", label: "Email Notifications",  sub: "Receive general updates by email",        icon: FaEnvelope },
              { key: "orderAlerts",   label: "Order Alerts",         sub: "Get notified for new and updated orders", icon: FaShieldAlt },
              { key: "stockAlerts",   label: "Low Stock Alerts",     sub: "Alert when products are running low",     icon: FaExclamationTriangle },
              { key: "billingAlerts", label: "Billing Notifications",sub: "Receive invoices and payment reminders",  icon: FaIdCard },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.key} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px", borderRadius: 12, transition: "all 0.2s",
                  background: formData[item.key] ? "#eff6ff" : "#f8fafc",
                  border: `1px solid ${formData[item.key] ? "#bfdbfe" : "#e2e8f0"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: formData[item.key] ? "#dbeafe" : "#f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={13} color={formData[item.key] ? "#2563eb" : "#94a3b8"} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{item.sub}</div>
                    </div>
                  </div>
                  <Toggle name={item.key} checked={formData[item.key]} onChange={handleChange} />
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* ── Action Buttons ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingBottom: 16 }}>
        <button onClick={handleReset} style={{
          padding: "12px 22px", borderRadius: 11,
          border: "2px solid #e5e7eb", background: "#f9fafb",
          color: "#374151", fontWeight: 700, fontSize: 13,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
        }}>
          <FaUndo size={11} /> Reset
        </button>
        <button onClick={handleSave} style={{
          padding: "12px 28px", borderRadius: 11, border: "none",
          background: saved ? "linear-gradient(135deg,#16a34a,#15803d)" : "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 7, transition: "all 0.3s",
          boxShadow: saved ? "0 4px 14px rgba(22,163,74,0.35)" : "0 4px 14px rgba(37,99,235,0.35)",
        }}>
          {saved ? <><FaCheckCircle size={12} /> Saved!</> : <><FaSave size={12} /> Save Settings</>}
        </button>
      </div>
    </div>
  );
}