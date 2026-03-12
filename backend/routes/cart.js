const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');

// Middleware: Authenticate JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorize denied' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

// GET /api/cart — Get user's cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = { items: [] };
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/cart/add — Add item to cart
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId, name, price, supplier, supplierId, image, unit, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ productId, name, price, supplier, supplierId, image, unit, quantity: quantity || 1 });
    }

    await cart.save();
    res.json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error('Cart add error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/cart/update — Update item quantity
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.json({ message: 'Cart updated', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/cart/remove/:productId — Remove item from cart
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== req.params.productId
    );

    await cart.save();
    res.json({ message: 'Item removed', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/cart/clear — Clear entire cart
router.delete('/clear', authMiddleware, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
