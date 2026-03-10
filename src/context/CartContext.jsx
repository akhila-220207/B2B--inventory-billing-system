import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const API_BASE = "http://localhost:5000/api";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync with Backend
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
       // Fallback to local storage if not logged in
       const stored = localStorage.getItem("b2b_cart");
       if (stored) setCartItems(JSON.parse(stored));
       return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.items || []);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Persist to localStorage for guests
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("b2b_cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (product, qty = 1) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: product._id,
            name: product.name,
            price: product.price,
            supplier: product.supplier,
            image: product.image,
            unit: product.unit,
            quantity: qty
          })
        });
        if (res.ok) {
          const data = await res.json();
          setCartItems(data.cart.items);
        }
      } catch (err) {
        console.error("Cart add error:", err);
      }
    } else {
      setCartItems((prev) => {
        const existing = prev.find((item) => item._id === product._id);
        if (existing) {
          return prev.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        }
        return [...prev, { ...product, quantity: qty }];
      });
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/cart/remove/${productId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setCartItems(data.cart.items);
        }
      } catch (err) {
        console.error("Cart remove error:", err);
      }
    } else {
      setCartItems((prev) => prev.filter((item) => item._id !== productId));
    }
  };

  const updateQuantity = async (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/cart/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ productId, quantity: qty })
        });
        if (res.ok) {
          const data = await res.json();
          setCartItems(data.cart.items);
        }
      } catch (err) {
        console.error("Cart update error:", err);
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === productId ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch(`${API_BASE}/cart/clear`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems([]);
      } catch (err) {
        console.error("Cart clear error:", err);
      }
    } else {
      setCartItems([]);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
