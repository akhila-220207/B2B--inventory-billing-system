import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BuyerDashboard from "./pages/BuyerDashboard";
import BuyerOverview from "./pages/BuyerOverview";
import MarketplacePage from "./pages/MarketplacePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import InvoicesListPage from "./pages/InvoicesListPage";
import InvoicePage from "./pages/InvoicePage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import SupplierProfilePage from "./pages/SupplierProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SupplierHomePage from "./pages/supplier/SupplierHomePage";
import ProductsPage from "./pages/supplier/ProductsPage";
import InventoryPage from "./pages/supplier/InventoryPage";
import SupplierOrdersPage from "./pages/supplier/OrdersPage";
import BillingPage from "./pages/supplier/BillingPage";
import SupplierReportsPage from "./pages/supplier/ReportsPage";
import SupplierSettingsPage from "./pages/supplier/SettingsPage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/buyer-dashboard" element={<BuyerDashboard />}>
          <Route index element={<BuyerOverview />} />
          <Route path="marketplace" element={<MarketplacePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="invoices" element={<InvoicesListPage />} />
          <Route path="invoice/:orderId" element={<InvoicePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/supplier-dashboard" element={<SupplierDashboard />}>
          <Route index element={<SupplierHomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="orders" element={<SupplierOrdersPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="reports" element={<SupplierReportsPage />} />
          <Route path="settings" element={<SupplierSettingsPage />} />
        </Route>
        <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
        <Route path="/supplier-profile/:supplierId" element={<SupplierProfilePage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
      </Routes>
    </Router>
  );
}