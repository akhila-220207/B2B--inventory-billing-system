import { useParams } from "react-router-dom";
import { FaShoppingCart, FaStore, FaCheckCircle } from "react-icons/fa";

export default function ProductDetailsPage() {
  const { productId } = useParams(); // eslint-disable-line no-unused-vars

  // Mock product data
  const product = {
    name: "Rice Bag (25kg)",
    price: 1200,
    supplier: "ABC Traders",
    stock: "Available",
    description: "Premium quality basmati rice, perfect for households and restaurants. Long grain, aromatic, and nutritious.",
    image: "[Image Placeholder]",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
              <span className="text-gray-700">{product.image}</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-3xl font-bold text-green-600 mb-4">₹{product.price}</p>
            <div className="flex items-center space-x-2 mb-4">
              <FaStore className="text-blue-600" />
              <span>Supplier: {product.supplier}</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <FaCheckCircle className="text-green-600" />
              <span>Stock: {product.stock}</span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 flex items-center space-x-2">
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
