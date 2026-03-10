import { useState } from "react";
import { FaUser, FaBuilding, FaLock, FaBell, FaShieldAlt, FaSave } from "react-icons/fa";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    business: "XYZ Store",
    taxId: "GST-9922-881",
    address: "123 Business Park, Mumbai",
    currentPassword: "",
    newPassword: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Account Settings</h2>
          <p className="text-slate-500 text-sm font-medium">Manage your profile and business information.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <FaUser />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Your Profile</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Personal Information</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Business Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <FaBuilding />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Business Details</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Company Information</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Company Name</label>
                  <input
                    type="text"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Tax ID / GST Number</label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Business Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Security & System Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <FaShieldAlt />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Security & Notifications</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Safety and Updates</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                       <FaBell className="text-indigo-400" />
                       <span className="text-sm font-bold text-slate-700">Email Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="notifications"
                        checked={formData.notifications}
                        onChange={handleChange}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                 </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 pb-12">
            <button
              type="submit"
              className="flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              <FaSave size={16} /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}