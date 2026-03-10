import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaFileInvoiceDollar, 
  FaSearch, 
  FaCloudDownloadAlt, 
  FaEye, 
  FaSortAmountDown,
  FaCalendarAlt,
  FaArrowRight
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

export default function InvoicesListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Filter only orders that can have invoices (not cancelled)
          setOrders(data.filter(o => o.status !== 'Cancelled'));
        }
      } catch (err) {
        console.error("Error fetching invoices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const handleExportCSV = () => {
    if (orders.length === 0) return;

    const headers = ["Invoice ID", "Date", "Description", "Items Count", "Currency", "Total Amount"];
    const csvContent = [
      headers.join(","),
      ...orders.map(o => [
        o._id.toUpperCase(),
        new Date(o.createdAt).toLocaleDateString("en-IN"),
        `"${o.items[0]?.name || 'Bulk Sourcing'}"`,
        o.items.length,
        "INR",
        o.totalAmount
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `B2B_Billing_Audit_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredOrders = orders.filter(o => 
    o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.items[0]?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-20 text-center font-black text-slate-300 uppercase tracking-widest animate-pulse">Loading Invoices...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 flex items-center gap-4">
              My <span className="text-blue-600">Invoices</span>
              <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] rounded-full uppercase tracking-widest border border-blue-100">
                Official
              </div>
            </h1>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">View all your bills here</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-80 group">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                   type="text" 
                   placeholder="Search invoice or product..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all shadow-sm"
                />
             </div>
             <button className="bg-white border border-slate-200 p-3.5 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                <FaSortAmountDown />
             </button>
          </div>
        </div>

        {/* Financial Summary Overlay */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-5">
               <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <FaFileInvoiceDollar />
               </div>
               <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Paid</p>
                  <p className="text-xl font-black text-slate-900">₹{orders.reduce((s,o) => s + o.totalAmount, 0).toLocaleString("en-IN")}</p>
               </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-5">
               <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <FaCalendarAlt />
               </div>
               <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Bills</p>
                  <p className="text-xl font-black text-slate-900">{orders.length} Invoices</p>
               </div>
            </div>
            <div 
               onClick={handleExportCSV}
               className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-5 group cursor-pointer hover:bg-slate-900 transition-colors duration-500"
            >
               <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-blue-600 transition-colors">
                  <FaCloudDownloadAlt />
               </div>
               <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest group-hover:text-blue-200">Export All</p>
                  <p className="text-xl font-black text-slate-900 group-hover:text-white">Download CSV</p>
               </div>
            </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/30 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-10 py-6">Invoice ID</th>
                <th className="px-10 py-6">Date</th>
                <th className="px-10 py-6">Product</th>
                <th className="px-10 py-6 text-right">Amount</th>
                <th className="px-10 py-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                       <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                       <span className="font-black text-slate-900 tracking-tight text-sm">#{order._id.slice(-8).toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                       {new Date(order.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-xs font-black text-slate-700 block truncate max-w-[200px]">
                       {order.items[0]?.name || "Bulk Sourcing"}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 block">
                       {order.items.length} Items
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <span className="text-lg font-black text-slate-900 tracking-tighter">
                       ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex justify-center gap-3">
                       <button 
                         onClick={() => navigate(`/buyer-dashboard/invoice/${order._id}`)}
                         className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                       >
                          <FaEye /> View
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="p-20 text-center">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-6">
                  <FaFileInvoiceDollar size={24} />
               </div>
               <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No invoices found</p>
            </div>
          )}
        </div>
        
        {/* Footer Prompt */}
        <div className="mt-12 text-center pb-12">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Need specific commercial adjustments?</p>
            <button className="group flex items-center gap-2 mx-auto text-xs font-black text-blue-600 hover:text-blue-700 transition-colors">
               Contact Billing Support <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
}
