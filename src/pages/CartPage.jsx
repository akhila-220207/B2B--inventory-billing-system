import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaTrashAlt,
  FaShoppingBag,
  FaArrowLeft,
  FaTag,
  FaTruck,
  FaInfoCircle
} from "react-icons/fa";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, loading } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );
  const gst = Math.round(subtotal * 0.05); // Standard 5% GST for bulk
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + gst - discount;

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === "B2BSAVE10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code.");
    }
  };

  if (loading && cartItems.length === 0) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
           <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate("/buyer-dashboard/marketplace")}
              className="text-gray-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition mb-2"
            >
              <FaArrowLeft size={12} /> Return to Marketplace
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              B2B Purchase Cart
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Review your items and supplier terms before proceeding
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Cart Capacity</p>
              <p className="text-sm font-bold text-gray-800">{cartItems.length} Unique Items</p>
            </div>
            <div className="w-px h-8 bg-gray-100"></div>
            <FaShoppingBag className="text-blue-600 text-xl" />
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-24 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FaShoppingBag className="text-blue-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your replenishment cart is empty</h3>
            <p className="text-gray-500 max-w-sm mb-8 text-sm leading-relaxed">
              Looks like you haven't added any products to your bulk order yet. Browse our marketplace to find premium supplies.
            </p>
            <button
              onClick={() => navigate("/buyer-dashboard/marketplace")}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-bold text-sm transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
              Start Sourcing Now
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
                    <div
                      key={item.productId || item._id}
                      className="p-6 transition-colors hover:bg-gray-50/30 group"
                    >
                      <div className="grid grid-cols-12 gap-6 items-center">
                        {/* Info */}
                        <div className="col-span-12 md:col-span-6 flex gap-5">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-xl flex-shrink-0 border border-gray-100 shadow-sm"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=B2B`;
                              }}
                            />
                            <button
                              onClick={() => removeFromCart(item.productId || item._id)}
                              className="absolute -top-2 -left-2 w-6 h-6 bg-white border border-red-100 text-red-500 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition hover:bg-red-50"
                              title="Remove item"
                            >
                              <FaTrashAlt size={10} />
                            </button>
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-1 mb-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                               <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase tracking-wider">
                                 {item.supplier}
                               </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">
                              Unit Price: <span className="text-gray-900 font-bold">₹{item.price?.toLocaleString("en-IN")}</span> / {item.unit}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="col-span-6 md:col-span-3 flex flex-col items-center justify-center">
                          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 shadow-inner">
                            <button
                              onClick={() => updateQuantity(item.productId || item._id, item.quantity - 1)}
                              className="w-8 h-8 hover:bg-white rounded-lg font-bold text-gray-400 hover:text-blue-600 transition flex items-center justify-center"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              min="1"
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val >= 1) updateQuantity(item.productId || item._id, val);
                              }}
                              className="w-12 bg-transparent text-center text-sm font-bold text-gray-800 outline-none"
                            />
                            <button
                              onClick={() => updateQuantity(item.productId || item._id, item.quantity + 1)}
                              className="w-8 h-8 hover:bg-white rounded-lg font-bold text-gray-400 hover:text-blue-600 transition flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          {item.minOrderQty > item.quantity && (
                             <p className="text-[10px] text-orange-600 mt-1 font-semibold flex items-center gap-1">
                               <FaInfoCircle size={9}/> Min. {item.minOrderQty} units
                             </p>
                          )}
                        </div>

                        {/* Price Subtotal */}
                        <div className="col-span-6 md:col-span-3 text-right">
                          <p className="font-extrabold text-gray-900 text-lg">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium">Excl. GST</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-blue-50/30 border-t border-gray-100 flex items-center justify-between">
                   <button
                     onClick={clearCart}
                     className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1.5 transition px-3 py-1.5 rounded-lg hover:bg-red-50"
                   >
                     <FaTrashAlt size={10} /> Discard Cart
                   </button>
                   <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                      <FaTruck size={12} className="text-blue-500" /> Standard bulk delivery terms apply to all items
                   </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Summary Card */}
              <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 sticky top-32">
                <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <FaShoppingBag className="text-white text-lg" />
                  </div>
                  Order Summary
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Consolidated Subtotal</span>
                    <span className="text-gray-900 font-bold">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium flex items-center gap-2">
                       GST (Standard 5%)
                    </span>
                    <span className="text-gray-900 font-bold">₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between items-center text-sm py-2 px-3 bg-green-50 rounded-xl">
                      <span className="text-green-700 font-bold flex items-center gap-2">
                        <FaTag size={12}/> Bulk Discount (10%)
                      </span>
                      <span className="text-green-700 font-extrabold">−₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  
                  <div className="h-px bg-gray-100 my-2"></div>
                  
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">ESTIMATED TOTAL</p>
                      <p className="text-3xl font-black text-blue-600">₹{total.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>

                {/* Coupon Input */}
                {!couponApplied ? (
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Promo Code"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                      <button
                        onClick={handleCoupon}
                        className="bg-gray-800 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-gray-900 transition-colors"
                      >
                        Apply
                      </button>
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
                  <button
                    onClick={() => navigate("/buyer-dashboard/checkout")}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-4 rounded-2xl font-black text-base shadow-lg shadow-blue-200 flex items-center justify-center gap-3 transition-all group"
                  >
                    Proceed to Checkout
                    <FaArrowLeft className="rotate-180 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => navigate("/buyer-dashboard/marketplace")}
                    className="w-full bg-white hover:bg-gray-50 text-gray-600 py-3 rounded-2xl font-bold text-sm border border-gray-200 transition-all"
                  >
                    Continue Sourcing
                  </button>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                   <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                         <FaInfoCircle className="text-gray-400" size={14} />
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                        By proceeding, you agree to the supplier's bulk purchase agreement and standard B2B transaction protocols.
                      </p>
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