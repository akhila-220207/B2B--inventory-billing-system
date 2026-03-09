import { Link } from "react-router-dom";
import FeaturesPage from "./FeaturesPage";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import bg from "../backgroundimage.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">Inventa</h1>
        <nav className="space-x-4">
          <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-12 py-16">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Smart B2B Inventory & Billing Platform
          </h2>
          <p className="text-gray-600 mb-6">
            Manage Products, Orders, Billing, and Inventory in One Enterprise Workspace.
            Designed for supplier and buyer workflows, Inventa helps your team handle
            marketplace operations with fast billing, GST invoices, barcode checkout,
            and actionable reports.
          </p>
          <div className="space-x-4">
            <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
              Get Started
            </Link>
            <Link to="/buyer-dashboard/marketplace" className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Explore Products
            </Link>
          </div>
        </div>

        {/* Placeholder Image */}
        <div className="mt-10 md:mt-0 md:ml-12">
          <div className="w-96 h-64 bg-gray-300 flex items-center justify-center rounded-lg shadow">
            <span className="text-gray-700">[Illustration / Image]</span>
          </div>
        </div>
      </main>

      {/* Statistics Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold">500+</div>
              <p className="text-blue-100">Products Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold">100+</div>
              <p className="text-blue-100">Active Suppliers</p>
            </div>
            <div>
              <div className="text-4xl font-bold">2000+</div>
              <p className="text-blue-100">Orders Processed</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Setup</h3>
              <p className="text-gray-600">Create your business account as a buyer or supplier and set up your profile.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Trade</h3>
              <p className="text-gray-600">Browse products, place orders, manage inventory, and handle billing seamlessly.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Grow</h3>
              <p className="text-gray-600">Monitor orders, view reports, and scale your business with actionable insights.</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturesPage />


      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Left side */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Inventa</h2>
            <p className="text-sm text-blue-100">Smart B2B Inventory & Billing Platform</p>
          </div>

          {/* Center links */}
          <div className="flex space-x-6 text-sm">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/login" className="hover:text-blue-200">Login</Link>
            <Link to="/register" className="hover:text-blue-200">Register</Link>
            <a href="#features" className="hover:text-blue-200">Features</a>
          </div>
          {/* Right side: Social Media */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
              <FaLinkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
              <FaTwitter size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center text-sm text-blue-100 mt-6">
          © {new Date().getFullYear()} Inventa. All rights reserved.
        </div>
      </footer>
    </div>
  );
}


 