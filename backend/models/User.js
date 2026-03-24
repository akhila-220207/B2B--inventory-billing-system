const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  business: {
    type: String,
    required: [true, 'Business name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: function() { return !this.googleId; }
  },
  password: {
    type: String,
    required: function() { return !this.googleId; },
    minlength: 6
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  role: {
    type: String,
    enum: ['buyer', 'supplier'],
    required: [true, 'Role is required']
  },
  // Supplier-specific fields
  businessType: {
    type: String,
    enum: ['Wholesaler', 'Manufacturer', 'Distributor', 'Retailer', 'Other'],
    required: function() { return this.role === 'supplier'; }
  },
  productCategory: {
    type: String,
    required: function() { return this.role === 'supplier'; }
  },
  gstNumber: {
    type: String,
    required: function() { return this.role === 'supplier'; },
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Please enter a valid GST number']
  },
  panNumber: {
    type: String,
    required: function() { return this.role === 'supplier'; },
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number']
  },
  address: {
    type: String,
    required: function() { return this.role === 'supplier'; }
  },
  pincode: {
    type: String,
    required: function() { return this.role === 'supplier'; },
    match: [/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit pincode']
  },
  // Saved delivery addresses (for buyers)
  addresses: [{
    label: { type: String, default: 'other' }, // home, work, other
    address: { type: String, required: true },
    pincode: { type: String, default: '' },
    isDefault: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
