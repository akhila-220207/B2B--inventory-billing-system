require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');


const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


// Database Connection & Server Start
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { 
    // Recommended options for reliability
    serverSelectionTimeoutMS: 5000,
    family: 4 
})
.then(() => {
    console.log('✅ MongoDB Atlas connected successfully. Database is ready!');
    app.listen(PORT, () => {
        console.log(`🚀 Fresh Backend Server running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('❌ Failed to connect to MongoDB Atlas!');
    console.error('Error details:', err.message);
    
    // Still start server to show friendly API error message if DB is down
    app.listen(PORT, () => {
        console.log(`⚠️ Server running without database on http://localhost:${PORT}`);
    });
});

// Fallback Route
app.get('/', (req, res) => res.json({ status: 'Online', message: 'Inventa Fresh API' }));
