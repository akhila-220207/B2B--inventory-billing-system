//his is supplier dashboard
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaBox,
  FaClipboardList,
  FaFileInvoice,
  FaChartBar,
  FaCog,
  FaHome,
  FaWarehouse,
  FaChevronLeft,
  FaChevronRight,
  FaThumbtack
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Notifications from "../../components/Notifications";

export default function SupplierDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPinned, setIsPinned] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimeoutRef = useRef(null);

  const userName = localStorage.getItem("userBusiness") || localStorage.getItem("userName") || "Supplier";
  const userInitial = userName.charAt(0).toUpperCase();

  const location = useLocation();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", time: "2 hours ago", status: "success" },
    { id: 2, message: "Low stock alert for 'Rice Bags'", time: "5 hours ago", status: "warning" },
  ]);

  const notificationCount = notifications.length;

  const isSidebarOpen = isPinned || isHovered;

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 800); // Auto-hide after 800ms
    } else {
      setIsHovered(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/supplier-dashboard/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600/10 text-blue-100 border-r-4 border-blue-400 font-bold"
      : "text-blue-200/60 hover:text-white hover:bg-white/5";

  const navItems = [
    { to: "/supplier-dashboard", icon: FaHome, label: "Home" },
    { to: "/supplier-dashboard/products", icon: FaBox, label: "Products" },
    { to: "/supplier-dashboard/inventory", icon: FaWarehouse, label: "Inventory" },
    { to: "/supplier-dashboard/orders", icon: FaClipboardList, label: "Orders" },
    { to: "/supplier-dashboard/billing", icon: FaFileInvoice, label: "Billing" },
    { to: "/supplier-dashboard/reports", icon: FaChartBar, label: "Reports" },
    { to: "/supplier-dashboard/settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] overflow-hidden">

      {/* Smart Trigger Zone (Invisible) */}
      {!isSidebarOpen && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          className="fixed left-0 top-0 w-4 h-full z-[100] cursor-e-resize"
        />
      )}

      {/* Sidebar Component */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 h-full bg-[#0f172a] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-[110] flex flex-col group
          ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0 md:w-20'}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-6 border-b border-white/5 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
              S
            </div>
            {isSidebarOpen && (
              <span className="text-xl font-black tracking-tighter text-white animate-in fade-in slide-in-from-left-4 duration-500">
                Supplier<span className="text-blue-500">Panel</span>
              </span>
            )}
          </div>

          {/* Pin Toggle */}
          <button
            onClick={() => setIsPinned(!isPinned)}
            className={`absolute -right-3 top-7 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-90 z-20
              ${!isSidebarOpen && 'hidden'}
            `}
          >
            <FaThumbtack size={10} className={isPinned ? 'rotate-45' : 'rotate-0'} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-10 px-4 space-y-2 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 relative group/item
                ${isActive(item.to)}
              `}
            >
              <item.icon className={`text-xl shrink-0 ${location.pathname === item.to ? 'text-blue-400' : ''}`} />

              {isSidebarOpen && (
                <div className="flex flex-1 items-center justify-between whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-sm tracking-wide">{item.label}</span>
                </div>
              )}

              {/* Tooltip for collapsed mode */}
              {!isSidebarOpen && (
                <div className="absolute left-16 bg-slate-900 border border-white/10 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-[120] pointer-events-none">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-6 border-t border-white/5 transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>
          <div className="bg-white/5 p-4 rounded-2xl space-y-3">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                   <FaUserCircle className="text-blue-400" />
                </div>
                <div className="min-w-0">
                   <p className="text-xs font-black text-white truncate">{userName}</p>
                   <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Supplier Account</p>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isPinned ? 'md:pl-72' : 'md:pl-20'}
      `}>
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-5 sticky top-0 z-[100]">

          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search products (press Enter)..."
              className="ml-2 bg-transparent outline-none w-full text-sm"
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
                notifications={notifications}
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
