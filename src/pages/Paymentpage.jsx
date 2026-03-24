import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaShieldAlt, FaLock } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const API_BASE = "http://127.0.0.1:5000/api";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const orderData = location.state;
  const amount = orderData?.totalAmount || 0;
  const whatsappNumber = orderData?.whatsappNumber || "";

  const [method, setMethod] = useState("card");
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  useEffect(() => {
    // If no order data, redirect back to cart after a short delay
    if (!orderData) {
      const timer = setTimeout(() => {
        navigate("/buyer-dashboard/cart");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [orderData, navigate]);

  const handlePayment = async () => {
    if (!orderData) {
      alert("No order data found");
      return;
    }

    let paymentStatus = "Paid";

    if (method === "cod") {
      paymentStatus = "Pending";
      alert("📦 Order placed with Cash on Delivery");
    } else if (method === "upi") {
      alert("📱 UPI Payment Successful");
    } else if (method === "card") {
      alert("💳 Card Payment Successful");
    } else {
      alert("🏦 Net Banking Successful");
    }

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ...orderData,
          paymentMethod: method,
          paymentStatus
        })
      });
      if (res.ok) {
        const orderResponseData = await res.json();
        const orderId = orderResponseData._id;
        const notificationStatus = orderResponseData.notificationStatus;
        
        setCreatedOrderId(orderId);
        
        // Clear cart after successful order
        await clearCart();
        
        // Smart Fallback: If Pro API was skipped (no credentials) or failed, use manual wa.me link
        if (whatsappNumber && (notificationStatus === 'skipped' || notificationStatus === 'error')) {
          const message = `Hello from Inventaa! 📦\n\nYour order of ₹${amount} has been successfully placed.\n\nTrack your shipment live here:\n${window.location.origin}/order-tracking/${orderId}\n\nThank you for choosing us!`;
          const waLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
          window.open(waLink, '_blank');
        }

        setIsSuccess(true);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`❌ Payment failed: ${errData.message || `Server returned ${res.status}`}`);
      }

    } catch (err) {
      console.error("Payment error:", err);
      alert(`❌ Payment failed: Cannot reach server. Make sure backend is running on port 5000.`);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Session Expired</h2>
          <p className="text-gray-500 mb-4">We couldn't find your order details. Redirecting you to the cart...</p>
          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full animate-progress"></div>
          </div>
        </div>
        <style>{`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-progress { animation: progress 3s linear forwards; }
        `}</style>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-slate-800">
        <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 text-center border border-slate-100 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-5xl mx-auto mb-8 shadow-2xl shadow-blue-500/20">
              <FaShieldAlt />
           </div>
           <h1 className="text-3xl font-black text-slate-900 mb-2">Order Confirmed!</h1>
           <p className="text-slate-500 text-sm font-medium mb-8">Your bulk requisition has been processed successfully.</p>
           
           <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Tracking ID</p>
              <p className="text-lg font-black text-slate-800 tracking-tight">#{createdOrderId.slice(-8).toUpperCase()}</p>
           </div>

           <div className="space-y-3">
              <button
                onClick={() => navigate(`/order-tracking/${createdOrderId}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
              >
                Track Your Shipment Now
              </button>
              <button
                onClick={() => navigate("/buyer-dashboard/orders")}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-sm transition-colors"
              >
                View Order History
              </button>
           </div>

           {whatsappNumber && (
             <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-2 text-green-600">
                <FaWhatsapp size={16} />
                <p className="text-[10px] font-black uppercase tracking-widest">Tracking details sent to WhatsApp</p>
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        
        {/* LEFT: Sidebar / Payment Methods */}
        <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-100 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800">Checkout</h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Secure Payment Gateway</p>
          </div>

          <div className="space-y-3">
            {[
              { id: "card", label: "Credit/Debit Card", icon: "💳" },
              { id: "upi", label: "UPI Payment", icon: "📱" },
              { id: "netbanking", label: "Net Banking", icon: "🏦" },
              { id: "cod", label: "Cash on Delivery", icon: "📦" }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center gap-3 font-bold ${
                  method === m.id 
                  ? "bg-white shadow-lg shadow-blue-500/10 text-blue-600 scale-105" 
                  : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <span className="text-xl">{m.icon}</span>
                <span className="text-sm">{m.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-12 p-4 bg-blue-50 rounded-2xl border border-blue-100">
             <div className="flex items-center gap-2 text-blue-700 mb-2">
                <FaShieldAlt size={14} />
                <span className="text-[10px] font-black uppercase tracking-wider">Secure Payment</span>
             </div>
             <p className="text-[10px] text-blue-600/70 leading-relaxed font-medium">
               Your transaction is encrypted with 256-bit SSL security. We do not store your card details.
             </p>
          </div>
        </div>

        {/* RIGHT: Main Content */}
        <div className="w-full md:w-2/3 p-8 md:p-12 relative">
          
          {/* Header Summary */}
          <div className="flex justify-between items-start mb-10 border-b border-slate-50 pb-8">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Payable</p>
              <h1 className="text-4xl font-black text-slate-900">₹{amount.toLocaleString("en-IN")}</h1>
            </div>
            <div className="text-right">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Invoice ID</p>
               <p className="text-sm font-bold text-slate-700">#INV-992834</p>
            </div>
          </div>

          <div className="min-h-[300px]">
            {/* CARD */}
            {method === "card" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Card Information</h3>
                <div className="space-y-4">
                  <div className="relative group">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 font-medium"
                      />
                      <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 font-medium"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 font-medium text-center tracking-[4px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="As shown on card"
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI */}
            {method === "upi" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Scan with any App</h3>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 inline-block mb-6 shadow-sm">
                  <img
                    className="w-48 h-48 mx-auto grayscale group-hover:grayscale-0 transition-all duration-500"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=test@upi&pn=Demo&am=${amount}`}
                    alt="QR"
                  />
                </div>
                <p className="text-xs text-slate-400 font-medium mb-6">Or enter your UPI ID below</p>
                <input
                  type="text"
                  placeholder="mobilenumber@upi"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm mx-auto block text-center font-bold text-slate-700"
                />
              </div>
            )}

            {/* NET BANKING */}
            {method === "netbanking" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Select your Bank</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak", "Others"].map(bank => (
                    <button key={bank} className="p-4 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all text-left flex justify-between items-center group">
                      {bank}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* COD */}
            {method === "cod" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 text-center py-10">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📦</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Cash on Delivery</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                  You can pay with cash or card when your package arrives at your business address.
                </p>
              </div>
            )}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-50">
            {whatsappNumber && (
              <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-green-50 rounded-xl border border-green-100 text-green-700">
                <FaWhatsapp size={16} className="shrink-0" />
                <p className="text-[10px] font-bold">Tracking details will be sent to WhatsApp: <span className="font-black underline">{whatsappNumber}</span></p>
              </div>
            )}

            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              Complete Payment
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-wider">Secure 256-bit encrypted payment</p>
          </div>

        </div>
      </div>
    </div>
  );
}