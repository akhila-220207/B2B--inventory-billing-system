/*export default function InventoryPage() {
  const inventory = [
    { product: "Rice Bags", stock: 50, status: "Normal" },
    { product: "Oil Bottles", stock: 8, status: "Low Stock" },
    { product: "Soap", stock: 200, status: "Normal" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Inventory</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Available Stock</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, i) => (
            <tr key={i}>
              <td className="p-2 border">{item.product}</td>
              <td className="p-2 border">{item.stock}</td>
              <td className={`p-2 border ${item.status === "Low Stock" ? "text-red-600" : "text-green-600"}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}*/

export default function InventoryPage() {
  const inventory = [
    { product: "Rice Bags", stock: 50, status: "Normal" },
    { product: "Oil Bottles", stock: 8, status: "Low Stock" },
    { product: "Soap", stock: 200, status: "Normal" },
  ];

  return (
    <div className="min-h-screen p-8 bg-[#f8fafc]">

      {/* Title */}
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📦 Inventory Dashboard
      </h2>

      {/* Table Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

        <table className="w-full">

          {/* Table Header */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Available Stock</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {inventory.map((item, i) => (
              <tr
                key={i}
                className={`transition duration-300 hover:bg-blue-50 hover:scale-[1.01] ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4 font-semibold text-gray-700">
                  📦 {item.product}
                </td>

                <td className="p-4 text-blue-600 font-bold">
                  {item.stock}
                </td>

                <td className="p-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold shadow ${
                      item.status === "Low Stock"
                        ? "bg-red-200 text-red-700"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {item.status === "Low Stock" ? "⚠ Low Stock" : "✅ Normal"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}