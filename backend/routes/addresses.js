const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware: Authenticate JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' });
  }
  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET).user;
    next();
  } catch {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

// GET /api/addresses — Get all saved addresses for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('addresses');
    res.json(user?.addresses || []);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/addresses — Save a new address
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { label, address, pincode } = req.body;
    if (!address) return res.status(400).json({ message: 'Address is required' });

    const user = await User.findById(req.user.id);
    if (!user.addresses) user.addresses = [];

    const isFirst = user.addresses.length === 0;

    user.addresses.push({
      label: label || 'other',
      address,
      pincode: pincode || '',
      isDefault: isFirst // First address is default automatically
    });

    await user.save();
    res.status(201).json(user.addresses);
  } catch (err) {
    console.error('Save address error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PATCH /api/addresses/:id/default — Set an address as default
router.patch('/:id/default', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.addresses) return res.status(404).json({ message: 'No addresses found' });

    user.addresses.forEach(addr => {
      addr.isDefault = addr._id.toString() === req.params.id;
    });

    await user.save();
    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/addresses/:id — Remove a saved address
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.addresses) return res.status(404).json({ message: 'No addresses found' });

    const wasDefault = user.addresses.find(a => a._id.toString() === req.params.id)?.isDefault;
    user.addresses = user.addresses.filter(a => a._id.toString() !== req.params.id);

    // If deleted address was default, make the first remaining one default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
