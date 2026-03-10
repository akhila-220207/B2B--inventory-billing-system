import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaSearch,
  FaFilter,
  FaShoppingCart,
  FaStar,
  FaBox,
  FaTimes,
  FaCheckCircle,
  FaBolt,
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

// Stock badge styles
function StockBadge({ stock }) {
  const styles = {
    Available: "bg-green-100 text-green-700 border border-green-200",
    "Low Stock": "bg-orange-100 text-orange-700 border border-orange-200",
    "Out of Stock": "bg-red-100 text-red-700 border border-red-200",
  };
  const dots = {
    Available: "bg-green-500",
    "Low Stock": "bg-orange-500",
    "Out of Stock": "bg-red-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${styles[stock] || styles.Available}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[stock] || dots.Available}`}></span>
      {stock}
    </span>
  );
}

// Toast notification
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
        animation: "slideUp 0.3s ease",
      }}
      className="flex items-center gap-3 bg-white border border-green-200 shadow-2xl rounded-xl px-5 py-4 min-w-64"
    >
      <div className="flex items-center justify-center w-9 h-9 bg-green-100 rounded-full">
        <FaCheckCircle className="text-green-600 text-lg" />
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{message}</p>
        <p className="text-xs text-gray-500">Item added to your cart</p>
      </div>
      <button
        onClick={onClose}
        className="ml-auto text-gray-400 hover:text-gray-600 transition"
      >
        <FaTimes />
      </button>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Stars display
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          className={s <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}
          size={11}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

