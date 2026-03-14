//this is billing page
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function BillingPage() {
  const handleDownloadPDF = () => {
    const element = document.getElementById('invoice');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('invoice.pdf');
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

      {/* Invoice Card */}
      <div id="invoice" className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

        {/* Invoice Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Invoice</h3>
            <p className="text-sm opacity-90">Invoice #INV1023</p>
          </div>

          <div className="text-right">
            <p className="font-semibold">ABC Traders</p>
            <p className="text-sm">Supplier</p>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-6">

          <div className="flex justify-between mb-6">
            <div>
              <p className="text-gray-600">Supplier</p>
              <p className="font-semibold text-lg">ABC Traders</p>
            </div>

            <div>
              <p className="text-gray-600">Buyer</p>
              <p className="font-semibold text-lg">XYZ Store</p>
            </div>
          </div>

          {/* Product Table */}
          <table className="w-full rounded-lg overflow-hidden">

            <thead className="bg-blue-50 text-blue-700">
              <tr>
                <th className="p-3 text-left font-semibold">Product</th>
                <th className="p-3 text-left font-semibold">Qty</th>
                <th className="p-3 text-left font-semibold">Price</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b hover:bg-blue-50 transition">
                <td className="p-3 font-medium">📦 Rice Bags</td>
                <td className="p-3">2</td>
                <td className="p-3 text-blue-600 font-semibold">₹2400</td>
              </tr>

              <tr className="border-b hover:bg-blue-50 transition">
                <td className="p-3 font-medium">🛢 Oil Bottle</td>
                <td className="p-3">1</td>
                <td className="p-3 text-blue-600 font-semibold">₹200</td>
              </tr>

            </tbody>

          </table>

          {/* Billing Summary */}
          <div className="mt-6 space-y-2 text-right">

            <p className="text-gray-600">
              GST: <span className="font-semibold text-orange-600">₹120</span>
            </p>

            <p className="text-xl font-bold text-green-600">
              Total: ₹2720
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
    </div>
  );
}