// import { useState } from "react";

// export default function OrdersPage() {

//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const orders = [
//     {
//       id: "#1021",
//       buyer: "XYZ Shop",
//       products: "Rice Bags",
//       total: 2400,
//       status: "Pending",
//       address: "Door 12-3, MG Road, Vijayawada, Andhra Pradesh"
//     },
//     {
//       id: "#1022",
//       buyer: "ABC Mart",
//       products: "Oil Bottles",
//       total: 800,
//       status: "Shipped",
//       address: "45 Market Street, Guntur, Andhra Pradesh"
//     },
//   ];

//   return (
//     <div className="p-8 bg-[#f8fafc] min-h-screen">

//       <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
//         Orders Dashboard
//       </h2>

//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

//         <table className="w-full">
//           <thead>
//             <tr className="bg-blue-600 text-white">
//               <th className="p-4">Order ID</th>
//               <th className="p-4">Buyer</th>
//               <th className="p-4">Products</th>
//               <th className="p-4">Total</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Address</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((o, i) => (
//               <tr key={i} className="text-center hover:bg-blue-50 transition">

//                 <td className="p-4 font-semibold text-gray-700">{o.id}</td>

//                 <td className="p-4 font-medium text-purple-600">
//                   {o.buyer}
//                 </td>

//                 <td className="p-4 text-gray-600">{o.products}</td>

//                 <td className="p-4 text-green-600 font-bold">
//                   ₹{o.total}
//                 </td>

//                 <td className="p-4">
//                   {o.status === "Pending" && (
//                     <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
//                       ⏳ Pending
//                     </span>
//                   )}

//                   {o.status === "Shipped" && (
//                     <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
//                       🚚 Shipped
//                     </span>
//                   )}
//                 </td>

//                 <td className="p-4">
//                   <button
//                     onClick={() => setSelectedAddress(o.address)}
//                     className="text-blue-600 font-semibold hover:text-purple-600"
//                   >
//                     View 📍
//                   </button>
//                 </td>

//                 <td className="p-4 space-x-2">

//                   <button className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 transition">
//                     ✔ Accept
//                   </button>

//                   <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition">
//                     ✖ Reject
//                   </button>

//                   <button className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-purple-600 transition">
//                     ✏ Update
//                   </button>

//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </div>

//       {/* Address Modal */}

//       {selectedAddress && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

//           <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">

//             <h3 className="text-2xl font-bold mb-4 text-purple-600">
//               📍 Buyer Address
//             </h3>

//             <p className="text-gray-600 mb-6">
//               {selectedAddress}
//             </p>

//             <button
//               onClick={() => setSelectedAddress(null)}
//               className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg hover:opacity-90"
//             >
//               Close
//             </button>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }
import { useState } from "react";

export default function OrdersPage() {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const orders = [
    {
      id: "#1021",
      buyer: "XYZ Shop",
      products: "Rice Bags",
      total: 2400,
      status: "Pending",
      address: "Door 12-3, MG Road, Vijayawada, Andhra Pradesh",
    },
    {
      id: "#1022",
      buyer: "ABC Mart",
      products: "Oil Bottles",
      total: 800,
      status: "Shipped",
      address: "45 Market Street, Guntur, Andhra Pradesh",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold p-6 border-b border-gray-700">
            InventaB2B
          </h1>
          <nav className="flex flex-col space-y-2 p-4">
            <a href="#" className="p-2 rounded hover:bg-gray-800">
              Home
            </a>
            <a href="#" className="p-2 rounded hover:bg-gray-800">
              Shop
            </a>
            <a href="#" className="p-2 rounded hover:bg-gray-800">
              Orders
            </a>
            <a href="#" className="p-2 rounded hover:bg-gray-800">
              Invoices
            </a>
            <a href="#" className="p-2 rounded hover:bg-gray-800">
              Reports
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <p className="font-semibold">John Doe</p>
          <p className="text-sm text-gray-400">Business Account</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Orders Dashboard
        </h2>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4">Order ID</th>
                <th className="p-4">Buyer</th>
                <th className="p-4">Products</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Address</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o, i) => (
                <tr
                  key={i}
                  className="text-center hover:bg-blue-50 transition"
                >
                  <td className="p-4 font-semibold text-gray-700">{o.id}</td>
                  <td className="p-4 font-medium text-purple-600">{o.buyer}</td>
                  <td className="p-4 text-gray-600">{o.products}</td>
                  <td className="p-4 text-green-600 font-bold">₹{o.total}</td>
                  <td className="p-4">
                    {o.status === "Pending" && (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                        ⏳ Pending
                      </span>
                    )}
                    {o.status === "Shipped" && (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                        🚚 Shipped
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedAddress(o.address)}
                      className="text-blue-600 font-semibold hover:text-purple-600"
                    >
                      View 📍
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Address Modal */}
        {selectedAddress && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">
                📍 Buyer Address
              </h3>
              <p className="text-gray-600 mb-6">{selectedAddress}</p>
              <button
                onClick={() => setSelectedAddress(null)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}