const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  unit: {
    type: String,
    default: 'piece'
  },
  category: {
    type: String,
    required: true,
    enum: ['Groceries', 'Household', 'Electronics', 'Beverages', 'Packaging', 'Cleaning', 'Office Supplies', 'Personal Care']
  },
  supplier: {
    type: String,
    required: true,
    trim: true
  },
  supplierId: {
    type: Number,
    required: true
  },
  stock: {
    type: String,
    enum: ['Available', 'Low Stock', 'Out of Stock'],
    default: 'Available'
  },
  stockQty: {
    type: Number,
    default: 100
  },
  image: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },
  minOrderQty: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
