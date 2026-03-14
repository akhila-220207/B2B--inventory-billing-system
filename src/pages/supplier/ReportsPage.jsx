//this is reports page
import { useRef, useEffect, useState } from "react";
import { 
  FaChartLine, 
  FaCloudDownloadAlt, 
  FaClock,
  FaCogs,
  FaFileInvoice
} from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ReportsPage() {
  const reportRef = useRef();
  const [data, setData] = useState({ orders: [], products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [ordersRes, productsRes] = await Promise.all([
          fetch("http://localhost:5000/api/orders", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:5000/api/products")
        ]);
        
        if (ordersRes.ok && productsRes.ok) {
          const orders = await ordersRes.json();
          const products = await productsRes.json();
          setData({ orders, products });
        }
      } catch (err) {
        console.error("Error fetching supplier report data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = async () => {
    const element = reportRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Supplier_Performance_Audit_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export report. Please try again.");
    }
  };

  // Simulated metrics based on available data
  const totalRevenue = data.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) * 0.85; // Simulated supplier share
  const uniqueCustomers = new Set(data.orders.map(o => o.userId)).size;
  const productCount = data.products.length;

  const metrics = [
    { label: "Gross Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, change: "+18.2%", img: "finance_icon_3d", color: "text-blue-600", bg: "bg-blue-50/50" },
    { label: "Partner Network", value: `${uniqueCustomers} Clients`, change: "+12 New", img: "customers_icon_3d", color: "text-indigo-600", bg: "bg-indigo-50/50" },
    { label: "SKU Distribution", value: `${productCount} Items`, change: "Optimized", img: "inventory_icon_3d", color: "text-emerald-600", bg: "bg-emerald-50/50" },
  ];

  if (loading) return <div className="p-20 text-center font-black text-slate-300 uppercase tracking-widest animate-pulse">Generating Performance Audit...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans selection:bg-indigo-100">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
              Supplier <span className="text-indigo-600">Analytics</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Global Supply Chain Performance • Real-time Audit</p>
          </div>
          <button 
            onClick={handleExport}
            className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            <FaCloudDownloadAlt className="text-lg group-hover:animate-bounce" />
            Download Performance Audit
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all group overflow-hidden relative">
              <div className={`absolute -right-4 -top-4 w-32 h-32 ${metric.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-50 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                  <img src={`/${metric.img}_${metric.img === 'customers_icon_3d' ? '1773148026440' : (metric.img === 'finance_icon_3d' ? '1773147479168' : '1773147788357')}.png`} alt={metric.label} className="w-full h-full object-cover" />
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{metric.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{metric.value}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${metric.color === 'text-emerald-600' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {metric.change}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">audit verify</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audit Workspace */}
        <div ref={reportRef} className="space-y-12 bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/30">
          <div className="flex items-center justify-between border-b border-slate-100 pb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FaChartLine />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Revenue Yield Matrix</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Gross Sales Distribution</p>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
               {['D', 'W', 'M', 'Y'].map(t => (
                 <button key={t} className={`w-8 h-8 rounded-lg text-[10px] font-black ${t === 'M' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400'}`}>
                   {t}
                 </button>
               ))}
            </div>
          </div>

          {/* Performance Visualization */}
          <div className="grid grid-cols-12 gap-3 items-end h-72 mb-12 relative">
            {/* Subtle background grid for chart */}
            <div className="absolute inset-0 border-b border-slate-100 flex flex-col justify-between -z-20 py-2">
               {[...Array(5)].map((_, i) => <div key={i} className="w-full border-t border-slate-50" />)}
            </div>
            {[30, 45, 25, 60, 50, 85, 40, 75, 90, 65, 55, 100].map((h, i) => (
              <div key={i} className="h-full flex flex-col items-center group relative">
                {/* Fixed bar visibility: Added default bg-indigo-50/50 and shadow */}
                <div className="w-full h-full absolute bottom-0 bg-slate-50/50 rounded-xl -z-10" />
                <div 
                  className="w-full bg-indigo-500/20 border border-indigo-200/50 rounded-xl group-hover:bg-indigo-600 transition-all duration-700 cursor-pointer relative shadow-inner group-hover:shadow-indigo-200"
                  style={{ height: `${h}%` }}
                >
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                     ₹{h}k Yield
                   </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Fulfillment Analysis */}
            <div className="space-y-8">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Operations Manifest</h4>
               <div className="space-y-6">
                 <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 group hover:border-indigo-200 transition-all hover:translate-x-1">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <FaClock className="text-indigo-600" />
                       </div>
                       <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Lead Time Avg.</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">2.4 Days</span>
                 </div>
                 <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 group hover:border-indigo-200 transition-all hover:translate-x-1">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <FaCogs className="text-indigo-600" />
                       </div>
                       <span className="text-sm font-black text-slate-700 uppercase tracking-tight">Inventory Velocity</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">14.2x / Year</span>
                 </div>
               </div>
            </div>

            {/* Strategic Overview */}
            <div className="p-8 bg-indigo-50/30 rounded-[2.5rem] border border-indigo-100 group hover:bg-indigo-50/50 transition-colors">
               <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                 <FaFileInvoice /> Executive Summary
               </h4>
               <p className="text-sm text-slate-600 font-medium leading-relaxed mb-8">
                 Supply chain optimization is proceeding ahead of projections. Current liquidity indicates high capacity for <span className="text-slate-900 font-black underline decoration-indigo-300 underline-offset-4">strategic expansion</span> in the upcoming fiscal quarter.
               </p>
               <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-indigo-100 group-hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 font-black text-lg">
                    A+
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-900 uppercase">Vendor Grade</p>
                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-0.5">Health Index: Excellent</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

