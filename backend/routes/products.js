const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 20+ seed products for B2B marketplace
const seedProducts = [
  {
    name: "Basmati Rice (25kg Bag)",
    description: "Premium long-grain basmati rice, ideal for bulk restaurant and hotel orders.",
    price: 1850,
    unit: "bag",
    category: "Groceries",
    supplier: "AgroTrade India",
    supplierId: 1,
    stock: "Available",
    stockQty: 500,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    rating: 4.8,
    minOrderQty: 5
  },
  {
    name: "Refined Sunflower Oil (15L)",
    description: "Cold-pressed refined sunflower oil in bulk containers, zero trans-fat.",
    price: 1750,
    unit: "can",
    category: "Groceries",
    supplier: "GoldenHarvest Foods",
    supplierId: 2,
    stock: "Available",
    stockQty: 250,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop",
    rating: 4.6,
    minOrderQty: 2
  },
  {
    name: "Premium Green Tea (500g)",
    description: "Himalayan green tea leaves, packed for freshness and rich flavor.",
    price: 480,
    unit: "pack",
    category: "Beverages",
    supplier: "Himalaya Tea Co.",
    supplierId: 3,
    stock: "Available",
    stockQty: 1000,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
    rating: 4.9,
    minOrderQty: 10
  },
  {
    name: "Neem Soap Bar (Carton of 48)",
    description: "Antibacterial neem soap bars, bulk pack for hotels and hospitals.",
    price: 960,
    unit: "carton",
    category: "Personal Care",
    supplier: "Pure Nature Products",
    supplierId: 4,
    stock: "Available",
    stockQty: 300,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
    rating: 4.4,
    minOrderQty: 3
  },
  {
    name: "Industrial Floor Cleaner (5L)",
    description: "Heavy-duty disinfectant floor cleaner with pine fragrance.",
    price: 650,
    unit: "bottle",
    category: "Cleaning",
    supplier: "CleanPro Solutions",
    supplierId: 5,
    stock: "Available",
    stockQty: 400,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop",
    rating: 4.3,
    minOrderQty: 5
  },
  {
    name: "A4 Copy Paper (5 Ream Box)",
    description: "80 GSM A4 white paper, 500 sheets per ream, ideal for office use.",
    price: 1100,
    unit: "box",
    category: "Office Supplies",
    supplier: "PaperMart India",
    supplierId: 6,
    stock: "Available",
    stockQty: 800,
    image: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?w=400&h=300&fit=crop",
    rating: 4.5,
    minOrderQty: 5
  },
  {
    name: "Whole Wheat Flour (50kg)",
    description: "Stone-ground whole wheat atta, ideal for restaurants and bakeries.",
    price: 2100,
    unit: "bag",
    category: "Groceries",
    supplier: "AgroTrade India",
    supplierId: 1,
    stock: "Available",
    stockQty: 350,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    rating: 4.7,
    minOrderQty: 2
  },
  {
    name: "Mineral Water Bottles (24-pack)",
    description: "500ml sealed mineral water bottles, BIS certified.",
    price: 240,
    unit: "pack",
    category: "Beverages",
    supplier: "AquaPure Beverages",
    supplierId: 7,
    stock: "Available",
    stockQty: 2000,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop",
    rating: 4.2,
    minOrderQty: 10
  },
  {
    name: "Corrugated Packaging Boxes (50 pcs)",
    description: "Strong 5-ply corrugated carton boxes, 12x10x8 inches.",
    price: 1500,
    unit: "bundle",
    category: "Packaging",
    supplier: "PackRight Industries",
    supplierId: 8,
    stock: "Low Stock",
    stockQty: 30,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
    rating: 4.1,
    minOrderQty: 2
  },
  {
    name: "LED Desk Lamp (Wholesale 10-pack)",
    description: "Energy-efficient LED desk lamps with USB charging port.",
    price: 3500,
    unit: "pack",
    category: "Electronics",
    supplier: "BrightTech Wholesale",
    supplierId: 9,
    stock: "Available",
    stockQty: 150,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
    rating: 4.6,
    minOrderQty: 1
  },
  {
    name: "Hand Sanitizer (500ml x 12)",
    description: "70% isopropyl alcohol hand sanitizer, WHO-approved formula.",
    price: 1440,
    unit: "carton",
    category: "Personal Care",
    supplier: "MedSafe Supplies",
    supplierId: 10,
    stock: "Available",
    stockQty: 600,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop",
    rating: 4.7,
    minOrderQty: 5
  },
  {
    name: "Bubble Wrap Roll (50m)",
    description: "Anti-static bubble wrap roll with perforations every 30cm.",
    price: 850,
    unit: "roll",
    category: "Packaging",
    supplier: "PackRight Industries",
    supplierId: 8,
    stock: "Available",
    stockQty: 400,
    image: "https://images.unsplash.com/photo-1608613304810-2d4dd52511a2?w=400&h=300&fit=crop",
    rating: 4.3,
    minOrderQty: 3
  },
  {
    name: "Instant Coffee (2kg Jar)",
    description: "Rich blend instant coffee granules, ideal for cafeterias and restaurants.",
    price: 1900,
    unit: "jar",
    category: "Beverages",
    supplier: "BrewMasters Co.",
    supplierId: 11,
    stock: "Available",
    stockQty: 200,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
    rating: 4.8,
    minOrderQty: 2
  },
  {
    name: "Stainless Steel Scrubber (100-pack)",
    description: "Heavy-duty scrubbers for commercial kitchens — rust-proof steel wool.",
    price: 550,
    unit: "pack",
    category: "Cleaning",
    supplier: "CleanPro Solutions",
    supplierId: 5,
    stock: "Available",
    stockQty: 700,
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    rating: 4.2,
    minOrderQty: 5
  },
  {
    name: "Ballpoint Pens (Box of 100)",
    description: "Smooth-writing blue ink ballpoint pens for office bulk purchase.",
    price: 350,
    unit: "box",
    category: "Office Supplies",
    supplier: "PaperMart India",
    supplierId: 6,
    stock: "Available",
    stockQty: 1500,
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=300&fit=crop",
    rating: 4.4,
    minOrderQty: 5
  },
  {
    name: "Toor Dal (50kg)",
    description: "Premium quality toor dal sourced directly from farms in Vidarbha.",
    price: 4250,
    unit: "bag",
    category: "Groceries",
    supplier: "GoldenHarvest Foods",
    supplierId: 2,
    stock: "Low Stock",
    stockQty: 20,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.9,
    minOrderQty: 1
  },
  {
    name: "USB C Charging Cables (20-pack)",
    description: "Nylon braided 2m USB-C fast charging cables, 60W compatible.",
    price: 1800,
    unit: "pack",
    category: "Electronics",
    supplier: "BrightTech Wholesale",
    supplierId: 9,
    stock: "Available",
    stockQty: 500,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
    rating: 4.5,
    minOrderQty: 2
  },
  {
    name: "Mango Juice Tetra Packs (24-pack)",
    description: "Real fruit mango juice in 200ml Tetra packs. No preservatives.",
    price: 480,
    unit: "pack",
    category: "Beverages",
    supplier: "AquaPure Beverages",
    supplierId: 7,
    stock: "Available",
    stockQty: 1500,
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop",
    rating: 4.6,
    minOrderQty: 10
  },
  {
    name: "Dustbin with Lid (Set of 10)",
    description: "20L capacity pedal-operated dustbins, ideal for offices and malls.",
    price: 2800,
    unit: "set",
    category: "Household",
    supplier: "HomePlus Supplies",
    supplierId: 12,
    stock: "Available",
    stockQty: 200,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    rating: 4.1,
    minOrderQty: 1
  },
  {
    name: "Tissue Paper Rolls (48-pack)",
    description: "2-ply soft tissue rolls for hotels and restaurants, 250 pulls each.",
    price: 960,
    unit: "carton",
    category: "Household",
    supplier: "HomePlus Supplies",
    supplierId: 12,
    stock: "Available",
    stockQty: 900,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
    rating: 4.3,
    minOrderQty: 5
  },
  {
    name: "Detergent Powder (25kg Bag)",
    description: "Industrial-strength phosphate-free detergent powder for commercial laundry.",
    price: 1650,
    unit: "bag",
    category: "Cleaning",
    supplier: "CleanPro Solutions",
    supplierId: 5,
    stock: "Available",
    stockQty: 300,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    rating: 4.5,
    minOrderQty: 2
  },
  {
    name: "Cardamom (1kg Premium Pack)",
    description: "Green cardamom from Kerala, aromatic and rich for hotels and retailers.",
    price: 2200,
    unit: "kg",
    category: "Groceries",
    supplier: "AgroTrade India",
    supplierId: 1,
    stock: "Low Stock",
    stockQty: 15,
    image: "https://images.unsplash.com/photo-1600718374623-f11f9d5fb3e9?w=400&h=300&fit=crop",
    rating: 4.9,
    minOrderQty: 1
  },
  {
    name: "Wireless Mouse (10-pack)",
    description: "2.4GHz wireless optical mouse with nano USB receiver, ergonomic design.",
    price: 3200,
    unit: "pack",
    category: "Electronics",
    supplier: "BrightTech Wholesale",
    supplierId: 9,
    stock: "Out of Stock",
    stockQty: 0,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    rating: 4.4,
    minOrderQty: 1
  },
  {
    name: "Printed Invoice Books (50-pack)",
    description: "Pre-printed GST invoice books, duplicate copy, 100 pages each.",
    price: 1250,
    unit: "pack",
    category: "Office Supplies",
    supplier: "PaperMart India",
    supplierId: 6,
    stock: "Available",
    stockQty: 600,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    rating: 4.2,
    minOrderQty: 5
  }
];

// Seed DB if empty
const seedIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(seedProducts);
      console.log(`✅ Seeded ${seedProducts.length} products into database.`);
    }
  } catch (err) {
    console.error('Seeding error:', err.message);
  }
};

seedIfEmpty();

// GET /api/products — supports search, category, supplier, stockStatus, sortPrice
router.get('/', async (req, res) => {
  try {
    const { search, category, supplier, stockStatus, sortPrice } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { supplier: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All Categories') {
      query.category = category;
    }

    if (supplier && supplier !== 'All Suppliers') {
      query.supplier = supplier;
    }

    if (stockStatus && stockStatus !== 'All') {
      query.stock = stockStatus;
    }

    let productsQuery = Product.find(query);

    if (sortPrice === 'Low to High') {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sortPrice === 'High to Low') {
      productsQuery = productsQuery.sort({ price: -1 });
    }

    const products = await productsQuery.lean();

    // Also return unique categories and suppliers for filter dropdowns
    const [categories, suppliers] = await Promise.all([
      Product.distinct('category'),
      Product.distinct('supplier')
    ]);

    res.json({ products, categories, suppliers });
  } catch (err) {
    console.error('Products fetch error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
