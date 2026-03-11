
import { FaEdit, FaPlus } from "react-icons/fa";

export default function ProductForm({
  newProduct,
  setNewProduct,
  editingProduct,
  handleAddProduct,
  handleUpdateProduct,
}) {
  return (
    <div className="flex gap-2">

      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value })
        }
        className="px-2 py-1 border rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
        className="px-2 py-1 border rounded"
      />

      <input
        type="number"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={(e) =>
          setNewProduct({ ...newProduct, stock: e.target.value })
        }
        className="px-2 py-1 border rounded"
      />

      {editingProduct ? (
        <button
          onClick={handleUpdateProduct}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaEdit /> Update
        </button>
      ) : (
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add
        </button>
      )}
    </div>
  );
}