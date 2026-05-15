require('dotenv').config();

const requiredEnv = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error('❌ Missing required environment variables:', missingEnv.join(', '));
}

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('../backend/routes/auth');
const productRoutes = require('../backend/routes/products');
const cartRoutes = require('../backend/routes/cart');
const orderRoutes = require('../backend/routes/orders');
const paymentRoutes = require('../backend/payment');

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS Configuration for Vercel
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Root Route
app.get('/', (req, res) => {
  res.json({ status: 'Online', message: 'Inventa Fresh API' });
});

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Database Connection (Reuse connection for serverless)
let mongoConnection = null;

async function connectDB() {
  if (mongoConnection) {
    return mongoConnection;
  }

  try {
    mongoConnection = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    console.log('✅ MongoDB Connected');
    return mongoConnection;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    throw error;
  }
}

// Connect to DB on app startup
const initializeApp = async () => {
  try {
    await connectDB();
    console.log('🚀 API Ready');
  } catch (error) {
    console.error('❌ Failed to initialize:', error.message);
  }
};

// Initialize on first request
let initialized = false;
app.use(async (req, res, next) => {
  if (!initialized) {
    await initializeApp();
    initialized = true;
  }
  next();
});

// Export for Vercel serverless functions
module.exports = app;

// Export handler for Vercel
module.exports = (req, res) => app(req, res);

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  }).then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  });
}
