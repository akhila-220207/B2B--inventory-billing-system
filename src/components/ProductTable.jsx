import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProductTable({ products, handleEditProduct, handleDeleteProduct }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-blue-50 transition duration-300">
              <td className="p-4 font-semibold text-gray-700">📦 {p.name}</td>
              <td className="p-4 text-blue-600 font-bold">₹{p.price}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    p.stock < 60 ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
                  }`}
                >
                  {p.stock} units
                </span>
              </td>
              <td className="p-4 space-x-3">
                <button
                  onClick={() => handleEditProduct(p.id)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}