require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    const result = await Product.updateOne(
      { name: 'Cardamom (1kg Premium Pack)' },
      { $set: { image: 'https://images.unsplash.com/photo-1591211754020-0f2b3ec3ec80?w=400&h=300&fit=crop' } }
    );
    console.log('Updated Cardamom Image successfully', result);
    process.exit(0);
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
