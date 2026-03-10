import { Link } from "react-router-dom";
import rice from "../ricebag.jpg";
import oil from "../cookingoil.jpg";
import soap from "../soap.jpg";

export default function MarketplacePage() {

  const products = [
    {
      id: 1,
      name: "Rice Bag",
      price: 1200,
      supplier: "ABC Traders",
      supplierId: 1,
      stock: "Available",
      category: "Groceries",
      image: rice
    },
    {
      id: 2,
      name: "Cooking Oil",
      price: 200,
      supplier: "XYZ Suppliers",
      supplierId: 2,
      stock: "Available",
      category: "Groceries",
      image: oil
    },
    {
      id: 3,
      name: "Soap",
      price: 40,
      supplier: "ABC Traders",
      supplierId: 1,
      stock: "Low Stock",
      category: "Household",
      image: soap
    }
  ];

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">Marketplace</h2>

      {/* Filters */}

      <div className="flex flex-wrap gap-4 mb-6">

        <input
          type="text"
          placeholder="Search products..."
          className="border px-3 py-2 rounded flex-1 min-w-64"
        />

        <select className="border px-3 py-2 rounded min-w-32">
          <option>All Categories</option>
          <option>Groceries</option>
          <option>Household</option>
        </select>

        <select className="border px-3 py-2 rounded min-w-32">
          <option>All Suppliers</option>
          <option>ABC Traders</option>
          <option>XYZ Suppliers</option>
        </select>

        <select className="border px-3 py-2 rounded min-w-32">
          <option>Price: All</option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>

        <select className="border px-3 py-2 rounded min-w-32">
          <option>Stock: All</option>
          <option>Available</option>
          <option>Low Stock</option>
        </select>

      </div>

      {/* Product Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {products.map((p) => (

          <div
            key={p.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >

            <img
              src={p.image}
              alt={p.name}
              className="h-32 w-full object-cover mb-4 rounded"
            />

            <Link
              to={`/product/${p.id}`}
              className="text-lg font-semibold hover:text-blue-600 block"
            >
              {p.name}
            </Link>

            <p>Price: ₹{p.price}</p>

            <Link
              to={`/supplier-profile/${p.supplierId}`}
              className="text-blue-600 hover:underline block"
            >
              Supplier: {p.supplier}
            </Link>

            <p>Stock: {p.stock}</p>

            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}