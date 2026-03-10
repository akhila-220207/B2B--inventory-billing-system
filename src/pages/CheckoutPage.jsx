import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { 
  FaArrowLeft, 
  FaTruck, 
  FaCreditCard, 
  FaCheckCircle,
  FaMapMarkerAlt
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [error, setError] = useState("");

  const subtotal = cartTotal;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setError("Please provide a delivery address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item.productId || item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            supplier: item.supplier,
            image: item.image
          })),
          totalAmount: total,
          shippingAddress: address
        })
      });

      if (res.ok) {
        const order = await res.json();
        setOrderSuccess(order);
        clearCart(); // Clear local and server cart
      } else {
        const data = await res.json();
        setError(data.message || "Order failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full border border-green-100 animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-600 text-4xl" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Thank you for your business. Your order <span className="font-bold text-gray-800">#{orderSuccess._id.slice(-8).toUpperCase()}</span> has been placed successfully.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/buyer-dashboard/orders")}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate("/buyer-dashboard/marketplace")}
              className="w-full bg-gray-50 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/buyer-dashboard/cart")}
          className="text-gray-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition mb-6"
        >
          <FaArrowLeft size={12} /> Back to Cart
        </button>

        <h2 className="text-3xl font-black text-gray-900 mb-8">Secure Checkout</h2>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-gray-100">
             <p className="text-gray-500 font-medium">Your cart is empty. Refreshing checkout...</p>
             <button onClick={() => navigate("/buyer-dashboard/marketplace")} className="mt-4 text-blue-600 font-bold underline">Go to Marketplace</button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaTruck className="text-blue-500" /> Shipping Information
                </h3>
                
                <div className="space-y-4">
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Delivery Address</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-300" />
                        <textarea
                          placeholder="Project site or Office address..."
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          rows="4"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2">Standard lead time: 3-5 business days for bulk cargo.</p>
                   </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 opacity-60">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaCreditCard className="text-gray-400" /> Payment Terms
                </h3>
                <div className="p-4 bg-gray-50 rounded-xl">
                   <p className="text-xs font-bold text-gray-500 mb-1">Invoiced on Delivery (Net 30)</p>
                   <p className="text-[10px] text-gray-400">Payment method will be activated once credit line is verified by supplier.</p>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 sticky top-10">
                <h3 className="font-bold text-gray-900 text-lg mb-6">Review Bulk Purchase</h3>
                
                <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-3 thin-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.productId || item._id} className="flex justify-between items-center text-sm">
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-gray-800 truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">Qty: {item.quantity} x ₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                      <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100 mb-8">
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900 font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                   </div>
                   <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Applicable GST (5%)</span>
                      <span className="text-gray-900">+ ₹{gst.toLocaleString("en-IN")}</span>
                   </div>
                   <div className="flex justify-between pt-3 border-t border-gray-50">
                      <span className="text-gray-900 font-black">GRAND TOTAL</span>
                      <span className="text-xl font-black text-blue-600">₹{total.toLocaleString("en-IN")}</span>
                   </div>
                </div>

                {error && (
                   <p className="text-xs text-red-500 font-bold mb-4 flex items-center gap-1">
                      ⚠️ {error}
                   </p>
                )}

                <button
                  onClick={handleConfirmOrder}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-4 rounded-xl font-black text-base shadow-lg shadow-blue-100 transition-all active:scale-95"
                >
                  {loading ? "Processing Order..." : "Place Bulk Order"}
                </button>
                
                <p className="text-[10px] text-gray-400 text-center mt-4">
                  By clicking, you authorize the issuance of a digital purchase order.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        .thin-scrollbar::-webkit-scrollbar { width: 4px; }
        .thin-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .thin-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
}