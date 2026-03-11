// // import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// // export default function ProductsPage() {
// //   const products = [
// //     { name: "Rice Bags", price: 1200, stock: 50 },
// //     { name: "Cooking Oil", price: 200, stock: 100 },
// //     { name: "Soap", price: 40, stock: 300 },
// //   ];

// //   return (
// //     <div className="p-6 min-h-screen bg-[#f8fafc]">

// //       {/* Page Title */}
// //       <h2 className="text-3xl font-bold text-gray-800 mb-6">
// //         📦 Product Management
// //       </h2>

// //       {/* Search + Add */}
// //       <div className="flex justify-between items-center mb-6">

// //         <div className="flex items-center bg-white shadow rounded-lg px-3 py-2 w-72">
// //           <FaSearch className="text-gray-400 mr-2" />
// //           <input
// //             type="text"
// //             placeholder="Search product..."
// //             className="outline-none w-full"
// //           />
// //         </div>

// //         <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition font-semibold">
// //           <FaPlus />
// //           <span>Add Product</span>
// //         </button>

// //       </div>

// //       {/* Product Table */}
// //       <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

// //         <table className="w-full">

// //           <thead className="bg-blue-600 text-white">
// //             <tr>
// //               <th className="p-4 text-left">Product</th>
// //               <th className="p-4 text-left">Price</th>
// //               <th className="p-4 text-left">Stock</th>
// //               <th className="p-4 text-left">Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>

// //             {products.map((p, i) => (
// //               <tr
// //                 key={i}
// //                 className={`border-b hover:bg-blue-50 transition duration-300 ${
// //                   i % 2 === 0 ? "bg-gray-50" : "bg-white"
// //                 }`}
// //               >

// //                 <td className="p-4 font-semibold text-gray-700">
// //                   📦 {p.name}
// //                 </td>

// //                 <td className="p-4 text-blue-600 font-bold">
// //                   ₹{p.price}
// //                 </td>

// //                 <td className="p-4">
// //                   <span
// //                     className={`px-3 py-1 rounded-full text-sm font-semibold ${
// //                       p.stock < 60
// //                         ? "bg-red-200 text-red-700"
// //                         : "bg-green-200 text-green-700"
// //                     }`}
// //                   >
// //                     {p.stock} units
// //                   </span>
// //                 </td>

// //                 <td className="p-4 space-x-3">

// //                   <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
// //                     <FaEdit /> Edit
// //                   </button>

// //                   <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
// //                     <FaTrash /> Delete
// //                   </button>

// //                 </td>

// //               </tr>
// //             ))}

// //           </tbody>

// //         </table>

// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";


// import ProductTable from "../../components/ProductTable";
// import ProductForm from "../../components/ProductForm";
// import { productAPI } from "../../services/api";
// import { toast } from "react-toastify";

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
//   const [editingProduct, setEditingProduct] = useState(null);

//   // Fetch products on component mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await productAPI.getAll();
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add Product
//   const handleAddProduct = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.stock) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     try {
//       const response = await productAPI.create({
//         name: newProduct.name,
//         price: parseFloat(newProduct.price),
//         stock: parseInt(newProduct.stock),
//       });
//       setProducts([...products, response.data]);
//       setNewProduct({ name: "", price: "", stock: "" });
//       toast.success("Product added successfully");
//     } catch (error) {
//       console.error("Error adding product:", error);
//       toast.error("Failed to add product");
//     }
//   };

//   // Edit Product
//   const handleEditProduct = (id) => {
//     const product = products.find((p) => p.id === id);
//     setEditingProduct(product);
//     setNewProduct({ name: product.name, price: product.price, stock: product.stock });
//   };

//   const handleUpdateProduct = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.stock) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     try {
//       const response = await productAPI.update(editingProduct.id, {
//         name: newProduct.name,
//         price: parseFloat(newProduct.price),
//         stock: parseInt(newProduct.stock),
//       });
//       setProducts(products.map(p => p.id === editingProduct.id ? response.data : p));
//       setEditingProduct(null);
//       setNewProduct({ name: "", price: "", stock: "" });
//       toast.success("Product updated successfully");
//     } catch (error) {
//       console.error("Error updating product:", error);
//       toast.error("Failed to update product");
//     }
//   };

//   // Delete Product
//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await productAPI.delete(id);
//       setProducts(products.filter((p) => p.id !== id));
//       toast.success("Product deleted successfully");
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       toast.error("Failed to delete product");
//     }
//   };

//   // Filtered Products
//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 min-h-screen bg-[#f8fafc]">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">📦 Product Management</h2>

//       {/* Search + Form */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center bg-white shadow rounded-lg px-3 py-2 w-72">
//           <FaSearch className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search product..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="outline-none w-full"
//           />
//         </div>

//         <ProductForm
//           newProduct={newProduct}
//           setNewProduct={setNewProduct}
//           editingProduct={editingProduct}
//           handleAddProduct={handleAddProduct}
//           handleUpdateProduct={handleUpdateProduct}
//         />
//       </div>

//       {/* Product Table */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="text-gray-500">Loading products...</div>
//         </div>
//       ) : (
//         <ProductTable
//           products={filteredProducts}
//           handleEditProduct={handleEditProduct}
//           handleDeleteProduct={handleDeleteProduct}
//         />
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import ProductTable from "../../components/ProductTable";
import ProductForm from "../../components/ProductForm";
import { productAPI } from "../../services/api";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Add Product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await productAPI.create({
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      });

      setProducts((prev) => [...prev, response.data]);
      setNewProduct({ name: "", price: "", stock: "" });

      toast.success("Product added");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  // Edit
  const handleEditProduct = (id) => {
    const product = products.find((p) => p._id === id);
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  // Update
  const handleUpdateProduct = async () => {
    try {
      const response = await productAPI.update(editingProduct._id, newProduct);

      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? response.data : p))
      );

      setEditingProduct(null);
      setNewProduct({ name: "", price: "", stock: "" });

      toast.success("Product updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // Delete
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await productAPI.delete(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-[#f8fafc]">
      <h2 className="text-3xl font-bold mb-6">📦 Product Management</h2>

      <div className="flex justify-between items-center mb-6">

        {/* Search */}
        <div className="flex items-center bg-white shadow rounded-lg px-3 py-2 w-72">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full"
          />
        </div>

        {/* Form */}
        <ProductForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          editingProduct={editingProduct}
          handleAddProduct={handleAddProduct}
          handleUpdateProduct={handleUpdateProduct}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductTable
          products={filteredProducts}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
}