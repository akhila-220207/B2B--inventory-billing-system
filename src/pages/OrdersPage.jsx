import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaBoxOpen, 
  FaCargoCult, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaChevronRight,
  FaInfoCircle,
  FaTimesCircle
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          setError("Failed to load orders.");
        }
      } catch (err) {
        setError("Cannot connect to server.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: 'Cancelled' } : o));
        alert("Order cancelled successfully.");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to cancel order.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  const getStatusStyles = (status) => {
    const map = {
      Processing: "bg-amber-50 text-amber-700 border-amber-200",
      Shipped: "bg-blue-50 text-blue-700 border-blue-200",
      Delivered: "bg-green-50 text-green-700 border-green-200",
      Cancelled: "bg-red-50 text-red-700 border-red-200",
    };
    return map[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen p-10 flex flex-col items-center justify-center opacity-40">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h2>
             <p className="text-sm text-gray-500 mt-1">Track and manage all your orders here</p>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">On the Way</p>
                <p className="text-xl font-black text-gray-800">{orders.filter(o => o.status !== 'Delivered').length}</p>
             </div>
             <div className="h-8 w-px bg-gray-200"></div>
             <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">All Orders</p>
                <p className="text-xl font-black text-gray-800">{orders.length}</p>
             </div>
          </div>
        </div>

        {error && (
           <div className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-6 text-red-600 text-sm font-medium flex items-center gap-2">
              <FaInfoCircle /> {error}
           </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-24 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FaBoxOpen className="text-gray-300 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-500 max-w-sm mb-8 text-sm leading-relaxed">
              Your order history is empty. Start shopping to see your orders here.
            </p>
            <Link
              to="/buyer-dashboard/marketplace"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-bold text-sm transition-all active:scale-95"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
                  {/* Order Meta */}
                  <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center justify-between">
                       <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
                         <span className="text-gray-300 font-medium">#</span>
                         {order._id.slice(-8).toUpperCase()}
                       </h3>
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(order.status)}`}>
                         {order.status}
                       </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                       <div className="flex items-start gap-3">
                          <FaCalendarAlt className="text-gray-300 mt-1" size={12} />
                          <div>
                             <p className="text-[10px] text-gray-400 font-bold uppercase">Ordered On</p>
                             <p className="text-xs font-bold text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-3">
                          <FaMapMarkerAlt className="text-gray-300 mt-1" size={12} />
                          <div className="min-w-0">
                             <p className="text-[10px] text-gray-400 font-bold uppercase">Deliver To</p>
                             <p className="text-xs font-bold text-gray-700 truncate">{order.shippingAddress}</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-3 col-span-2 md:col-span-1">
                          <div className="flex -space-x-3 overflow-hidden">
                             {order.items.slice(0, 3).map((item, i) => (
                                <img
                                  key={i}
                                  src={item.image}
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover bg-gray-50"
                                  alt={item.name}
                                />
                             ))}
                             {order.items.length > 3 && (
                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white text-[10px] font-bold text-gray-500">
                                   +{order.items.length - 3}
                                </div>
                             )}
                          </div>
                          <div className="ml-1">
                             <p className="text-[10px] text-gray-400 font-bold uppercase">Items</p>
                             <p className="text-xs font-bold text-gray-700">{order.items.length} Product{order.items.length !== 1 ? 's' : ''}</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="w-full md:w-auto md:border-l border-gray-100 md:pl-8 flex flex-row md:flex-col justify-between items-center md:items-end gap-6">
                    <div className="text-left md:text-right">
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">TOTAL</p>
                       <p className="text-2xl font-black text-gray-900 tracking-tight">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                       <p className="text-[10px] text-green-600 font-bold uppercase">Payment {order.paymentStatus}</p>
                    </div>
                    
                    <Link
                      to={`/order-tracking/${order._id}`}
                      className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-gray-200 group"
                    >
                      Track Order
                      <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {order.status === 'Processing' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-6 py-3 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all group"
                      >
                        <FaTimesCircle className="text-[10px]" />
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50/50 px-8 py-3 flex items-center justify-between border-t border-gray-50">
                    <div className="flex gap-4">
                       <span className="text-[10px] text-gray-400 font-medium">Seller: <span className="text-gray-700 font-bold">{order.items[0]?.supplier} {order.items.length > 1 ? `& ${order.items.length - 1} more` : ''}</span></span>
                       <span className="text-[10px] text-gray-400 font-medium tracking-tight">•</span>
                       <span className="text-[10px] text-gray-400 font-medium italic">Shipping fees included</span>
                    </div>
                    <Link 
                      to={`/buyer-dashboard/invoice/${order._id}`}
                      className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors group"
                    >
                      <FaInfoCircle className="text-blue-400 group-hover:scale-110 transition-transform" />
                      View Invoice
                    </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}