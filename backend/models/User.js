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
    required: [true, 'Phone number is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['buyer', 'supplier'],
    required: [true, 'Role is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
