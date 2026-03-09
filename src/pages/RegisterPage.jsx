import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    business: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.business.trim())
      newErrors.business = "Business name is required";

    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.phone)
      newErrors.phone = "Phone is required";
    else if (!/^\+?\d{10,}$/.test(formData.phone.replace(/\s/g, "")))
      newErrors.phone = "Phone must be at least 10 digits";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.role)
      newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      localStorage.setItem("role", formData.role);
      localStorage.setItem("token", "mock-token");

      window.location.href =
        formData.role === "supplier"
          ? "/supplier-dashboard"
          : "/buyer-dashboard";
    }, 1000);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRoleSelect = (role) =>
    setFormData({ ...formData, role });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Animated Dark Outline */}
      <div className="dark-outline p-[2px] rounded-xl">

        {/* Register Card */}
        <div className="bg-white w-full max-w-lg p-10 rounded-xl shadow-xl">

          <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
            Create Business Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="business"
              value={formData.business}
              onChange={handleChange}
              placeholder="Business Name"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-gray-400"
            />
            {errors.business && (
              <p className="text-red-500 text-sm">{errors.business}</p>
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-gray-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-gray-400"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-gray-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            {/* Role Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelect("buyer")}
                className={`px-4 py-2 border rounded-md ${
                  formData.role === "buyer"
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Buyer
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("supplier")}
                className={`px-4 py-2 border rounded-md ${
                  formData.role === "supplier"
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Supplier
              </button>
            </div>

            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

      {/* Dark Outline Animation */}
      <style>{`
        .dark-outline {
          background: linear-gradient(270deg,#111,#444,#111);
          background-size: 400% 400%;
          animation: outlineMove 5s ease infinite;
        }

        @keyframes outlineMove {
          0% { background-position:0% 50%;}
          50% { background-position:100% 50%;}
          100% { background-position:0% 50%;}
        }
      `}</style>

    </div>
  );
}