// Product card
function ProductCard({ product, onAddToCart, onOrderNow }) {
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const isOutOfStock = product.stock === "Out of Stock";

  const handleQtyChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setQty("");
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num) && num >= 1) setQty(num);
  };

  const handleAdd = async () => {
    const finalQty = qty === "" ? 1 : parseInt(qty);
    if (isNaN(finalQty) || finalQty < 1) return;
    setIsAdding(true);
    await onAddToCart(product, finalQty);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleOrder = () => {
    const finalQty = qty === "" ? 1 : parseInt(qty);
    if (isNaN(finalQty) || finalQty < 1) return;
    onOrderNow(product, finalQty);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 group">
      {/* Product Image */}
      <div className="relative h-44 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.category)}`;
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Product Name */}
        <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Supplier Name */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <FaBox className="text-blue-600" size={9} />
          </div>
          <span className="text-xs text-blue-700 font-medium truncate">
            {product.supplier}
          </span>
        </div>

        {/* Star Rating */}
        <StarRating rating={product.rating} />

        {/* Stock Badge */}
        <div>
          <StockBadge stock={product.stock} />
        </div>

        {/* Price & Unit */}
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-xl font-extrabold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-400">/ {product.unit}</span>
        </div>

        {/* Min Order */}
        {product.minOrderQty > 1 && (
          <p className="text-xs text-gray-400">
            Min. order: {product.minOrderQty} {product.unit}s
          </p>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mt-2">
          <label className="text-xs font-semibold text-gray-600 whitespace-nowrap">
            Qty:
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-1">
            <select
              value={typeof qty === "number" && qty <= 10 ? qty : "custom"}
              onChange={(e) => {
                if (e.target.value !== "custom") setQty(parseInt(e.target.value));
              }}
              disabled={isOutOfStock}
              className="bg-gray-50 border-r border-gray-200 text-sm text-gray-700 py-1.5 pl-2 pr-1 outline-none disabled:opacity-50 flex-shrink-0"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
              {typeof qty === "number" && qty > 10 && (
                <option value="custom">{qty}</option>
              )}
            </select>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={handleQtyChange}
              disabled={isOutOfStock}
              placeholder="or type"
              className="w-full text-sm text-gray-700 py-1.5 px-2 outline-none disabled:opacity-50 bg-white"
            />
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          disabled={isOutOfStock || isAdding}
          className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
            ${isOutOfStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isAdding
              ? "bg-green-500 text-white scale-95"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm hover:shadow-md"
            }`}
        >
          {isAdding ? (
            <>
              <FaCheckCircle className="text-white" />
              Added!
            </>
          ) : (
            <>
              <FaShoppingCart />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </>
          )}
        </button>

        {/* Order Now Button */}
        {!isOutOfStock && (
          <button
            onClick={handleOrder}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white shadow-sm hover:shadow-md"
          >
            <FaBolt />
            Order Now
          </button>
        )}
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const { addToCart, clearCart, cartCount } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSupplier, setSelectedSupplier] = useState("All Suppliers");
  const [selectedStock, setSelectedStock] = useState("All");
  const [sortPrice, setSortPrice] = useState("Default");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Read search param from URL on mount
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearch(urlSearch);
    }
  }, [searchParams]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setAllProducts(data.products);
        setCategories(data.categories || []);
        setSuppliers(data.suppliers || []);
      } catch (err) {
        setError("Could not load products. Please make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters client-side
  const applyFilters = useCallback(() => {
    let result = [...allProducts];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.supplier.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "All Categories") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSupplier !== "All Suppliers") {
      result = result.filter((p) => p.supplier === selectedSupplier);
    }

    if (selectedStock !== "All") {
      result = result.filter((p) => p.stock === selectedStock);
    }

    if (priceMin !== "" && !isNaN(Number(priceMin))) {
      result = result.filter((p) => p.price >= Number(priceMin));
    }
    if (priceMax !== "" && !isNaN(Number(priceMax))) {
      result = result.filter((p) => p.price <= Number(priceMax));
    }

    if (sortPrice === "Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortPrice === "Highest Rated") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [allProducts, search, selectedCategory, selectedSupplier, selectedStock, sortPrice, priceMin, priceMax]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);
  const handleAddToCart = useCallback(
    (product, qty) => {
      addToCart(product, qty);
      setToast(`${product.name} added to cart!`);
    },
    [addToCart]
  );

  const handleOrderNow = useCallback(
    async (product, qty) => {
      await clearCart();
      await addToCart(product, qty);
      navigate("/buyer-dashboard/checkout");
    },
    [clearCart, addToCart, navigate]
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All Categories");
    setSelectedSupplier("All Suppliers");
    setSelectedStock("All");
    setSortPrice("Default");
    setPriceMin("");
    setPriceMax("");
  };

  const hasActiveFilters =
    search ||
    selectedCategory !== "All Categories" ||
    selectedSupplier !== "All Suppliers" ||
    selectedStock !== "All" ||
    sortPrice !== "Default" ||
    priceMin !== "" ||
    priceMax !== "";

  const selectClass =
    "border border-gray-200 bg-white text-gray-700 text-sm px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
           <h2 className="text-2xl font-extrabold text-gray-800">Shop</h2>
           <p className="text-sm text-gray-500 mt-0.5">
              Find and buy products from our verified sellers
           </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl">
          <FaShoppingCart className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">
            {cartCount} item{cartCount !== 1 ? "s" : ""} in cart
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, suppliers, or categories..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <FaFilter className="text-blue-600 text-sm" />
          <span className="text-sm font-semibold text-gray-700">Filters</span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition"
            >
              <FaTimes size={10} /> Clear all
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={selectClass}
          >
            <option>All Categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Supplier */}
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className={selectClass}
          >
            <option>All Suppliers</option>
            {suppliers.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {/* Stock Status */}
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className={selectClass}
          >
            <option value="All">All Stock</option>
            <option>Available</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>

          {/* Price Sort */}
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className={selectClass}
          >
            <option value="Default">Sort: Default</option>
            <option value="Low to High">Price: Low to High</option>
            <option value="High to Low">Price: High to Low</option>
            <option value="Highest Rated">Highest Rated</option>
          </select>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="Min ₹"
              className="w-24 border border-gray-200 bg-white text-gray-700 text-sm px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <span className="text-gray-400 text-sm">–</span>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="Max ₹"
              className="w-24 border border-gray-200 bg-white text-gray-700 text-sm px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      {!loading && !error && (
        <p className="text-sm text-gray-500 mb-4">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {filteredProducts.length}
          </span>{" "}
          of <span className="font-semibold text-gray-800">{allProducts.length}</span> products
          {hasActiveFilters && (
            <span className="text-blue-600"> (filtered)</span>
          )}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Loading marketplace products...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 bg-red-50 rounded-2xl border border-red-100">
          <div className="text-4xl">⚠️</div>
          <p className="font-semibold text-red-700">Backend Connection Error</p>
          <p className="text-sm text-red-500 text-center max-w-md">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 text-sm font-medium transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="text-5xl">🔍</div>
              <p className="text-lg font-semibold text-gray-700">No products found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onOrderNow={handleOrderNow}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Toast */}
      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
}