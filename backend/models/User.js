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
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
