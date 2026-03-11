import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { FaEnvelope, FaLock } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSuccessRedirect = useCallback((data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    if (data.role === "supplier") navigate("/supplier-dashboard");
    else navigate("/buyer-dashboard");
  }, [navigate]);

  // Must be defined before useGoogleOneTapLogin uses it
  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    setServerError("");
    try {
      const res = await fetch(`${API_URL}/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(
          res.status === 404
            ? "No account found. Please register first."
            : data.message || "Google sign-in failed."
        );
        return;
      }
      handleSuccessRedirect(data);
    } catch {
      setServerError("Google sign-in error. Please try again.");
    }
  }, [handleSuccessRedirect]);

  // One Tap — auto-shows a floating prompt; user taps "Continue as [Name]" = instant sign-in
  useGoogleOneTapLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setServerError("Google One Tap sign-in failed. Try again."),
    cancel_on_tap_outside: false,
    use_fedcm_for_prompt: true,
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message || "Login failed. Try again.");
        setLoading(false);
        return;
      }
      handleSuccessRedirect(data);
    } catch {
      setServerError("Cannot connect to server. Make sure the backend is running.");
      setLoading(false);
    }

    setLoading(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div
  className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
  style={{ backgroundImage: "url('/log.jpg')" }}
>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl text-white font-black text-xl mb-4 shadow-lg">I</div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Welcome back</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Google Sign-In Button */}
        <div className="mb-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setServerError("Google sign-in was unsuccessful. Try again.")}
            theme="outline"
            size="large"
            width="340"
            text="signin_with"
            use_fedcm_for_prompt
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Error */}
        {serverError && (
          <div className="mb-5 px-4 py-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className={`w-full bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-500 font-medium">Forgot password?</a>
            </div>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-200"} text-gray-900 text-sm rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-500">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}