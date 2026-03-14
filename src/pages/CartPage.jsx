import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrashAlt, FaShoppingBag, FaArrowLeft, FaTag, FaTruck,
  FaInfoCircle, FaCheckCircle, FaTimes, FaMobileAlt, FaQrcode,
  FaUniversity, FaChevronRight, FaLock, FaShieldAlt
} from "react-icons/fa";
import { SiPhonepe, SiGooglepay, SiPaytm } from "react-icons/si";

// ─── Mock cart context for standalone demo ───────────────────────────────────
const mockCartItems = [
  { productId: "1", name: "Industrial Grade Bolt Set", supplier: "MetalCorp", price: 4200, quantity: 10, unit: "box", image: "https://via.placeholder.com/80x80/e0e7ff/4f46e5?text=⚙", minOrderQty: 5 },
  { productId: "2", name: "Heavy Duty Packaging Film", supplier: "PackPro", price: 1850, quantity: 25, unit: "roll", image: "https://via.placeholder.com/80x80/dcfce7/16a34a?text=📦", minOrderQty: 10 },
];

// ─── UPI Apps Config ──────────────────────────────────────────────────────────
const UPI_APPS = [
  { id: "phonepe",  label: "PhonePe",   icon: SiPhonepe,   color: "#5f259f", bg: "#f3e8ff", upiId: "merchant@ybl" },
  { id: "gpay",     label: "Google Pay", icon: SiGooglepay, color: "#1a73e8", bg: "#e8f0fe", upiId: "merchant@okaxis" },
  { id: "paytm",    label: "Paytm",      icon: SiPaytm,     color: "#00baf2", bg: "#e0f7ff", upiId: "merchant@paytm" },
  { id: "bhim",     label: "BHIM UPI",   icon: FaMobileAlt, color: "#ff6b00", bg: "#fff3e0", upiId: "merchant@upi" },
  { id: "netbank",  label: "Net Banking", icon: FaUniversity,color: "#0f766e", bg: "#ccfbf1", upiId: null },
  { id: "qr",       label: "Scan QR",    icon: FaQrcode,    color: "#7c3aed", bg: "#ede9fe", upiId: null },
];

// ─── QR Code SVG (mock) ───────────────────────────────────────────────────────
const QRCode = ({ amount }) => (
  <div className="flex flex-col items-center">
    <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="rounded-2xl border-4 border-white shadow-lg">
      <rect width="160" height="160" fill="white"/>
      {/* QR pattern mock */}
      {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
        const pattern = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
        return pattern[r][c] ? <rect key={`${r}-${c}`} x={10+c*10} y={10+r*10} width={9} height={9} fill="#1e1b4b"/> : null;
      }))}
      {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
        const pattern = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
        return pattern[r][c] ? <rect key={`tr-${r}-${c}`} x={90+c*10} y={10+r*10} width={9} height={9} fill="#1e1b4b"/> : null;
      }))}
      {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
        const pattern = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
        return pattern[r][c] ? <rect key={`bl-${r}-${c}`} x={10+c*10} y={90+r*10} width={9} height={9} fill="#1e1b4b"/> : null;
      }))}
      {/* random data cells */}
      {Array.from({length:30},(_,i)=><rect key={`d${i}`} x={80+((i*37)%60)} y={80+((i*53)%60)} width={8} height={8} fill="#1e1b4b" opacity={Math.random()>0.4?1:0}/>)}
    </svg>
    <p className="mt-3 text-xs font-bold text-gray-500">Scan with any UPI app</p>
    <p className="text-xs text-blue-600 font-black">₹{amount.toLocaleString("en-IN")}</p>
  </div>
);

