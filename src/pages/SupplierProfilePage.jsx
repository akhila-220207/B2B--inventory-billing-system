import { useParams } from "react-router-dom";
import { FaBuilding, FaPhone, FaMapMarkerAlt, FaStar } from "react-icons/fa";

export default function SupplierProfilePage() {
  const { supplierId } = useParams(); // eslint-disable-line no-unused-vars

  // Mock supplier data
  const supplier = {
    name: "ABC Traders",
    location: "Hyderabad",
    phone: "9876543210",
    email: "contact@abctraders.com",
    rating: 4.5,
    products: [
      { name: "Rice Bags", price: 1200, stock: 50 },
      { name: "Cooking Oil", price: 200, stock: 100 },
      { name: "Soap", price: 40, stock: 300 },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-4 mb-6">
          <FaBuilding className="text-3xl text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{supplier.name}</h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <FaMapMarkerAlt />
              <span>{supplier.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FaPhone />
              <span>{supplier.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-500" />
              <span>{supplier.rating} / 5</span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">Products Offered</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supplier.products.map((product, index) => (
            <div key={index} className="border p-4 rounded hover:shadow-lg transition">
              <h4 className="font-semibold">{product.name}</h4>
              <p>Price: ₹{product.price}</p>
              <p>Stock: {product.stock} available</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
