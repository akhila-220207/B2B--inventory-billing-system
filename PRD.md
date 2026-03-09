# Product Requirement Document (PRD)

## Project Title
**Inventory Billing System**

---

## 1. Project Overview

The Inventory Billing System is a web-based application designed to help small and medium businesses manage their inventory, suppliers, billing, and sales reports efficiently.

The system allows users to:
- Manage products and stock
- Generate purchase and sales invoices
- Calculate GST automatically
- Track low-stock alerts
- View sales reports

The goal is to simplify inventory management and billing operations.

---

## 2. Problem Statement

Small businesses often manage inventory manually using notebooks or spreadsheets, which can cause:
- Inventory mismanagement
- Billing errors
- Difficulty in tracking sales
- No automatic tax calculation
- Lack of reporting

The proposed system solves these issues through automation and centralized management.

---

## 3. Objectives

The main objectives of the system are:
- Provide an easy interface to manage inventory
- Generate automated invoices
- Calculate GST automatically
- Track stock levels
- Provide sales insights through reports

---

## 4. Target Users

**Primary users:**
- Small shop owners
- Wholesale traders
- Retail businesses
- Small distributors

---

## 5. Key Features

### 5.1 User Authentication
Users must log in to access the system.

**Features:**
- User registration
- Secure login
- JWT authentication
- Logout functionality

### 5.2 Product Management
Users can manage inventory items.

**Functions:** Add, Edit, Delete, View products, Track stock

**Product Fields:** Product ID, Product Name, Category, Price, Quantity, Supplier

### 5.3 Supplier Management
Users can manage suppliers.

**Functions:** Add, Edit, Delete, View suppliers

**Supplier Fields:** Supplier ID, Supplier Name, Phone Number, Email, Address

### 5.4 Purchase Management
Users can record purchases made from suppliers.

**Functions:**
- Create purchase invoice
- Update stock automatically
- Save purchase history

### 5.5 Sales / Billing System
Users can generate sales invoices.

**Functions:** Create invoice, Add multiple products, Calculate totals, Apply GST, Print/Download invoice

**Invoice Fields:** Invoice ID, Customer Name, Products, Quantity, Price, GST, Total Amount, Date

### 5.6 GST / Tax Calculation
The system automatically calculates GST.

```
Subtotal = Sum of product prices
GST      = 18% of Subtotal
Total    = Subtotal + GST
```

### 5.7 Low Stock Alerts
> If stock < minimum level → show alert

### 5.8 Sales Reports
Users can view:
- Daily sales
- Monthly sales
- Top selling products
- Total revenue (displayed using charts)

---

## 6. Functional Requirements

| ID  | Requirement                              |
|-----|------------------------------------------|
| FR1 | User should register and login           |
| FR2 | User should manage products              |
| FR3 | User should manage suppliers             |
| FR4 | User should create purchase invoices     |
| FR5 | User should generate sales invoices      |
| FR6 | System should calculate GST automatically|
| FR7 | System should show low stock alerts      |
| FR8 | System should generate sales reports     |

---

## 7. Non-Functional Requirements

| Category    | Details                                          |
|-------------|--------------------------------------------------|
| Performance | System should respond within 2 seconds           |
| Security    | Password encryption, JWT auth, Secure DB         |
| Usability   | Simple UI, Easy navigation                       |
| Scalability | System should support multiple users             |

---

## 8. Technology Stack

| Layer    | Technologies                            |
|----------|-----------------------------------------|
| Frontend | React.js, HTML, CSS, JavaScript         |
| Backend  | Node.js, Express.js                     |
| Database | MongoDB / MySQL                         |
| Tools    | Postman (API testing), GitHub (version control) |

---

## 9. System Architecture

```
Frontend (React)
        ↓
Backend (Node.js / Express)
        ↓
Database (MongoDB / MySQL)
```

---

## 10. Database Tables

### Users
- user_id, name, email, password

### Products
- product_id, name, price, quantity, supplier_id

### Suppliers
- supplier_id, name, phone, email

### Invoices
- invoice_id, date, total_amount

### Invoice_Items
- invoice_item_id, invoice_id, product_id, quantity

---

## 11. Future Enhancements

- Barcode scanning
- Mobile app
- Payment gateway integration
- Multi-store support
- AI sales prediction

---

## 12. Success Criteria

The system will be successful if:
- Users can easily manage inventory
- Billing becomes faster
- Stock tracking becomes accurate
- Reports help in business decisions
