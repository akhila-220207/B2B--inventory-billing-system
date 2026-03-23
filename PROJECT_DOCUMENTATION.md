# B2B Inventory & Billing System — Complete Project Documentation

> **Purpose:** This document covers the complete architecture, code structure, technology stack, and functionality of the B2B Inventory & Billing System so that every part of the project can be explained clearly.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Folder Structure](#3-project-folder-structure)
4. [How to Run the Project](#4-how-to-run-the-project)
5. [Backend — Server & API](#5-backend--server--api)
   - [server.js](#51-serverjs)
   - [Database Models](#52-database-models)
   - [API Routes](#53-api-routes)
6. [Frontend — React Application](#6-frontend--react-application)
   - [App.js — Routing](#61-appjs--routing)
   - [Context (Global State)](#62-context-global-state)
   - [Services — api.js](#63-services--apijs)
   - [Components](#64-components)
   - [Pages — Buyer Side](#65-pages--buyer-side)
   - [Pages — Supplier Side](#66-pages--supplier-side)
7. [Authentication Flow](#7-authentication-flow)
8. [Database Schema (MongoDB)](#8-database-schema-mongodb)
9. [API Endpoints Reference](#9-api-endpoints-reference)
10. [Key Features Explained](#10-key-features-explained)
11. [Git Branches](#11-git-branches)
12. [Common Interview/Faculty Questions & Answers](#12-common-interviewfaculty-questions--answers)

---

## 1. Project Overview

**Project Name:** B2B Inventory & Billing System (also called "Inventa Fresh")

**Type:** Full-Stack Web Application

**Purpose:** A Business-to-Business (B2B) marketplace and inventory management platform where:
- **Suppliers** list products, manage their inventory, view orders placed for their products, generate billing reports.
- **Buyers** browse the marketplace, add products to cart, place bulk orders, track order status, and generate invoices.

**Real-world use case:** A restaurant or hospital (buyer) purchases grocery, cleaning, or office supplies in bulk from multiple wholesale suppliers — all on one platform.

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework (component-based) |
| React Router DOM | 7.x | Client-side routing / navigation |
| React Toastify | 11.x | Toast notification alerts |
| Lucide React | 0.577 | Icon library |
| React Icons | 5.x | Additional icons |
| @react-oauth/google | 0.13.x | Google OAuth login button |
| jsPDF | 4.x | Generate/download PDF invoices |
| html2canvas | 1.4.x | Capture HTML as canvas for PDF |
| Axios | (via api.js) | HTTP requests to backend |
| Tailwind CSS | 4.x | Utility-first CSS styling |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | LTS | JavaScript runtime |
| Express.js | 5.x | Web framework / API server |
| MongoDB Atlas | Cloud | NoSQL database |
| Mongoose | 9.x | MongoDB ODM (schema modeling) |
| bcryptjs | 3.x | Password hashing |
| jsonwebtoken (JWT) | 9.x | Authentication tokens |
| google-auth-library | 10.x | Verify Google OAuth tokens |
| cors | 2.8.x | Enable cross-origin requests |
| dotenv | 17.x | Environment variable management |
| nodemon | 3.x | Auto-restart server on code changes |

### Database
- **MongoDB Atlas** (cloud-hosted MongoDB)
- Local data stored in `/db` directory (WiredTiger engine format)

---

## 3. Project Folder Structure

```
B2B--inventory-billing-system/
├── backend/                    ← Node.js/Express API Server
│   ├── models/                 ← Mongoose database models
│   │   ├── User.js             ← User schema (buyer/supplier)
│   │   ├── Product.js          ← Product schema
│   │   ├── Order.js            ← Order schema
│   │   └── Cart.js             ← Shopping cart schema
│   ├── routes/                 ← Express route handlers
│   │   ├── auth.js             ← Register, Login, Google OAuth
│   │   ├── products.js         ← CRUD for products
│   │   ├── cart.js             ← Cart management
│   │   └── orders.js           ← Order placement & tracking
│   ├── .env                    ← Secret keys (not pushed to Git)
│   ├── .env.example            ← Template for environment variables
│   ├── package.json            ← Backend dependencies
│   └── server.js               ← Main entry point
│
├── src/                        ← React Frontend Application
│   ├── components/             ← Reusable UI components
│   │   ├── Loading.jsx         ← Loading spinner
│   │   ├── Notifications.jsx   ← Notification panel
│   │   ├── ProductTable.jsx    ← Reusable product table
│   │   ├── ProtectedRoute.jsx  ← Route guard (checks login)
│   │   └── Toast.jsx           ← Toast message component
│   ├── context/                ← React Context (global state)
│   │   ├── AppContext.jsx      ← Main global state (cart, orders, profile)
│   │   └── CartContext.jsx     ← Cart-specific context (backend sync)
│   ├── pages/                  ← All page components
│   │   ├── LandingPage.jsx     ← Home/marketing page
│   │   ├── LoginPage.jsx       ← Login form + Google login
│   │   ├── RegisterPage.jsx    ← Registration + Google signup
│   │   ├── BuyerDashboard.jsx  ← Buyer layout/sidebar wrapper
│   │   ├── BuyerOverview.jsx   ← Buyer dashboard home
│   │   ├── MarketplacePage.jsx ← Browse & search products
│   │   ├── CartPage.jsx        ← Shopping cart view
│   │   ├── CheckoutPage.jsx    ← Order checkout form
│   │   ├── OrdersPage.jsx      ← Buyer's order history
│   │   ├── OrderTrackingPage.jsx ← Real-time order status tracking
│   │   ├── InvoicesListPage.jsx ← List of all invoices
│   │   ├── InvoicePage.jsx     ← Individual invoice with PDF export
│   │   ├── ReportsPage.jsx     ← Buyer analytics & reports
│   │   ├── SettingsPage.jsx    ← Buyer profile settings
│   │   ├── SupplierProfilePage.jsx ← Public supplier profile
│   │   ├── ProductDetailsPage.jsx  ← Individual product detail
│   │   ├── FeaturesPage.jsx    ← Platform features showcase
│   │   └── supplier/           ← Supplier-specific pages
│   │       ├── SupplierDashboard.jsx ← Supplier layout/sidebar
│   │       ├── SupplierHomePage.jsx  ← Supplier dashboard overview
│   │       ├── ProductsPage.jsx      ← Add/edit/delete own products
│   │       ├── InventoryPage.jsx     ← Inventory management
│   │       ├── OrdersPage.jsx        ← Orders received from buyers
│   │       ├── BillingPage.jsx       ← Billing management
│   │       ├── ReportsPage.jsx       ← Supplier analytics
│   │       └── SettingsPage.jsx      ← Supplier profile settings
│   ├── services/
│   │   └── api.js              ← Axios instance + API helper functions
│   ├── lib/
│   │   └── utils.js            ← Utility helper functions
│   ├── App.js                  ← Root component, all routes defined here
│   ├── App.css                 ← Global CSS
│   └── index.js                ← React DOM entry point
│
├── public/                     ← Static files served directly
│   ├── index.html              ← Root HTML shell
│   ├── manifest.json           ← PWA manifest
│   └── *.png / *.jpg           ← Public images/icons
│
├── db/                         ← Local MongoDB data files (WiredTiger)
├── package.json                ← Frontend dependencies + scripts
├── start.bat                   ← Windows batch file to start frontend + backend together
├── .gitignore                  ← Files excluded from Git
└── .env                        ← Root-level environment variables
```

---

## 4. How to Run the Project

### Prerequisites
- Node.js installed
- MongoDB Atlas account with connection string in `backend/.env`

### Start Both at Once
```bash
# From project root directory
npm run dev
```
This uses `concurrently` to start both:
- **Frontend** at `http://localhost:3000`
- **Backend** at `http://localhost:5000`

### Start Separately
```bash
# Terminal 1 — Frontend
npm start

# Terminal 2 — Backend
cd backend
npm run dev
```

### Environment Variables (backend/.env)
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
PORT=5000
```

---

## 5. Backend — Server & API

### 5.1 server.js

**Location:** `backend/server.js`

This is the **main entry point** for the backend. It:
1. Loads environment variables using `dotenv`
2. Forces DNS to use IPv4 first (`dns.setDefaultResultOrder('ipv4first')`) — this prevents IPv6 connection issues with MongoDB Atlas
3. Creates an Express app
4. Configures middleware:
   - `express.json({ limit: '50mb' })` — Parses JSON request bodies (50MB for base64 image uploads)
   - `cors` — Allows requests from `localhost:3000` (the React frontend)
5. Registers all 4 route groups:
   - `/api/auth` → authentication routes
   - `/api/products` → product CRUD
   - `/api/cart` → cart management
   - `/api/orders` → order processing
6. Connects to MongoDB Atlas using Mongoose
7. Starts the Express server on PORT 5000
8. Has a fallback root route that returns `{ status: 'Online', message: 'Inventa Fresh API' }`

```javascript
// Example: CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
```

---

### 5.2 Database Models

#### User Model — `backend/models/User.js`

Defines the structure for user accounts stored in MongoDB.

| Field | Type | Description |
|---|---|---|
| `business` | String (required) | Business/company name |
| `email` | String (required, unique) | Login email, stored lowercase |
| `phone` | String (required if no googleId) | Contact phone number |
| `password` | String (required if no googleId, min 6 chars) | Hashed with bcrypt |
| `googleId` | String (unique, sparse) | Google account ID for OAuth users |
| `role` | String (enum: 'buyer' or 'supplier') | Determines dashboard access |
| `createdAt` / `updatedAt` | Date | Auto-managed by Mongoose timestamps |

**Key design decisions:**
- `phone` and `password` are only required if the user did NOT sign up via Google (`required: function() { return !this.googleId; }`)
- `googleId` uses `sparse: true` so that multiple users without a `googleId` don't violate the unique constraint
- Both buyers and suppliers use the same User model — differentiated by the `role` field

---

#### Product Model — `backend/models/Product.js`

Defines the structure for products listed by suppliers.

| Field | Type | Description |
|---|---|---|
| `name` | String (required) | Product name |
| `description` | String | Product details |
| `price` | Number (required, min 0) | Price in INR (₹) |
| `unit` | String (default: 'piece') | Unit of sale (bag, can, kg, etc.) |
| `category` | String (required, enum) | Product category |
| `supplier` | String (required) | Supplier's business name |
| `supplierId` | String (required) | Supplier's user ID |
| `stock` | String (enum) | 'Available', 'Low Stock', or 'Out of Stock' |
| `stockQty` | Number (default: 100) | Quantity in stock |
| `image` | String | URL to product image |
| `rating` | Number (0-5, default: 4.0) | Product rating |
| `minOrderQty` | Number (default: 1) | Minimum order quantity for B2B |

**Allowed categories:**
`Groceries, Household, Electronics, Beverages, Packaging, Cleaning, Office Supplies, Personal Care, Grains, Dairy, Spices, Snacks, Other`

---

#### Order Model — `backend/models/Order.js`

Defines the structure for purchase orders.

| Field | Type | Description |
|---|---|---|
| `userId` | ObjectId (ref: User) | Buyer who placed the order |
| `items` | Array of orderItemSchema | Products ordered |
| `totalAmount` | Number (required) | Total including GST |
| `shippingAddress` | String (required) | Delivery address |
| `status` | String (enum) | 'Processing', 'Shipped', 'Delivered', 'Cancelled' |
| `paymentStatus` | String (enum) | 'Pending', 'Completed', 'Failed' |

**Order Item sub-schema fields:** `productId`, `name`, `price`, `quantity`, `supplier`, `supplierId`, `image`

---

#### Cart Model — `backend/models/Cart.js`

Stores the shopping cart per user in MongoDB (for persistence across devices).

| Field | Type | Description |
|---|---|---|
| `userId` | ObjectId (ref: User, unique) | One cart per user |
| `items` | Array of cartItemSchema | Items in the cart |

**Cart Item sub-schema fields:** `productId`, `name`, `price`, `supplier`, `supplierId`, `image`, `unit`, `quantity`

---

### 5.3 API Routes

#### Auth Routes — `backend/routes/auth.js`

Handles all user authentication. Uses **bcryptjs** for password hashing and **jsonwebtoken** for JWT tokens (expire in 10 hours).

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user with email & password |
| POST | `/api/auth/login` | Login with email & password |
| POST | `/api/auth/google` | Login/register with Google OAuth token |
| POST | `/api/auth/google/complete` | Complete registration for new Google users |

**Registration flow:**
1. Check if email already registered
2. Hash password using `bcrypt.genSalt(10)` + `bcrypt.hash()`
3. Save new User document to MongoDB
4. Return JWT token + role + business name

**Login flow:**
1. Find user by email
2. Compare submitted password with stored hash using `bcrypt.compare()`
3. Generate & return JWT token

**Google OAuth flow:**
1. Receive Google ID token from frontend
2. Verify token using `googleClient.verifyIdToken()` against Google servers
3. Extract `email`, `sub` (Google UID), `name` from token payload
4. If user exists → link Google ID if needed, return JWT
5. If new user → return 404 with `isNewUser: true` → frontend prompts for role/business name → calls `/google/complete`

**JWT Middleware (used in products, cart, orders routes):**
```javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // "Bearer <token>"
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded.user; // { id, role, business }
  next();
};
```

---

#### Product Routes — `backend/routes/products.js`

Full CRUD for products with search, filter, and sort capabilities.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | No | Get all products (with filters) |
| POST | `/api/products` | Yes (supplier only) | Add a new product |
| GET | `/api/products/:id` | No | Get one product by ID |
| PUT | `/api/products/:id` | Yes (supplier only, must own) | Update a product |
| DELETE | `/api/products/:id` | Yes (supplier only, must own) | Delete a product |

**Query Parameters for GET `/api/products`:**
- `search` — searches across name, description, supplier, category using regex
- `category` — filter by category
- `supplier` — filter by supplier name
- `stockStatus` — filter by 'Available', 'Low Stock', 'Out of Stock'
- `sortPrice` — 'Low to High' or 'High to Low'

**Auto-seeding:** When the products collection is empty (fresh database), the route automatically inserts 24 pre-defined seed products from 12 different suppliers covering all categories.

**Category/Supplier caching:** Unique categories and suppliers are cached in memory for 60 seconds to avoid repeated DB queries on every request.

---

#### Cart Routes — `backend/routes/cart.js`

Manages the shopping cart stored in MongoDB (per user).

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cart` | Yes | Get user's current cart |
| POST | `/api/cart/add` | Yes | Add item (or increase qty if exists) |
| PUT | `/api/cart/update` | Yes | Update quantity of an item |
| DELETE | `/api/cart/remove/:productId` | Yes | Remove one item from cart |
| DELETE | `/api/cart/clear` | Yes | Empty the entire cart |

**Add to cart logic:** If the product already exists in the cart, its quantity is incremented rather than adding a duplicate entry.

---

#### Order Routes — `backend/routes/orders.js`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/orders` | Yes | Create a new order |
| GET | `/api/orders` | Yes | Get all orders for logged-in user |
| GET | `/api/orders/:id` | Yes | Get a specific order by ID |
| PATCH | `/api/orders/:id/cancel` | Yes | Cancel an order (only if 'Processing') |

**Order cancellation rule:** An order can only be cancelled when its status is `'Processing'`. Once shipped or delivered, it cannot be cancelled.

**Security:** All order endpoints verify that the order belongs to the requesting user (`order.userId.toString() !== req.user.id`).

---

## 6. Frontend — React Application

### 6.1 App.js — Routing

**Location:** `src/App.js`

This is the root component. It uses **React Router DOM v7** to define all application routes.

**Route Structure:**

```
/                          → LandingPage
/login                     → LoginPage
/register                  → RegisterPage

/buyer-dashboard           → BuyerDashboard (layout/sidebar)
  /                        → BuyerOverview (default)
  /marketplace             → MarketplacePage
  /cart                    → CartPage
  /checkout                → CheckoutPage
  /orders                  → OrdersPage (buyer)
  /invoices                → InvoicesListPage
  /invoice/:orderId        → InvoicePage
  /reports                 → ReportsPage (buyer)
  /settings                → SettingsPage (buyer)

/supplier-dashboard        → SupplierDashboard (layout/sidebar)
  /                        → SupplierHomePage (default)
  /products                → ProductsPage (supplier)
  /inventory               → InventoryPage
  /orders                  → SupplierOrdersPage
  /billing                 → BillingPage
  /reports                 → SupplierReportsPage
  /settings                → SupplierSettingsPage

/order-tracking/:orderId   → OrderTrackingPage
/supplier-profile/:supplierId → SupplierProfilePage
/product/:productId        → ProductDetailsPage
```

`<ToastContainer>` is placed at the root level so toast notifications appear everywhere in the app.

---

### 6.2 Context (Global State)

#### AppContext.jsx — `src/context/AppContext.jsx`

This is the **primary global state manager** for the entire application. It uses React's `createContext` and `useState`/`useEffect`/`useCallback` hooks.

**What it manages:**

| State | Description |
|---|---|
| `cartItems` | Array of cart items (persisted to localStorage) |
| `cartCount` | Total number of items in cart |
| `cartTotal` | Total price of cart items |
| `orders` | Array of placed orders (fetched from API) |
| `ordersLoaded` | Boolean indicating orders have been fetched |
| `profile` | User profile (business, email, phone, GST, PAN, address, etc.) |
| `userName` | Derived display name |
| `notifications` | In-app notification messages |
| `stats` | Derived spending/order statistics |

**Key functions provided:**

| Function | What it does |
|---|---|
| `addToCart(product, qty)` | Adds item to cart or increments quantity |
| `removeFromCart(productId)` | Removes item from cart |
| `updateCartQty(productId, qty)` | Changes quantity (if 0, removes item) |
| `clearCart()` | Empties cart and removes from localStorage |
| `fetchOrders()` | Fetches orders from the API (with JWT) |
| `placeOrder({ shippingAddress })` | Sends cart items as new order, calculates 5% GST, clears cart |
| `cancelOrder(orderId)` | Calls API to cancel an order |
| `saveProfile(newProfile)` | Saves all profile data to localStorage |
| `addNotification({ message, time, status })` | Creates a new notification |
| `dismissNotification(id)` | Removes a notification by ID |

**Order/GST calculation in `placeOrder`:**
```javascript
const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
const gst   = Math.round(subtotal * 0.05);  // 5% GST
const total = subtotal + gst;
```

**Cart persistence:** Cart is saved to `localStorage` using a `useEffect` that runs every time `cartItems` changes. On page refresh, the initial state is loaded from localStorage with data migration logic for older formats.

**`useApp()` hook:** Custom hook to access AppContext. Throws an error if used outside `AppProvider`.

---

#### CartContext.jsx — `src/context/CartContext.jsx`

An alternative/secondary cart context that **syncs with the backend MongoDB cart API**. It handles:
- Fetching cart from API on mount
- Persisting to `localStorage` for unauthenticated guests (as `b2b_cart`)
- `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` — all make API calls when logged in, fall back to local state for guests

---

### 6.3 Services — api.js

**Location:** `src/services/api.js`

Creates a centralized **Axios instance** configured for the backend:

```javascript
const API = axios.create({ baseURL: "http://127.0.0.1:5000/api" });
```

**Request interceptor:** Automatically attaches the JWT token from `localStorage` to every request's `Authorization` header.

**Exported API groups:**

| Group | Methods |
|---|---|
| `authAPI` | `login(data)`, `register(data)`, `logout()` |
| `productAPI` | `getAll(filters)`, `getById(id)`, `create(data)`, `update(id, data)`, `delete(id)` |
| `orderAPI` | `getAll()`, `getById(id)`, `create(data)`, `updateStatus(id, status)` |
| `userAPI` | `getProfile()`, `updateProfile(data)` |

---

### 6.4 Components

#### ProtectedRoute.jsx
Guards routes that require authentication. Checks for a valid JWT token in localStorage. If not present, redirects to `/login`.

#### ProductTable.jsx
A reusable table component for displaying lists of products. Used in supplier inventory/products pages.

#### Notifications.jsx
Displays the in-app notification panel (the bell icon dropdown). Shows time-stamped messages with success/error status styling. Uses `useApp()` to read and dismiss notifications from AppContext.

#### Loading.jsx
A simple loading spinner component shown while API data is being fetched.

#### Toast.jsx
Wrapper component for toast notification messages.

---

### 6.5 Pages — Buyer Side

#### LandingPage.jsx
The public home/marketing page. Shows:
- Hero section with platform value proposition
- Key platform features
- Product category showcase
- Call-to-action buttons (Login / Get Started)
- Uses background images from `/public`

#### LoginPage.jsx
- Email + password login form
- **Google Sign-In button** (using `@react-oauth/google`)
- On successful login: saves `token`, `role`, `userBusiness`, `userName`, `userEmail` to localStorage
- Redirects buyers to `/buyer-dashboard`, suppliers to `/supplier-dashboard`
- On Google login, calls `/api/auth/google` — if `isNewUser: true`, redirects to registration

#### RegisterPage.jsx
- Business registration form: business name, email, phone, password, role selection (buyer/supplier)
- Also supports **Google registration completion** — accepts pre-filled Google profile data
- Validates password match, minimum length
- On success: stores token and user data, redirects based on role

#### BuyerDashboard.jsx
The **layout wrapper** for all buyer pages. Renders:
- Sidebar navigation (Overview, Marketplace, Cart, Orders, Invoices, Reports, Settings)
- Cart item count badge on sidebar
- Top header bar with business name and notification bell
- `<Outlet />` for nested page content

#### BuyerOverview.jsx
The buyer's dashboard home. Displays:
- Summary cards: Total Spent, Total Orders, Active Orders, Items Purchased
- Quick action buttons
- Recent orders table
- Uses `useApp()` to get orders and stats

#### MarketplacePage.jsx (20,872 bytes — largest frontend file)
Full product marketplace with:
- Search bar (searches name, description, supplier, category)
- Filter dropdowns: Category, Supplier, Stock Status
- Sort by price (Low to High / High to Low)
- Product cards with image, rating, price, supplier, min order qty
- "Add to Cart" button per product
- Pagination / lazy loading
- Fetches all products from `/api/products` with query parameters

#### CartPage.jsx
Shopping cart page:
- Lists all cart items with quantity +/- controls
- Remove individual items
- Shows subtotal, 5% GST calculation, and grand total
- "Proceed to Checkout" button

#### CheckoutPage.jsx
Order placement form:
- Shipping address input
- Order summary confirmation
- Shows items, quantities, prices, GST
- Calls `placeOrder({ shippingAddress })` from AppContext
- On success: shows confirmation and redirects to order tracking

#### OrdersPage.jsx (Buyer)
Lists all past orders for the buyer:
- Order ID, date, status, total amount
- Status badges (Processing, Shipped, Delivered, Cancelled) with color coding
- "Track Order" button → navigates to `/order-tracking/:orderId`
- "View Invoice" button → navigates to `/invoice/:orderId`
- "Cancel Order" button (only for Processing status)

#### OrderTrackingPage.jsx
Visual order status timeline for a specific order:
- Shows 4 stages: Order Placed → Processing → Shipped → Delivered
- Highlights current stage
- Shows each item in the order with name, quantity, price

#### InvoicesListPage.jsx
Lists all invoices (one per order). Shows order date, items count, total, status. Clicking opens the full invoice.

#### InvoicePage.jsx
Full GST invoice for a specific order:
- Business details header
- Itemized table with quantity, unit price, GST, total
- Grand total calculation
- **Download as PDF** using `jsPDF` + `html2canvas`

#### ReportsPage.jsx (Buyer)
Analytics dashboard for the buyer:
- Total spending over time
- Orders by category breakdown
- Monthly spending trend

#### SettingsPage.jsx (Buyer)
User profile settings:
- Business name, email, phone
- GST number, PAN number
- Business type, address, pincode, website
- Saved to localStorage via `saveProfile()`

---

### 6.6 Pages — Supplier Side

#### SupplierDashboard.jsx
Layout wrapper for all supplier pages. Sidebar with: Home, Products, Inventory, Orders, Billing, Reports, Settings.

#### SupplierHomePage.jsx (23,236 bytes)
Supplier dashboard overview:
- KPI cards: Total Products listed, Total Orders received, Revenue summary
- Quick add product form preview
- Recent orders table (orders received from buyers)

#### ProductsPage.jsx (31,394 bytes — very large)
Full product management for suppliers:
- Table of all products the supplier has listed
- **Add product form:** name, description, price, unit, category, stock status, stock quantity, image URL, min order qty
- **Edit product** (inline or modal form) — PATCH to `/api/products/:id`
- **Delete product** — DELETE to `/api/products/:id`
- Only the supplier who created a product can edit/delete it (enforced both frontend and backend)

#### InventoryPage.jsx (32,220 bytes — largest supplier file)
Detailed inventory tracking:
- Shows all products with current stock levels
- Stock status indicators: Available (green), Low Stock (yellow), Out of Stock (red)
- Quick stock update controls
- Low stock alert notifications

#### OrdersPage.jsx (Supplier)
Orders received from buyers:
- All orders containing products belonging to this supplier
- Shows buyer business name, products ordered, quantities, status
- (Orders are filtered client-side by `supplierId` matching the supplier's user ID)

#### BillingPage.jsx
Supplier billing management:
- View generated invoices for completed orders
- Revenue summary

#### ReportsPage.jsx (Supplier)
Analytics for the supplier:
- Sales trend charts
- Best-selling products
- Revenue by category
- Monthly revenue comparison

#### SettingsPage.jsx (Supplier) (38,908 bytes — largest file in project)
Comprehensive supplier profile settings:
- Business details, contact info
- GST registration info
- Bank account details for payments
- Notification preferences

---

## 7. Authentication Flow

### Email/Password
```
Registration:
  User fills form → POST /api/auth/register
  → bcrypt hashes password → User saved to MongoDB
  → JWT returned → Stored in localStorage
  → Redirect to appropriate dashboard

Login:
  User submits email+password → POST /api/auth/login
  → bcrypt.compare() validates password
  → JWT returned → Stored in localStorage
  → Redirect based on role (buyer/supplier)
```

### Google OAuth
```
User clicks "Sign in with Google"
→ Google popup opens → User selects account
→ Google returns ID token to frontend
→ Frontend sends token to POST /api/auth/google
→ Backend verifies token with Google servers
→ If existing user: JWT returned → Login complete
→ If new user: 404 isNewUser:true returned
  → Frontend shows business details form
  → User submits → POST /api/auth/google/complete
  → New user created with googleId → JWT returned
```

### JWT Usage
- All protected API routes require `Authorization: Bearer <token>` header
- Token expires after 10 hours
- Token stored in `localStorage` and attached to every request via Axios interceptor in `api.js`
- On logout: token and user data are removed from localStorage

---

## 8. Database Schema (MongoDB)

The system uses **4 MongoDB collections:**

### users
```json
{
  "_id": "ObjectId",
  "business": "Restaurant ABC",
  "email": "abc@gmail.com",
  "phone": "9876543210",
  "password": "$2a$10$...",  // bcrypt hash
  "googleId": null,           // or Google sub ID
  "role": "buyer",            // or "supplier"
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### products
```json
{
  "_id": "ObjectId",
  "name": "Basmati Rice (25kg Bag)",
  "description": "Premium long-grain basmati rice",
  "price": 1850,
  "unit": "bag",
  "category": "Groceries",
  "supplier": "AgroTrade India",
  "supplierId": "user_id_string",
  "stock": "Available",
  "stockQty": 500,
  "image": "https://...",
  "rating": 4.8,
  "minOrderQty": 5,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### orders
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users)",
  "items": [
    {
      "productId": "ObjectId (ref: products)",
      "name": "Basmati Rice",
      "price": 1850,
      "quantity": 10,
      "supplier": "AgroTrade India",
      "supplierId": "string",
      "image": "https://..."
    }
  ],
  "totalAmount": 19425,
  "shippingAddress": "123 Main St, Pune - 411001",
  "status": "Processing",
  "paymentStatus": "Pending",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### carts
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users, unique)",
  "items": [
    {
      "productId": "ObjectId",
      "name": "Basmati Rice",
      "price": 1850,
      "supplier": "AgroTrade India",
      "supplierId": "string",
      "image": "https://...",
      "unit": "bag",
      "quantity": 5
    }
  ],
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

## 9. API Endpoints Reference

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/` | No | API health check |
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login with email/password |
| POST | `/api/auth/google` | No | Google OAuth login |
| POST | `/api/auth/google/complete` | No | Complete Google registration |
| GET | `/api/products` | No | Get products (search & filter) |
| POST | `/api/products` | Yes (supplier) | Add new product |
| GET | `/api/products/:id` | No | Get single product |
| PUT | `/api/products/:id` | Yes (supplier, owner) | Update product |
| DELETE | `/api/products/:id` | Yes (supplier, owner) | Delete product |
| GET | `/api/cart` | Yes | Get user's cart |
| POST | `/api/cart/add` | Yes | Add item to cart |
| PUT | `/api/cart/update` | Yes | Update item quantity |
| DELETE | `/api/cart/remove/:productId` | Yes | Remove item from cart |
| DELETE | `/api/cart/clear` | Yes | Clear entire cart |
| POST | `/api/orders` | Yes | Place new order |
| GET | `/api/orders` | Yes | Get all orders |
| GET | `/api/orders/:id` | Yes (owner) | Get specific order |
| PATCH | `/api/orders/:id/cancel` | Yes (owner) | Cancel order |

---

## 10. Key Features Explained

### 1. Role-Based Access Control (RBAC)
- Two roles: **Buyer** and **Supplier**
- Role is stored in the JWT token (`req.user.role`)
- Backend enforces: only suppliers can add/edit/delete products
- Frontend routing: buyer goes to `/buyer-dashboard`, supplier goes to `/supplier-dashboard`
- Suppliers can only modify **their own** products (checked via `supplierId === req.user.id`)

### 2. B2B Marketplace
- Products are bulk-oriented (minimum order quantities apply)
- 24 pre-seeded products from 12 different supplier companies
- Filters support browsing by category, supplier, stock status
- Full-text search across name, description, supplier, category

### 3. Cart Management
- **Dual strategy:** Cart state is managed in both localStorage (AppContext) and MongoDB (CartContext)
- Guest users: cart saved to localStorage as `b2b_cart`
- Logged-in users: cart persisted to MongoDB for cross-device access
- Quantity controls, item removal, cart total with live updates

### 4. GST Invoice Generation
- 5% GST is added to order subtotal at checkout
- Full GST invoice generated per order on `InvoicePage`
- Invoice can be **exported as PDF** using `jsPDF` + `html2canvas`
- Invoices include: buyer business details, itemized table, GST amount, grand total

### 5. Google OAuth Integration
- Uses official Google Identity Services
- Frontend: `@react-oauth/google` library handles the Google button & popup
- Backend: `google-auth-library` package verifies the Google ID token server-side
- New Google users are asked for business name and role before being created

### 6. Order Lifecycle
```
Order Placed (Processing) → Shipped → Delivered
                         ↘ Cancelled (only from Processing)
```
Payment status: `Pending → Completed / Failed`

### 7. Data Security
- Passwords never stored in plain text — always bcrypt hashed with 10 salt rounds
- JWT tokens are signed with a secret key (stored in `.env`, never exposed)
- `.env` files and `node_modules` are in `.gitignore` so secrets are not pushed to GitHub
- Orders and cart data are user-isolated — users can only access their own data

---

## 11. Git Branches

| Branch | Purpose |
|---|---|
| `main` | Main production-ready code |
| `backend` | Backend API code (may be isolated) |
| `supplier-dashboard-ui` | Supplier UI development |
| `buyer_dashboard` | Buyer UI development |

Remote repository: `https://github.com/akhila-220207/B2B--inventory-billing-system.git`

---

## 12. Common Interview/Faculty Questions & Answers

**Q: What type of application is this?**
A: It is a Full-Stack MERN application — MongoDB, Express.js, React, Node.js — designed for B2B (Business-to-Business) commerce where businesses buy supplies from wholesale suppliers.

**Q: How is authentication implemented?**
A: Using JWT (JSON Web Tokens). On login, the server signs a token containing the user's `id`, `role`, and `business` and sends it to the frontend. The frontend stores it in `localStorage` and attaches it to every API request as a `Bearer` token in the `Authorization` header. The backend verifies it using `jwt.verify()`.

**Q: How are passwords stored securely?**
A: Passwords are hashed using `bcryptjs` with 10 salt rounds before storing in MongoDB. During login, `bcrypt.compare()` is used to check the submitted password against the hash without ever decrypting it.

**Q: What is the role of Context API in this project?**
A: React's Context API is used for global state management without needing Redux. `AppContext.jsx` provides cart items, orders, user profile, and notifications to all components in the component tree. Any component can call `useApp()` to access this shared state.

**Q: How does the Google OAuth work?**
A: 1) User clicks "Sign in with Google" on the frontend → Google returns an ID token. 2) Frontend sends this token to `POST /api/auth/google`. 3) Backend verifies the token with Google's servers using `google-auth-library`. 4) If user exists in your database → issue JWT. If new user → frontend collects business details and sends to `/api/auth/google/complete` to create the account.

**Q: How is role-based routing done?**
A: After login, the API returns the user's `role` (`buyer` or `supplier`). The frontend saves it in `localStorage` and redirects to the appropriate dashboard (`/buyer-dashboard` or `/supplier-dashboard`). The `ProtectedRoute` component checks for a valid token before allowing access.

**Q: How are invoices generated?**
A: The `InvoicePage.jsx` renders a complete GST invoice as HTML. When the user clicks "Download PDF", `html2canvas` captures the rendered HTML as an image, and `jsPDF` converts it to a downloadable PDF file — all done client-side.

**Q: Why did you use MongoDB instead of a SQL database?**
A: MongoDB was chosen because: (1) The product schema varies by category, making a flexible document model more suitable. (2) Cart and order items are naturally nested sub-documents. (3) MongoDB Atlas provides easy cloud hosting. (4) Mongoose provides schema validation while keeping the flexibility of NoSQL.

**Q: What is the data flow when a buyer places an order?**
A: 1) Buyer adds items to cart (stored in AppContext + localStorage). 2) Goes to Checkout and enters shipping address. 3) `placeOrder()` in AppContext sends a `POST /api/orders` request with all cart items, calculates 5% GST, and includes total + address. 4) Backend saves the order to MongoDB. 5) Frontend clears the cart and adds the new order to the local orders state. 6) Buyer is redirected to the order tracking page.

**Q: How does the supplier see orders placed for their products?**
A: Orders in MongoDB contain a `supplierId` field in each item (the supplier's user ID). On the supplier orders page, the frontend fetches all orders and filters the items to show only those where `item.supplierId === current supplier's ID`.

**Q: What happens if MongoDB connection fails?**
A: In `server.js`, the `.catch()` block still starts the Express server without the database and logs a warning. API calls will return errors, but the server itself stays running.

**Q: What is `concurrently` used for?**
A: It is an npm package that allows running multiple npm scripts simultaneously in one terminal. The `npm run dev` command in the root `package.json` uses it to start both the React dev server (port 3000) and the Express backend (port 5000) at the same time.

**Q: Why are there two cart contexts (AppContext and CartContext)?**
A: `CartContext` was built first to sync directly with the backend API. `AppContext` was created later to be a unified global state that combines cart, orders, profile, and notifications. The `AppContext` cart uses `localStorage` for speed, while `CartContext` is the backend-synced version. Both exist in the codebase for compatibility.

**Q: What is the `start.bat` file?**
A: It is a Windows Batch script that starts both the frontend and backend servers with a single double-click, useful for development on Windows without needing to open two separate terminal windows.

---

*Document prepared for: B2B Inventory & Billing System (Inventa Fresh)*
*Repository: https://github.com/akhila-220207/B2B--inventory-billing-system*
