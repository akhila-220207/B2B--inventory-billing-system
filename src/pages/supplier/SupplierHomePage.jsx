import { FaShoppingCart, FaBox, FaUsers, FaRupeeSign } from "react-icons/fa";

export default function SupplierHomePage() {
  // Mock data - replace with actual data from API/context
  const stats = [
    {
      title: "Total Products",
      value: "24",
      icon: FaBox,
      color: "bg-blue-500",
      change: "+12%",
      changeColor: "text-green-600"
    },
    {
      title: "Total Orders",
      value: "156",
      icon: FaShoppingCart,
      color: "bg-green-500",
      change: "+8%",
      changeColor: "text-green-600"
    },
    {
      title: "Revenue",
      value: "₹2,45,000",
      icon: FaRupeeSign,
      color: "bg-purple-500",
      change: "+15%",
      changeColor: "text-green-600"
    },
    {
      title: "Active Buyers",
      value: "89",
      icon: FaUsers,
      color: "bg-orange-500",
      change: "+5%",
      changeColor: "text-green-600"
    }
  ];

  const recentOrders = [
    { id: "#2281", buyer: "ABC Corp", amount: "₹12,000", status: "Pending", date: "2024-01-15" },
    { id: "#2280", buyer: "XYZ Ltd", amount: "₹8,500", status: "Completed", date: "2024-01-14" },
    { id: "#2279", buyer: "DEF Industries", amount: "₹15,200", status: "Processing", date: "2024-01-13" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-black mb-2">Welcome back, Supplier!</h1>
        <p className="text-blue-100 text-lg">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">{stat.title}</p>
                <p className="text-3xl font-black text-gray-800">{stat.value}</p>
                <p className={`text-sm font-semibold ${stat.changeColor}`}>{stat.change} from last month</p>
              </div>
              <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Buyer</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-800">{order.id}</td>
                  <td className="p-4 text-gray-700">{order.buyer}</td>
                  <td className="p-4 font-bold text-green-600">{order.amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}