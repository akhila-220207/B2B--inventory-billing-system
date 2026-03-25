const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { sendOrderConfirmationEmail, sendSupplierOrderAlertEmail } = require('../utils/email');

// Middleware: Authenticate JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorize denied' });
  }
  try {
    const token = authHeader.split(' ')[1];
    if (!token || token === 'null' || token === 'undefined') {
      return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    res.status(401).json({ message: 'Token is invalid' });
  }
};

// POST /api/orders — Create a new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod, paymentStatus } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Verify all items are in stock and subtract stock
    for (const item of items) {
       const product = await Product.findById(item.productId || item._id);
       if (!product) {
          return res.status(404).json({ message: `Product ${item.name} not found` });
       }
       if (product.stockQty < item.quantity) {
          return res.status(400).json({ message: `Insufficient stock for ${item.name}. Only ${product.stockQty} left.` });
       }
       
       product.stockQty -= item.quantity;
       // Mark LOW STOCK string natively if it drops below threshold
       if (product.stockQty === 0) {
          product.stock = "Out of Stock";
       } else if (product.stockQty <= 15) {
          product.stock = "Low Stock";
       }
       
       await product.save();
    }

    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus
});

    const order = await newOrder.save();

    let notificationStatus = 'none';

    // Send Emails (Async — non-blocking)
    setImmediate(async () => {
      try {
        const buyer = await User.findById(req.user.id);
        const trackingUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/order-tracking/${order._id}`;

        // 1. Buyer order confirmation email
        if (buyer) {
          await sendOrderConfirmationEmail({
            to: buyer.email,
            buyerName: buyer.business,
            orderId: order._id,
            items,
            totalAmount,
            shippingAddress,
            trackingUrl
          });
        }

        // 2. Supplier alert emails — one per unique supplier
        const supplierIds = [...new Set(items.map(i => i.supplierId).filter(Boolean))];
        for (const supplierId of supplierIds) {
          const supplier = await User.findById(supplierId);
          if (supplier) {
            const supplierItems = items.filter(i => i.supplierId?.toString() === supplierId.toString());
            const supplierTotal = supplierItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
            await sendSupplierOrderAlertEmail({
              to: supplier.email,
              supplierName: supplier.business,
              orderId: order._id,
              buyerBusiness: buyer?.business || 'A buyer',
              items: supplierItems,
              totalAmount: supplierTotal
            });
          }
        }
      } catch (emailErr) {
        console.error('Silent Email Error:', emailErr.message);
      }
    });

    res.status(201).json({ ...order._doc, notificationStatus });

    // Automated Status Progression (Demo purposes)
    setTimeout(async () => {
      try {
        const orderToUpdate = await Order.findById(order._id);
        if (orderToUpdate && orderToUpdate.status === 'Processing') {
          orderToUpdate.status = 'Shipped';
          await orderToUpdate.save();

          setTimeout(async () => {
            try {
              const finalOrder = await Order.findById(order._id);
              if (finalOrder && finalOrder.status === 'Shipped') {
                finalOrder.status = 'Delivered';
                await finalOrder.save();
              }
            } catch (err) { }
          }, 15000); // Delivered after 15 seconds from Shipped
        }
      } catch (err) { }
    }, 15000); // Shipped after 15 seconds from Processing

  } catch (err) {
    console.error('Order creation error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/orders — Get all orders for the logged-in user or supplier
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'supplier') {
      query = { 'items.supplierId': req.user.id };
    } else {
      query = { userId: req.user.id };
    }

    let orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate('userId', 'business email')
      .lean();

    if (req.user.role === 'supplier') {
      orders = orders.map(order => {
        // Filter out items that do not belong to this supplier
        order.items = order.items.filter(item => String(item.supplierId) === String(req.user.id));
        // Recalculate totalAmount for this specific supplier
        order.totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return order;
      });
    }

    res.json(orders);
  } catch (err) {
    console.error('Fetch orders error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PATCH /api/orders/:id/cancel — Cancel an order
router.patch('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Safety check: Ensure the order belongs to the user
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if order is in a cancellable state
    if (order.status !== 'Processing') {
      return res.status(400).json({ message: `Order cannot be cancelled. Current status: ${order.status}` });
    }

    order.status = 'Cancelled';
    await order.save();
    res.json(order);
  } catch (err) {
    console.error('Order cancellation error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/orders/:id — Get specific order details
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Safety check commented out for diagnostic purposes
    // if (order.userId.toString() !== req.user.id) {
    //   return res.status(403).json({ message: 'Access denied' });
    // }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
