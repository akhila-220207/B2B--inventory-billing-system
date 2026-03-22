//this is billing page
import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const API_BASE = "http://127.0.0.1:5000/api";

export default function BillingPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const supplierName = localStorage.getItem("userBusiness") || localStorage.getItem("userName") || "Supplier";

  // Fetch orders
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
          if (data.length > 0) {
            setSelectedOrder(data[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const handleDownloadPDF = () => {
    const element = document.getElementById('invoice');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const invoiceNum = selectedOrder._id.slice(-6).toUpperCase();
      pdf.save(`Invoice-${invoiceNum}.pdf`);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 min-h-screen bg-[#f8fafc]">

      {/* Page Title */}
      <h2 className="text-4xl font-bold text-blue-800 mb-6">
        🧾 Billing / Invoice
      </h2>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">Loading invoices...</p>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-600 text-lg">No orders found. Create an order to generate invoices.</p>
        </div>
      ) : (
        <>
          {/* Order Selection */}
          <div className="max-w-3xl mx-auto mb-6">
            <select
              value={selectedOrder?._id || ""}
              onChange={(e) => setSelectedOrder(orders.find(o => o._id === e.target.value))}
              className="w-full p-3 border-2 border-blue-300 rounded-lg bg-white font-semibold text-gray-800 focus:outline-none focus:border-blue-600"
            >
              {orders.map(order => (
                <option key={order._id} value={order._id}>
                  Order #{order._id.slice(-6).toUpperCase()} - {order.buyerName || "Unknown"} - ₹{order.totalAmount?.toLocaleString("en-IN") || 0}
                </option>
              ))}
            </select>
          </div>

          {/* Invoice Card */}
          {selectedOrder && (
            <div id="invoice" className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

              {/* Invoice Header */}
              <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Invoice</h3>
                  <p className="text-sm opacity-90">Invoice #{selectedOrder._id.slice(-6).toUpperCase()}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">{supplierName}</p>
                  <p className="text-sm">Supplier</p>
                </div>
              </div>

              {/* Invoice Body */}
              <div className="p-6">

                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-gray-600">Supplier</p>
                    <p className="font-semibold text-lg">{supplierName}</p>
                  </div>

                  <div>
                    <p className="text-gray-600">Buyer</p>
                    <p className="font-semibold text-lg">{selectedOrder.buyerName || "Customer"}</p>
                  </div>
                </div>

                {/* Invoice Metadata */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-gray-600">Order Date</p>
                    <p className="font-semibold">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Shipping Address</p>
                    <p className="font-semibold">{selectedOrder.shippingAddress || "N/A"}</p>
                  </div>
                </div>

                {/* Product Table */}
                <table className="w-full rounded-lg overflow-hidden">

                  <thead className="bg-blue-50 text-blue-700">
                    <tr>
                      <th className="p-3 text-left font-semibold">Product</th>
                      <th className="p-3 text-center font-semibold">Qty</th>
                      <th className="p-3 text-right font-semibold">Price</th>
                      <th className="p-3 text-right font-semibold">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, idx) => (
                        <tr key={idx} className="border-b hover:bg-blue-50 transition">
                          <td className="p-3 font-medium">📦 {item.name}</td>
                          <td className="p-3 text-center">{item.quantity || 0}</td>
                          <td className="p-3 text-right">₹{item.price?.toLocaleString("en-IN") || 0}</td>
                          <td className="p-3 text-right text-blue-600 font-semibold">
                            ₹{((item.price || 0) * (item.quantity || 0)).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-3 text-center text-gray-500">No items</td>
                      </tr>
                    )}
                  </tbody>

                </table>

                {/* Billing Summary */}
                <div className="mt-6 space-y-2 text-right">

                  <p className="text-gray-600">
                    Subtotal: <span className="font-semibold text-gray-800">₹{(selectedOrder.totalAmount * 0.9).toLocaleString("en-IN")}</span>
                  </p>

                  <p className="text-gray-600">
                    GST (approx 18%): <span className="font-semibold text-orange-600">₹{(selectedOrder.totalAmount * 0.1).toLocaleString("en-IN")}</span>
                  </p>

                  <p className="text-xl font-bold text-green-600">
                    Total: ₹{selectedOrder.totalAmount?.toLocaleString("en-IN") || 0}
                  </p>

                  <p className="text-sm text-gray-500 mt-4">
                    Status: <span className="font-semibold capitalize text-blue-600">{selectedOrder.status}</span>
                  </p>

                </div>

                {/* Buttons */}
                <div className="mt-6 flex space-x-4 justify-end">

                  <button onClick={handleDownloadPDF} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-300 hover:scale-105 transition font-semibold">
                    📥 Download PDF
                  </button>

                  <button onClick={handlePrint} className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition font-semibold">
                    🖨 Print Invoice
                  </button>

                </div>

              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
