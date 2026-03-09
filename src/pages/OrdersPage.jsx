// import { Link } from "react-router-dom";

// export default function OrdersPage() {
//   const orders = [
//     { id: "1023", supplier: "ABC Traders", products: "Rice, Oil", total: 2720, status: "Shipped" },
//   ];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Orders</h2>
//       {orders.map((o, i) => (
//         <div key={i} className="bg-white p-4 rounded shadow mb-4">
//           <p><strong>Order ID:</strong> #{o.id}</p>
//           <p><strong>Supplier:</strong> {o.supplier}</p>
//           <p><strong>Products:</strong> {o.products}</p>
//           <p><strong>Total:</strong> ₹{o.total}</p>
//           <p><strong>Status:</strong> {o.status}</p>
//           <Link to={`/order-tracking/${o.id}`} className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             Track Order
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function OrdersPage() {

  const orders = [
    {
      id: "1023",
      supplier: "ABC Traders",
      products: "Rice, Oil",
      total: 2720,
      status: "Shipped"
    },
    {
      id: "1024",
      supplier: "XYZ Suppliers",
      products: "Soap",
      total: 400,
      status: "Processing"
    },
    {
      id: "1025",
      supplier: "Fresh Foods",
      products: "Rice Bag",
      total: 1200,
      status: "Delivered"
    }
  ];

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-700";
    if (status === "Shipped") return "bg-blue-100 text-blue-700";
    if (status === "Processing") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="grid gap-6">

        {orders.map((o, i) => (

          <div
            key={i}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center mb-3">

              <h3 className="font-semibold text-lg">
                Order ID: #{o.id}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(o.status)}`}
              >
                {o.status}
              </span>

            </div>

            <p className="text-gray-700">
              <strong>Supplier:</strong> {o.supplier}
            </p>

            <p className="text-gray-700">
              <strong>Products:</strong> {o.products}
            </p>

            <p className="text-gray-700">
              <strong>Total:</strong> ₹{o.total}
            </p>

            <Link
              to={`/order-tracking/${o.id}`}
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Track Order
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}