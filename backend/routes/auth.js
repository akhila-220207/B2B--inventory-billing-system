const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID");

// @route   POST /api/auth/register
// @desc    Register a new business user
router.post('/register', async (req, res) => {
  try {
    const { business, email, phone, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    user = new User({
      business,
      email,
      phone,
      password: hashedPassword,
      role
    });

    await user.save();

    // Create JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '10h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ 
          token, 
          role: user.role,
          business: user.business,
          email: user.email,
          phone: user.phone,
          name: user.business, // using business as name if not present
          message: 'User registered successfully!'
        });
      }
    );

  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // See if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '10h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token, 
          role: user.role,
          business: user.business,
          email: user.email,
          phone: user.phone,
          name: user.business // using business as name
        });
      }
    );

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/auth/google
// @desc    Authenticate user with Google & get token
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Google token is required.' });
    }

    // Verify real Google ID Token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    const { email, sub, name } = payload; // sub is the googleId

        let user = await User.findOne({ email });
        
        if (user) {
            // If user exists, but doesn't have a googleId, let's link them
            if (!user.googleId) {
                user.googleId = sub;
                await user.save();
            }

            // Return jsonwebtoken
            const jwtPayload = {
                user: {
                    id: user.id,
                    role: user.role
                }
            };

            jwt.sign(
                jwtPayload,
                process.env.JWT_SECRET,
                { expiresIn: '10h' },
                (err, jwtToken) => {
                    if (err) throw err;
                    return res.json({ token: jwtToken, role: user.role });
                }
            );
        } else {
            // User does not exist, send info back to frontend to complete registration
            return res.status(404).json({ isNewUser: true, email, name, message: 'Account not found. Please complete registration.' });
        }

  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/auth/google/complete
// @desc    Complete Google registration for first time users
router.post('/google/complete', async (req, res) => {
  try {
    const { token, role, business } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Google token is required.' });
    }

    // Verify real Google ID Token again to be safe
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, sub } = payload; 

    // See if user exists
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user
    user = new User({
      business,
      email,
      googleId: sub,
      role
    });

    await user.save();

    // Create JWT
    const jwtPayload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: '10h' },
      (err, jwtToken) => {
        if (err) throw err;
        return res.status(201).json({ 
          token: jwtToken, 
          role: user.role,
          message: 'User registered successfully!'
        });
      }
    );

  } catch (err) {
    console.error('Google Registration Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
