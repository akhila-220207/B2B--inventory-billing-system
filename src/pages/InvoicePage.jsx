import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaPrint, 
  FaCloudDownloadAlt, 
  FaBuilding, 
  FaUser, 
  FaFileInvoiceDollar 
} from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const API_BASE = "http://localhost:5000/api";

export default function InvoicePage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        } else {
          setError("Invoice not found.");
        }
      } catch (err) {
        setError("Error loading invoice data.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const element = invoiceRef.current;
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
      pdf.save(`Invoice_${order._id.slice(-8).toUpperCase()}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try printing instead.");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest animate-pulse">Loading Invoice...</div>;

  if (error || !order) return (
    <div className="p-10 text-center">
      <p className="text-red-500 font-bold mb-4">{error}</p>
      <button onClick={() => navigate("/buyer-dashboard/orders")} className="text-blue-600 underline">Back to Orders</button>
    </div>
  );

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  // Re-calculate the total or use what's stored
  const total = order.totalAmount;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 flex flex-col items-center">
      {/* Action Bar */}
      <div className="max-w-5xl w-full flex items-center justify-between mb-10 print:hidden">
         <button
          onClick={() => navigate("/buyer-dashboard/orders")}
          className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <FaArrowLeft size={10} />
          </div>
          Back to Records
        </button>
        <div className="flex gap-4">
           <button 
             onClick={handlePrint}
             className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-xs font-bold hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all active:scale-95"
           >
              <FaPrint className="text-slate-400" /> Print Copy
           </button>
           <button 
             onClick={handleDownload}
             className="bg-blue-600 text-white px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 flex items-center gap-2 shadow-xl shadow-blue-200 transition-all active:scale-95"
           >
              <FaCloudDownloadAlt className="text-blue-200" /> Download PDF
           </button>
        </div>
      </div>

      {/* Invoice Container */}
      <div 
        ref={invoiceRef}
        className="max-w-5xl w-full bg-white shadow-2xl shadow-slate-200/60 rounded-[3rem] overflow-hidden border border-slate-100 p-10 md:p-20 print:shadow-none print:border-none print:m-0 min-h-[1100px] relative"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b-[6px] border-blue-600 pb-12 mb-16 px-4">
           <div className="space-y-6">
              <div className="flex items-center gap-4 relative">
                 <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-100">
                   I
                 </div>
                 <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase whitespace-nowrap">
                   Inventa <span className="text-blue-600">B2B</span>
                 </h1>
                 {/* Professional Watermark Badge */}
                 <div className="absolute -right-24 top-0 border-2 border-emerald-500/30 text-emerald-500/40 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-[0.3em] rotate-12 pointer-events-none select-none">
                    Verified Trade
                 </div>
              </div>
              <div className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.1em] space-y-1 ml-2">
                 <p className="text-slate-900">INVENTA SOLUTIONS PVT LTD</p>
                 <p>Industrial Estate, Sector 4, Hyderabad, 500081</p>
                 <p>GSTIN: 36AAAAA0000A1Z5</p>
              </div>
           </div>
           <div className="text-left md:text-right mt-10 md:mt-0 flex flex-col justify-between h-full py-2">
              <div className="space-y-2">
                 <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-1">Invoice</h2>
                 <p className="text-3xl font-black text-slate-900 leading-none">#{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <div className="mt-8 space-y-2 text-xs font-black text-slate-500">
                 <p className="flex md:justify-end gap-2 text-[10px] uppercase tracking-widest">Order Date: <span className="text-slate-900">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
                 <p className="flex md:justify-end gap-2 text-[10px] uppercase tracking-widest">Due Date: <span className="text-slate-900">{new Date(new Date(order.createdAt).getTime() + 30*24*60*60*1000).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
                 <div className="mt-4 flex md:justify-end">
                    <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em]">
                      Payment terms: 30 days
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* Parties Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-16 px-4">
           <div>
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <FaUser size={10} /> Bill To
              </h3>
              <div className="text-sm">
                 <p className="font-black text-gray-900 text-lg mb-2">Buyer</p>
                 <div className="text-gray-500 font-medium leading-relaxed">
                    <p>{order.shippingAddress}</p>
                    <p>Contact: +91 98765 43210</p>
                    <p className="mt-1">Buyer ID: {order.userId.slice(-6).toUpperCase()}</p>
                 </div>
              </div>
           </div>
           <div className="text-left md:text-right">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2 justify-start md:justify-end">
                 <FaBuilding size={10} /> Seller
              </h3>
              <div className="text-sm">
                 <p className="font-black text-gray-900 text-lg mb-2">{order.items[0]?.supplier || 'Verified Supplier'}</p>
                 <div className="text-gray-500 font-medium leading-relaxed">
                    <p>B2B Marketplace Hub</p>
                    <p>Commercial Hub, Plot 22, Mumbai</p>
                    <p className="mt-1">Supplier Code: {order.items[0]?.supplierId || 'SUP-001'}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Items Table */}
        <div className="mb-16">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-y border-gray-100">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4 text-center">Quantity</th>
                    <th className="px-6 py-4 text-right">Unit Price</th>
                    <th className="px-6 py-4 text-right">Total</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {order.items.map((item, i) => (
                    <tr key={i} className="text-sm">
                       <td className="px-6 py-6">
                          <p className="font-black text-gray-800">{item.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium mt-1">HSN: 190410 • SKU: B2B-{item.productId?.slice(-4).toUpperCase()}</p>
                       </td>
                       <td className="px-6 py-6 text-center font-bold text-gray-700">{item.quantity}</td>
                       <td className="px-6 py-6 text-right font-medium text-gray-500">₹{item.price.toLocaleString("en-IN")}</td>
                       <td className="px-6 py-6 text-right font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* Summary Details */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 px-4">
           <div className="max-w-sm">
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner">
                 <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FaFileInvoiceDollar /> Note
                 </h4>
                 <p className="text-[11px] text-slate-500 leading-relaxed font-bold uppercase tracking-wide opacity-80">
                   This is a computer generated invoice. No signature is required.
                 </p>
              </div>
           </div>
           <div className="w-full md:w-96 space-y-5">
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Subtotal (Taxable)</span>
                 <span className="text-slate-700 font-black tracking-tight text-lg">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">CGST + SGST (5%)</span>
                 <span className="text-slate-700 font-black tracking-tight text-lg">+ ₹{gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center pt-8 border-t-[3px] border-slate-900">
                 <span className="text-slate-900 font-black uppercase tracking-widest text-xs">Total Amount Payable</span>
                 <div className="text-right">
                    <p className="text-5xl font-black text-blue-600 tracking-tighter mb-1">₹{total.toLocaleString("en-IN")}</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Currency: INR</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-12 opacity-60">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 border-4 border-slate-200 rounded-2xl flex items-center justify-center text-lg font-black text-slate-300">
                ✔️
              </div>
              <div>
                 <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Verified</p>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">by Inventa Hub</p>
              </div>
           </div>
           <div className="text-center md:text-right">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Signature</p>
              <div className="w-48 h-10 border-b-2 border-slate-200 ml-auto bg-slate-50/50 mb-2 rounded-t-xl"></div>
           </div>
        </div>
      </div>
    </div>
  );
}