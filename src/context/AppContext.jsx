import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AppContext = createContext();

const API_BASE = "http://localhost:5000/api";

// ── Helpers ──────────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem("token");

const getProfileFromStorage = () => ({
  business: localStorage.getItem("userBusiness") || "",
  email:    localStorage.getItem("userEmail")    || "",
  phone:    localStorage.getItem("userPhone")    || "",
  gst:      localStorage.getItem("userGst")      || "",
  pan:      localStorage.getItem("userPan")      || "",
  businessType: localStorage.getItem("userBusinessType") || "retail",
  address:  localStorage.getItem("userAddress")  || "",
  pincode:  localStorage.getItem("userPincode")  || "",
  website:  localStorage.getItem("userWebsite")  || "",
});

const deriveUserName = (profile) =>
  (profile.business && profile.business !== "undefined" && profile.business !== "")
    ? profile.business
    : (localStorage.getItem("userName") || "User");

const deriveStats = (orders) => {
  const totalSpent       = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const totalOrders      = orders.length;
  const activeOrders     = orders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled").length;
  const deliveredOrders  = orders.filter(o => o.status === "Delivered").length;
  const totalItems       = orders.reduce((s, o) =>
    s + (o.items || []).reduce((si, i) => si + (i.quantity || 0), 0), 0);
  return { totalSpent, totalOrders, activeOrders, deliveredOrders, totalItems };
};

// ── Provider ──────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {

  // ── Cart ──────────────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("cartItems") || "[]");
      // Migrate old cart data if present
      const migrated = parsed.map(item => {
        // Handle if productId is populated as an object instead of string
        if (item.productId && typeof item.productId === 'object') {
          return { ...item.productId, quantity: item.quantity || 1 };
        }
        // Handle if item itself is from an even older format
        if (item.product && typeof item.product === 'object') {
          return { ...item.product, quantity: item.quantity || 1 };
        }
        // Fill missing quantity with 1 just in case
        return { ...item, quantity: item.quantity || item.qty || 1 };
      }).filter(item => item._id || item.productId); // Drop entirely broken items
      return migrated;
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);
  const cartTotal = cartItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 0), 0);

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems(prev => {
      const id = product.productId || product._id;
      const existing = prev.find(i => (i.productId || i._id) === id);
      if (existing) {
        return prev.map(i =>
          (i.productId || i._id) === id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...product, productId: id, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(i => (i.productId || i._id) !== productId));
  }, []);

  const updateCartQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(i =>
        (i.productId || i._id) === productId ? { ...i, quantity: qty } : i
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  }, []);

  // ── Orders ────────────────────────────────────────────────────────────────
  const [orders, setOrders]             = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  const fetchOrders = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        setOrdersLoaded(true);
      }
    } catch (err) {
      console.error("fetchOrders error:", err);
    }
  }, []);

  const placeOrder = useCallback(async ({ shippingAddress }) => {
    const token = getToken();
    const subtotal = cartItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 0), 0);
    const gst   = Math.round(subtotal * 0.05);
    const total = subtotal + gst;

    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        items: cartItems.map(item => ({
          productId:  item.productId || item._id,
          name:       item.name || "Unknown Product",
          price:      item.price || 0,
          quantity:   item.quantity || 1,
          supplier:   item.supplier || "Unknown Supplier",
          supplierId: item.supplierId ? String(item.supplierId) : "unknown_supplier",
          image:      item.image || ""
        })),
        totalAmount:     total,
        shippingAddress
      })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Order failed");
    }

    const newOrder = await res.json();
    clearCart();
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [cartItems, clearCart]);

  const cancelOrder = useCallback(async (orderId) => {
    const token = getToken();
    const res = await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setOrders(prev =>
        prev.map(o => o._id === orderId ? { ...o, status: "Cancelled" } : o)
      );
    } else {
      const data = await res.json();
      throw new Error(data.message || "Cancel failed");
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    const token = getToken();
    if (!token) return;
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setOrders(prev =>
        prev.map(o => o._id === orderId ? { ...o, status } : o)
      );
    } else {
      const data = await res.json();
      throw new Error(data.message || "Update status failed");
    }
  }, []);

  // ── Profile / Settings ────────────────────────────────────────────────────
  const [profile, setProfile] = useState(getProfileFromStorage);
  const [userName, setUserName] = useState(() => deriveUserName(getProfileFromStorage()));

  const saveProfile = useCallback((newProfile) => {
    localStorage.setItem("userBusiness",    newProfile.business    || "");
    localStorage.setItem("userEmail",       newProfile.email       || "");
    localStorage.setItem("userPhone",       newProfile.phone       || "");
    localStorage.setItem("userGst",         newProfile.gst         || "");
    localStorage.setItem("userPan",         newProfile.pan         || "");
    localStorage.setItem("userBusinessType",newProfile.businessType|| "");
    localStorage.setItem("userAddress",     newProfile.address     || "");
    localStorage.setItem("userPincode",     newProfile.pincode     || "");
    localStorage.setItem("userWebsite",     newProfile.website     || "");
    if (newProfile.business) {
      localStorage.setItem("userName", newProfile.business);
    }
    setProfile(newProfile);
    setUserName(deriveUserName(newProfile));
  }, []);

  // ── Notifications ─────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(({ message, time, status = "success" }) => {
    setNotifications(prev => [
      { id: Date.now(), message, time: time || "Just now", status },
      ...prev
    ]);
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // ── Derived Stats (recomputed when orders change) ─────────────────────────
  const stats = deriveStats(orders);

  // ── Context Value ─────────────────────────────────────────────────────────
  const value = {
    // API
    API_BASE,
    // Cart
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    // Orders
    orders,
    ordersLoaded,
    fetchOrders,
    placeOrder,
    cancelOrder,
    updateOrderStatus,
    // Profile
    profile,
    userName,
    saveProfile,
    // Notifications
    notifications,
    addNotification,
    dismissNotification,
    // Stats
    stats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ── Hooks ─────────────────────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

// Backward-compat alias
export const useCart = useApp;