// ─── Payment Modal ─────────────────────────────────────────────────────────────
function PaymentModal({ total, onClose, onSuccess }) {
  const [step, setStep]           = useState("select"); // select | upiid | qr | processing
  const [selectedApp, setSelected] = useState(null);
  const [upiInput, setUpiInput]   = useState("");
  const [upiError, setUpiError]   = useState("");

  const handleAppClick = (app) => {
    setSelected(app);
    if (app.id === "qr") { setStep("qr"); return; }
    if (app.id === "netbank") { setStep("upiid"); return; }
    setStep("upiid");
  };

  const handlePay = () => {
    if (!upiInput.includes("@")) { setUpiError("Enter a valid UPI ID (e.g. name@upi)"); return; }
    setUpiError("");
    setStep("processing");
    setTimeout(onSuccess, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: "92vh", overflowY: "auto" }}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-6 pb-8 relative">
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="text-white/70 hover:text-white transition">
              <FaTimes size={18} />
            </button>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <FaLock className="text-white" size={16} />
            </div>
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Secure Checkout</p>
              <p className="text-white font-black text-lg leading-tight">Pay via UPI</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl px-5 py-3 flex justify-between items-center">
            <span className="text-white/80 text-sm font-semibold">Amount to Pay</span>
            <span className="text-white font-black text-2xl">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Notch */}
        <div className="h-4 bg-white rounded-t-3xl -mt-4 relative z-10" />

        <div className="px-6 pb-8 -mt-2">
          {/* ── Step: Select UPI App ── */}
          {step === "select" && (
            <>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Choose Payment Method</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {UPI_APPS.map(app => (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all group active:scale-95"
                    style={{ background: app.bg }}
                  >
                    <app.icon size={28} style={{ color: app.color }} />
                    <span className="text-[11px] font-bold text-gray-700 leading-tight text-center">{app.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 justify-center">
                <FaShieldAlt size={11} className="text-green-500" />
                <span className="font-semibold">256-bit SSL encrypted • RBI compliant</span>
              </div>
            </>
          )}

          {/* ── Step: UPI ID Entry ── */}
          {step === "upiid" && selectedApp && (
            <>
              <button onClick={() => setStep("select")} className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 font-semibold mb-4 transition">
                <FaArrowLeft size={10} /> Back
              </button>
              <div className="flex items-center gap-3 p-4 rounded-2xl mb-5" style={{ background: selectedApp.bg }}>
                <selectedApp.icon size={30} style={{ color: selectedApp.color }} />
                <div>
                  <p className="font-black text-gray-800 text-sm">{selectedApp.label}</p>
                  {selectedApp.upiId && <p className="text-[11px] text-gray-500 font-medium">Merchant: {selectedApp.upiId}</p>}
                </div>
              </div>

              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your UPI ID</p>
              <input
                type="text"
                placeholder="yourname@upi / yourname@okaxis"
                value={upiInput}
                onChange={e => { setUpiInput(e.target.value); setUpiError(""); }}
                className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-2xl px-4 py-3 text-sm font-semibold outline-none transition mb-1"
                autoFocus
              />
              {upiError && <p className="text-red-500 text-xs font-semibold mb-2">{upiError}</p>}
              <p className="text-[10px] text-gray-400 mb-5">Enter the UPI ID linked to your {selectedApp.label} account</p>

              <button
                onClick={handlePay}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-base shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Pay ₹{total.toLocaleString("en-IN")} <FaChevronRight />
              </button>
            </>
          )}

          {/* ── Step: QR ── */}
          {step === "qr" && (
            <>
              <button onClick={() => setStep("select")} className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 font-semibold mb-4 transition">
                <FaArrowLeft size={10} /> Back
              </button>
              <div className="flex flex-col items-center py-4">
                <QRCode amount={total} />
                <div className="mt-6 w-full bg-blue-50 rounded-2xl px-5 py-4 text-center">
                  <p className="text-xs text-blue-600 font-bold">Open any UPI app → Scan QR → Pay</p>
                  <p className="text-[10px] text-gray-400 mt-1 font-medium">PhonePe · Google Pay · Paytm · BHIM · Any UPI</p>
                </div>
                <button
                  onClick={() => { setStep("processing"); setTimeout(onSuccess, 2200); }}
                  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  I've completed the payment
                </button>
              </div>
            </>
          )}

          {/* ── Step: Processing ── */}
          {step === "processing" && (
            <div className="flex flex-col items-center py-10 gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaLock className="text-blue-500" size={20} />
                </div>
              </div>
              <div className="text-center">
                <p className="font-black text-gray-800 text-lg">Processing Payment</p>
                <p className="text-sm text-gray-400 mt-1 font-medium">Verifying with your bank...</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: "70%" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({ total, onDone }) {
  const orderId = "B2B" + Math.random().toString(36).substring(2,8).toUpperCase();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-sm w-full text-center">
        {/* Animated checkmark */}
        <div className="relative mx-auto w-28 h-28 mb-8">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
          <div className="absolute inset-2 bg-green-200 rounded-full animate-pulse opacity-50" />
          <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-300">
            <FaCheckCircle className="text-white" size={52} />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed">
          Your bulk order has been confirmed. Our team will process it within 24 hours.
        </p>

        {/* Receipt Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200 border border-gray-100 p-6 mb-6 text-left">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Receipt</span>
            <span className="text-xs font-black text-green-600 bg-green-50 px-3 py-1 rounded-full">✓ Paid</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-semibold">Order ID</span>
              <span className="text-xs font-black text-gray-800 font-mono">{orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-semibold">Amount Paid</span>
              <span className="text-sm font-black text-blue-600">₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-semibold">Payment Mode</span>
              <span className="text-xs font-bold text-gray-700">UPI</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-semibold">Est. Delivery</span>
              <span className="text-xs font-bold text-gray-700">3–5 Business Days</span>
            </div>
          </div>
        </div>

        <button
          onClick={onDone}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 mb-3"
        >
          Continue Shopping
        </button>
        <p className="text-[11px] text-gray-400 font-medium">A confirmation email has been sent to your registered address</p>
      </div>
    </div>
  );
}

// ─── Main Cart Page ────────────────────────────────────────────────────────────
export default function CartPage() {
  // Using mock data for demo; replace with useCart() hook in your project
  const cartItems = mockCartItems;
  const navigate  = useNavigate();

  const removeFromCart  = (id) => console.log("remove", id);
  const updateQuantity  = (id, q) => console.log("update", id, q);
  const clearCart       = () => console.log("clear");

  const [coupon, setCoupon]             = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showPayment, setShowPayment]   = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const gst      = Math.round(subtotal * 0.05);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total    = subtotal + gst - discount;

  const handleCoupon = () => {
    coupon.trim().toUpperCase() === "B2BSAVE10"
      ? setCouponApplied(true)
      : alert("Invalid coupon code.");
  };

  const goBack = () => navigate("/buyer-dashboard/marketplace");

  if (orderSuccess) return <SuccessScreen total={total} onDone={() => navigate("/buyer-dashboard/marketplace")} />;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {showPayment && (
        <PaymentModal
          total={total}
          onClose={() => setShowPayment(false)}
          onSuccess={() => { setShowPayment(false); setOrderSuccess(true); }}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={goBack} className="text-gray-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition mb-2">
              <FaArrowLeft size={12} /> Return to Shop
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Cart</h2>
            <p className="text-sm text-gray-500 mt-1">Review your items before buying</p>
          </div>
          <div className="hidden md:flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Cart Capacity</p>
              <p className="text-sm font-bold text-gray-800">{cartItems.length} Unique Items</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <FaShoppingBag className="text-blue-600 text-xl" />
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-24 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FaShoppingBag className="text-blue-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 max-w-sm mb-8 text-sm leading-relaxed">Browse our shop to find what you need.</p>
            <button onClick={goBack} className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-bold text-sm transition-all shadow-lg shadow-blue-200 active:scale-95">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 hidden md:grid grid-cols-12 gap-4">
                  <div className="col-span-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Product Details</div>
                  <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Batch Quantity</div>
                  <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Subtotal</div>
                </div>
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="p-6 transition-colors hover:bg-gray-50/30 group">
                      <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-12 md:col-span-6 flex gap-5">
                          <div className="relative">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0 border border-gray-100 shadow-sm"
                              onError={e => { e.target.src = "https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=B2B"; }} />
                            <button onClick={() => removeFromCart(item.productId)}
                              className="absolute -top-2 -left-2 w-6 h-6 bg-white border border-red-100 text-red-500 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition hover:bg-red-50">
                              <FaTrashAlt size={10} />
                            </button>
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-1 mb-1">{item.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase tracking-wider">{item.supplier}</span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">Unit Price: <span className="text-gray-900 font-bold">₹{item.price?.toLocaleString("en-IN")}</span> / {item.unit}</p>
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3 flex flex-col items-center justify-center">
                          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 shadow-inner">
                            <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-8 h-8 hover:bg-white rounded-lg font-bold text-gray-400 hover:text-blue-600 transition flex items-center justify-center">−</button>
                            <input type="number" value={item.quantity} min="1"
                              onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 1) updateQuantity(item.productId, v); }}
                              className="w-12 bg-transparent text-center text-sm font-bold text-gray-800 outline-none" />
                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-8 h-8 hover:bg-white rounded-lg font-bold text-gray-400 hover:text-blue-600 transition flex items-center justify-center">+</button>
                          </div>
                          {item.minOrderQty > item.quantity && (
                            <p className="text-[10px] text-orange-600 mt-1 font-semibold flex items-center gap-1">
                              <FaInfoCircle size={9} /> Min. {item.minOrderQty} units
                            </p>
                          )}
                        </div>
                        <div className="col-span-6 md:col-span-3 text-right">
                          <p className="font-extrabold text-gray-900 text-lg">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                          <p className="text-[10px] text-gray-400 font-medium">Excl. GST</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-blue-50/30 border-t border-gray-100 flex items-center justify-between">
                  <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1.5 transition px-3 py-1.5 rounded-lg hover:bg-red-50">
                    <FaTrashAlt size={10} /> Discard Cart
                  </button>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                    <FaTruck size={12} className="text-blue-500" /> Standard bulk delivery terms apply
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 sticky top-32">
                <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <FaShoppingBag className="text-white text-lg" />
                  </div>
                  Order Summary
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-gray-900 font-bold">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">GST (5%)</span>
                    <span className="text-gray-900 font-bold">₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between items-center text-sm py-2 px-3 bg-green-50 rounded-xl">
                      <span className="text-green-700 font-bold flex items-center gap-2"><FaTag size={12} /> Bulk Discount (10%)</span>
                      <span className="text-green-700 font-extrabold">−₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="h-px bg-gray-100 my-2" />
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">ESTIMATED TOTAL</p>
                      <p className="text-3xl font-black text-blue-600">₹{total.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>

                {/* Coupon */}
                {!couponApplied ? (
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Promo Code"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition" />
                      <button onClick={handleCoupon} className="bg-gray-800 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-gray-900 transition-colors">Apply</button>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 ml-1 italic">Hint: Try B2BSAVE10 for bulk orders</p>
                  </div>
                ) : (
                  <div className="mb-6 p-4 border border-green-100 bg-green-50/30 rounded-2xl flex items-center justify-between">
                    <span className="text-sm font-bold text-green-700">CODE: B2BSAVE10</span>
                    <button onClick={() => setCouponApplied(false)} className="text-xs text-green-600 hover:text-green-800 underline font-medium">Remove</button>
                  </div>
                )}

                <div className="space-y-3">
                  {/* ← The key button that opens UPI modal */}
                  <button
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-4 rounded-2xl font-black text-base shadow-lg shadow-blue-200 flex items-center justify-center gap-3 transition-all group"
                  >
                    Place Bulk Order
                    <FaArrowLeft className="rotate-180 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button onClick={goBack} className="w-full bg-white hover:bg-gray-50 text-gray-600 py-3 rounded-2xl font-bold text-sm border border-gray-200 transition-all">
                    Continue Shopping
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <FaInfoCircle className="text-gray-400" size={14} />
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-medium">By proceeding, you agree to our terms of service.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}