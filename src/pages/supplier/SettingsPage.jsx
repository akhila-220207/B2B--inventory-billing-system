import { useState } from "react";
import { FaBuilding, FaEnvelope, FaLock, FaFileInvoice } from "react-icons/fa";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    business: "ABC Traders",
    email: "supplier@example.com",
    gst: "22AAAAA0000A1Z5",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <div className="p-6 min-h-screen bg-[#f8fafc]">

      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        ⚙ Supplier Settings
      </h2>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto space-y-6 border border-gray-200"
      >

        {/* Business Name */}
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-2">
            <FaBuilding className="mr-2 text-blue-600" /> Business Name
          </label>
          <input
            type="text"
            name="business"
            value={formData.business}
            onChange={handleChange}
            className="w-full border-2 border-blue-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-2">
            <FaEnvelope className="mr-2 text-blue-600" /> Contact Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 border-blue-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* GST Number */}
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-2">
            <FaFileInvoice className="mr-2 text-blue-600" /> GST Number
          </label>
          <input
            type="text"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            className="w-full border-2 border-blue-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Password */}
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-2">
            <FaLock className="mr-2 text-blue-600" /> Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full border-2 border-blue-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition transform font-bold text-lg"
        >
          💾 Save Changes
        </button>

      </form>
    </div>
  );
}