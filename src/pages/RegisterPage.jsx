

import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  FaBuilding, FaEnvelope, FaPhoneAlt, FaLock,
  FaShoppingBag, FaWarehouse, FaIdCard, FaTag, FaIndustry
} from "react-icons/fa";
import AddressSection from "../components/AddressSection";

const API_URL = "http://127.0.0.1:5000/api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    business: "", email: "", phone: "", password: "", role: "buyer",
    businessType: "Wholesaler", productCategory: "", 
    gstNumber: "", panNumber: "", address: "", pincode: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSuccessRedirect = useCallback((data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    if (data.name) localStorage.setItem("userName", data.name);
    if (data.business) localStorage.setItem("userBusiness", data.business);
    if (data.email) localStorage.setItem("userEmail", data.email);
    if (data.phone) localStorage.setItem("userPhone", data.phone);
    if (data.role === "supplier") navigate("/supplier-dashboard");
    else navigate("/buyer-dashboard");
  }, [navigate]);

  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    setServerError("");
    setLoading(true);
    try {
      const token = credentialResponse.credential;
      // First, check if user exists
      const res = await fetch(`${API_URL}/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, role: formData.role }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 404 && data.isNewUser) {
          // For suppliers, we MUST have the extra fields. 
          // If they haven't filled them yet, we should show an error or prevent auto-complete.
          if (formData.role === "supplier" && (!formData.gstNumber || !formData.panNumber || !formData.address)) {
            setServerError("Please enter your business details (GST, PAN, Address) before signing up with Google.");
            setLoading(false);
            return;
          }

          const completeRes = await fetch(`${API_URL}/google/complete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              token, 
              role: formData.role, 
              business: formData.business || data.name || "Business Account",
              businessType: formData.businessType,
              productCategory: formData.productCategory,
              gstNumber: formData.gstNumber,
              panNumber: formData.panNumber,
              address: formData.address,
              pincode: formData.pincode
            }),
          });
          const completeData = await completeRes.json();
          if (!completeRes.ok) {
            setServerError(completeData.message || "Registration failed.");
            setLoading(false);
            return;
          }
          handleSuccessRedirect(completeData);
        } else {
          setServerError(data.message || "Google authentication failed.");
          setLoading(false);
        }
        return;
      }
      handleSuccessRedirect(data);
    } catch {
      setServerError("Google auth error. Please try again.");
      setLoading(false);
    }
  }, [handleSuccessRedirect, formData]);

  // Note: useGoogleOneTapLogin removed — it conflicts with the GoogleLogin button.

  const validate = () => {
    const newErrors = {};
    if (!formData.business.trim()) newErrors.business = "Business name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\+?\d{10,}$/.test(formData.phone.replace(/\s/g, ""))) newErrors.phone = "Enter a valid phone number";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";
    
    if (formData.role === "supplier") {
      if (!formData.productCategory.trim()) newErrors.productCategory = "Product category is required";
      if (!formData.gstNumber) newErrors.gstNumber = "GST number is required";
      else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) newErrors.gstNumber = "Invalid GST format";
      
      if (!formData.panNumber) newErrors.panNumber = "PAN number is required";
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) newErrors.panNumber = "Invalid PAN format";
      
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
      else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) newErrors.pincode = "Invalid pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) { 
        setServerError(data.details || data.message || "Registration failed."); 
        setLoading(false); 
        return; 
      }
      handleSuccessRedirect(data);
    } catch {
      setServerError("Cannot connect to server. Make sure the backend is running.");
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleAddressChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputBase = "w-full bg-white/5 border text-white placeholder-slate-600 text-sm rounded-xl py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/7";

  return (
   <div
  className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
  style={{ backgroundImage: "url('/log.jpg')" }}
>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 my-8">
        
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl text-white font-black text-xl mb-4 shadow-lg">I</div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join InventaB2B today</p>
        </div>

        {/* Error MESSAGE */}
        {serverError && (
          <div className="mb-5 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
            {serverError}
          </div>
        )}

        {/* ROLE SELECTION */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 text-center">I want to</label>
          <div className="flex gap-4">
            <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${formData.role === "buyer" ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              <input type="radio" name="role" value="buyer" checked={formData.role === "buyer"} onChange={handleChange} className="sr-only" />
              <FaShoppingBag />
              <span className="font-semibold text-sm">Buy</span>
            </label>
            <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${formData.role === "supplier" ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              <input type="radio" name="role" value="supplier" checked={formData.role === "supplier"} onChange={handleChange} className="sr-only" />
              <FaWarehouse />
              <span className="font-semibold text-sm">Sell</span>
            </label>
          </div>
        </div>

        {/* Google Sign-Up Button */}
        <div className="mb-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setServerError("Google authentication failed.")}
            theme="outline"
            size="large"
            width="340"
            text="signup_with"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Standard Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <div className="relative">
              <FaBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text" name="business" value={formData.business} onChange={handleChange}
                placeholder="Company Name"
                className={`w-full bg-gray-50 border ${errors.business ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
              />
            </div>
            {errors.business && <p className="text-red-500 text-xs mt-1">{errors.business}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="relative">
              <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange}
                placeholder="9876543210"
                className={`w-full bg-gray-50 border ${errors.phone ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="name@company.com"
                className={`w-full bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"} name="password"
                value={formData.password} onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold"
              >{showPassword ? "HIDE" : "SHOW"}</button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Supplier Specific Fields */}
          {formData.role === "supplier" && (
            <div className="space-y-4 pt-4 border-t border-gray-100 mt-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Business Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Retailer">Retailer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="relative">
                    <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text" name="productCategory" value={formData.productCategory} onChange={handleChange}
                      placeholder="e.g. Electronics"
                      className={`w-full bg-gray-50 border ${errors.productCategory ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  {errors.productCategory && <p className="text-red-500 text-xs mt-1">{errors.productCategory}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                <div className="relative">
                  <FaIdCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange}
                    placeholder="22AAAAA0000A1Z5"
                    className={`w-full bg-gray-50 border ${errors.gstNumber ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                {errors.gstNumber && <p className="text-red-500 text-xs mt-1">{errors.gstNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                <div className="relative">
                  <FaIdCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text" name="panNumber" value={formData.panNumber} onChange={handleChange}
                    placeholder="ABCDE1234F"
                    className={`w-full bg-gray-50 border ${errors.panNumber ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>}
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pt-2">Business Address</h3>
                <AddressSection 
                  address={formData.address} 
                  pincode={formData.pincode} 
                  onChange={handleAddressChange}
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode}</p>}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
