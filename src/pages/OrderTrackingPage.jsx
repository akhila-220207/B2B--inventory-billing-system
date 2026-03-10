import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaCheckCircle, 
  FaTruck, 
  FaBoxOpen, 
  FaMapMarkerAlt, 
  FaArrowLeft,
  FaFileInvoice,
  FaCalendarAlt,
  FaBuilding
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        } else {
          setError("Order tracking details not found.");
        }
      } catch (err) {
        setError("Failed to connect to tracking server.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 opacity-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Connecting to Logistics...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center justify-center text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Tracking Unavailable</h2>
        <p className="text-gray-500 mb-6 text-sm">{error || "Could not retrieve order details."}</p>
        <button
          onClick={() => navigate("/buyer-dashboard/orders")}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm"
        >
          Back to My Orders
        </button>
      </div>
    );
  }

  // Determine which steps are completed based on order status
  const statusHierarchy = ["Processing", "Shipped", "Delivered"];
  const currentStatusIndex = statusHierarchy.indexOf(order.status);

  const trackingSteps = [
    { 
      label: "Order Confirmed", 
      desc: "The supplier has received your bulk requisition.",
      status: "Processing", 
      icon: <FaFileInvoice />,
      isCompleted: true 
    },
    { 
      label: "Logistics Dispatched", 
      desc: "Order has left the central warehouse for transit.",
      status: "Shipped", 
      icon: <FaTruck />,
      isCompleted: currentStatusIndex >= 1 
    },
    { 
      label: "Inventory Delivered", 
      desc: "Goods have been received and verified at site.",
      status: "Delivered", 
      icon: <FaBoxOpen />,
      isCompleted: currentStatusIndex >= 2 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate("/buyer-dashboard/orders")}
          className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-all mb-10"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <FaArrowLeft size={10} />
          </div>
          Back to History
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-200">
                    Live Tracking
                  </span>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                    Batch <span className="text-blue-600">#{order._id.slice(-8).toUpperCase()}</span>
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>{order.shippingAddress}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>ETA: <span className="text-slate-900 font-bold">{order.status === 'Delivered' ? 'Delivered' : '3-4 Business Days'}</span></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 text-xl">
                  <FaBuilding />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Main Supplier</p>
                  <p className="text-sm font-bold text-slate-800">{order.items[0]?.supplier || 'Verified Partner'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 relative">
          {trackingSteps.map((step, i) => (
            <div key={i} className="relative">
              <div className={`h-full p-8 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center text-center group ${
                step.isCompleted 
                ? 'bg-white border-blue-100 shadow-2xl shadow-blue-900/5' 
                : 'bg-slate-50/50 border-slate-100 opacity-50 grayscale'
              }`}>
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 transform group-hover:scale-110 shadow-lg ${
                  step.isCompleted ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-slate-200 text-slate-400'
                }`}>
                  <div className="text-2xl">
                    {step.isCompleted && order.status === step.status ? (
                      <div className="relative animate-pulse">
                        {step.icon}
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                        </span>
                      </div>
                    ) : step.isCompleted ? (
                      <FaCheckCircle />
                    ) : (
                      step.icon
                    )}
                  </div>
                </div>
                <h3 className={`font-black text-lg mb-3 tracking-tight ${step.isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
                
                {step.isCompleted && (
                  <div className="mt-6 px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    Completed
                  </div>
                )}
              </div>
              
              {i < trackingSteps.length - 1 && (
                <div className={`hidden lg:block absolute top-[4.5rem] -right-4 w-8 h-1 z-0 rounded-full ${
                  trackingSteps[i+1].isCompleted ? 'bg-blue-600' : 'bg-slate-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Manifest */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-12">
          <div className="px-10 py-8 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm">
                  <FaBoxOpen />
                </div>
                Shipment Manifest
              </h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Verified Inventory Units</p>
            </div>
            <div className="text-right">
              <span className="bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {order.items.length} SKUs Listed
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-6 py-4">Product Details</th>
                    <th className="px-6 py-4 text-center">Quantity</th>
                    <th className="px-6 py-4 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {order.items.map((item, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                          </div>
                          <div>
                            <p className="text-base font-black text-slate-800 leading-tight mb-1">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5">
                              <FaBuilding size={8} className="text-blue-500" /> {item.supplier}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-sm font-black text-slate-900 px-3 py-1 bg-slate-100 rounded-lg">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <p className="text-base font-black text-slate-900 tracking-tight">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">₹{item.price.toLocaleString("en-IN")} / unit</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-10 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 shadow-inner">
                <FaFileInvoice size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-black tracking-tight leading-none">Marketplace Certified</p>
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Blockchain Verified Requisition</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Requisition Value</p>
              <p className="text-5xl font-black text-white tracking-tighter">
                <span className="text-blue-500 text-2xl mr-1">₹</span>
                {order.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}