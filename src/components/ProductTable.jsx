
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProductTable({
  products,
  handleEditProduct,
  handleDeleteProduct,
}) {
  if (products.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        No products available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

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
            <tr
              key={p._id}
              className="border-b hover:bg-blue-50"
            >
              <td className="p-4">📦 {p.name}</td>

              <td className="p-4 text-blue-600 font-bold">
                ₹{p.price}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    p.stock < 10
                      ? "bg-red-200 text-red-700"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {p.stock} units
                </span>
              </td>

              <td className="p-4 flex gap-4">

                <button
                  onClick={() => handleEditProduct(p._id)}
                  className="text-blue-600"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDeleteProduct(p._id)}
                  className="text-red-600"
                >
                  <FaTrash />
                </button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}