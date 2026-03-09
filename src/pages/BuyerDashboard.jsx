// 
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaShoppingCart,
  FaFileInvoice,
  FaChartBar,
  FaCog,
  FaStore,
  FaClipboardList,
  FaHome
} from "react-icons/fa";
import { useState } from "react";
import Notifications from "../components/Notifications";

export default function BuyerDashboard() {

  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const cartItems = 3; // example
  const notificationCount = 2; 

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-600 text-white" : "hover:text-blue-200";

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">

        <div className="p-6 text-2xl font-bold border-b border-blue-600">
          Inventa
        </div>

        <nav className="flex-1 p-4 space-y-3">

          <Link
            to="/buyer-dashboard"
            className={`flex items-center space-x-2 p-2 rounded ${isActive("/buyer-dashboard")}`}
          >
            <FaHome />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/buyer-dashboard/marketplace"
            className={`flex items-center space-x-2 p-2 rounded ${isActive("/buyer-dashboard/marketplace")}`}
          >
            <FaStore />
            <span>Marketplace</span>
          </Link>

          <Link
            to="/buyer-dashboard/orders"
            className={`flex items-center space-x-2 p-2 rounded ${isActive("/buyer-dashboard/orders")}`}
          >
            <FaClipboardList />
            <span>Orders</span>
          </Link>

          <Link
            to="/buyer-dashboard/cart"
            className={`flex items-center space-x-2 p-2 rounded ${isActive("/buyer-dashboard/cart")}`}
          >
            <FaShoppingCart />
            <span>Cart</span>

            {cartItems > 0 && (
              <span className="ml-auto bg-red-500 text-xs px-2 py-1 rounded-full">
                {cartItems}
              </span>
            )}
          </Link>

          <Link
            to="/buyer-dashboard/invoices"
            className={`flex items-center space-x-2 p-2 rounded ${isActive("/buyer-dashboard/invoices")}`}
          >
            <FaFileInvoice />
            <span>Invoices</span>
          </Link>

          <Link
            to="/buyer-dashboard/reports"
            className={`flex items-center space-x-2 p-2 rounded ${isActive("/buyer-dashboard/reports")}`}
          >
            <FaChartBar />
            <span>Reports</span>
          </Link>

          <Link
            to="/buyer-dashboard/settings"
            className={`flex items-center space-x-2 p-2 rounded ${isActive("/buyer-dashboard/settings")}`}
          >
            <FaCog />
            <span>Settings</span>
          </Link>

        </nav>

      </aside>


      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 sticky top-0 z-10">

          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="ml-2 bg-transparent outline-none w-full"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">

            {/* Notifications */}
            <div className="relative">

              <FaBell
                className="text-gray-600 cursor-pointer hover:text-blue-600"
                onClick={() => setShowNotifications(!showNotifications)}
              />

              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {notificationCount}
                </span>
              )}

              <Notifications
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />

            </div>

            {/* Profile */}
            <FaUserCircle
              className="text-gray-600 cursor-pointer hover:text-blue-600"
              size={28}
            />

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>

          </div>

        </header>

        {/* Nested Routes */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>

      </div>

    </div>
  );
}