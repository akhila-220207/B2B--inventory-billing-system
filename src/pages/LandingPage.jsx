import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaBoxOpen,
  FaClipboardList,
  FaChartBar,
  FaFileInvoice,
  FaWarehouse,
  FaUserPlus,
  FaShoppingCart,
  FaTruck
} from "react-icons/fa";

import bg from "../backgroundimage.jpg";

export default function LandingPage() {

  const [activeIcon, setActiveIcon] = useState(null);

  const features = [
    {
      icon: <FaBoxOpen size={36} />,
      title: "Product Management",
      desc: "Manage products, categories, images, and stock info with ease.",
    },
    {
      icon: <FaClipboardList size={36} />,
      title: "Order Management",
      desc: "Track, approve, and manage all incoming and outgoing orders.",
    },
    {
      icon: <FaFileInvoice size={36} />,
      title: "Billing & Invoices",
      desc: "Generate GST-compliant invoices and manage payments seamlessly.",
    },
    {
      icon: <FaChartBar size={36} />,
      title: "Reports & Analytics",
      desc: "Get insights with colorful dashboards and actionable reports.",
    },
    {
      icon: <FaWarehouse size={36} />,
      title: "Inventory Tracking",
      desc: "Monitor stock levels and manage warehouses.",
    },
  ];

  const handleMouseMove = (e) => {
    const glow = document.querySelector(".cursor-glow");

    if (glow) {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }

    const spark = document.createElement("div");
    spark.className = "spark";

    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";

    spark.style.setProperty("--x", (Math.random() * 100 - 50) + "px");
    spark.style.setProperty("--y", (Math.random() * 100 - 50) + "px");

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 800);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col bg-slate-950 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      <div className="cursor-glow"></div>

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt="background"
          className="w-full min-h-screen object-cover object-center opacity-20"
        />
      </div>

      {/* OFFER BAR */}
      <div className="relative z-10 bg-blue-900 text-white py-3 overflow-hidden">
        <div className="marquee text-sm font-medium whitespace-nowrap">
          🔥 30% OFF Bulk Orders | 🚚 Free Delivery Above ₹5000 | ⭐ Trusted by 500+ Businesses | 📦 10,000+ Products Available
        </div>
      </div>

      {/* NAVBAR */}
      <header className="relative z-10 flex justify-between items-center px-8 py-4 bg-slate-900/80 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-blue-400">
          Welcome to Inventa..
        </h1>

        <nav className="space-x-4">
          <Link
            className="px-4 py-2 text-gray-300 hover:text-blue-400 transition"
            to="/login"
          >
            Login
          </Link>

          <Link
            className="px-4 py-2 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition"
            to="/register"
          >
            Register
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-12 py-32">

        <h2 className="text-6xl font-extrabold text-blue-400 mb-6 hero-float text-glow">
          Smart B2B Inventory & Billing Platform
        </h2>

        <p className="text-gray-300 text-xl max-w-3xl mb-10">
          Manage Products, Orders, Billing, and Inventory in One Enterprise Workspace.
          Designed for supplier and buyer workflows with fast billing,
          GST invoices, barcode checkout, and powerful analytics.
        </p>

        <div className="flex space-x-6">

          <Link
            className="px-8 py-4 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition fast-float glow-btn"
            to="/register"
          >
            Get Started
          </Link>

          <Link
            className="px-8 py-4 bg-slate-800 text-white rounded-full shadow-lg hover:bg-slate-700 transition fast-float glow-btn"
            to="/buyer-dashboard/marketplace"
          >
            Explore Products
          </Link>

        </div>

      </main>

      {/* FEATURES */}
      <section className="relative z-10 py-20">

        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-400">
            Platform Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 px-10">

          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-blue-800 shadow-lg glow-card fade-in bg-slate-900/80 backdrop-blur"
            >

              <div
                onClick={() => setActiveIcon(i)}
                className={`flex items-center justify-center w-20 h-20 rounded-full border border-blue-700 mb-4 mx-auto text-blue-400 cursor-pointer ${
                  activeIcon === i ? "icon-float" : ""
                }`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>

            </div>
          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-slate-900 py-8">

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <h2 className="text-lg font-semibold text-blue-400">Inventa</h2>

          <div className="flex space-x-6 text-sm">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

          <div className="flex space-x-4">
            <FaLinkedin size={20}/>
            <FaTwitter size={20}/>
            <FaFacebook size={20}/>
          </div>

        </div>
        {/* TESTIMONIALS */}
<section className="relative z-10 py-20">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-blue-400 mb-12">
      What Businesses Say
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
        <p className="text-gray-300 mb-4">
          "Inventa completely changed how we manage inventory and billing.
          The platform is fast and reliable."
        </p>
        <h4 className="font-bold text-blue-400">Rajesh Traders</h4>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
        <p className="text-gray-300 mb-4">
          "Managing suppliers and orders is now extremely easy.
          Highly recommended for wholesale businesses."
        </p>
        <h4 className="font-bold text-blue-400">Sharma Wholesale</h4>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
        <p className="text-gray-300 mb-4">
          "The analytics dashboard helped us track our sales growth clearly."
        </p>
        <h4 className="font-bold text-blue-400">Metro Supplies</h4>
      </div>

    </div>
  </div>
</section>


{/* PRICING */}
<section className="relative z-10 py-20 bg-slate-900/90">
  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-4xl font-bold text-blue-400 mb-12">
      Simple Pricing
    </h2>

    <div className="grid md:grid-cols-3 gap-10">

      <div className="bg-slate-800 p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Starter</h3>
        <p className="text-4xl font-bold mb-6">Free</p>
        <ul className="text-gray-400 space-y-2 mb-6">
          <li>Basic Inventory</li>
          <li>Order Tracking</li>
          <li>Limited Reports</li>
        </ul>
        <Link
          to="/register"
          className="px-6 py-3 bg-blue-700 rounded-full hover:bg-blue-800 transition"
        >
          Start Free
        </Link>
      </div>

      <div className="bg-blue-800 p-8 rounded-xl shadow-xl scale-105">
        <h3 className="text-2xl font-bold mb-4">Business</h3>
        <p className="text-4xl font-bold mb-6">₹999/mo</p>
        <ul className="text-white space-y-2 mb-6">
          <li>Advanced Inventory</li>
          <li>Unlimited Orders</li>
          <li>Analytics Dashboard</li>
        </ul>
        <Link
          to="/register"
          className="px-6 py-3 bg-white text-blue-800 rounded-full"
        >
          Get Started
        </Link>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
        <p className="text-4xl font-bold mb-6">Custom</p>
        <ul className="text-gray-400 space-y-2 mb-6">
          <li>All Features</li>
          <li>Priority Support</li>
          <li>Custom Integrations</li>
        </ul>
        <Link
          to="/register"
          className="px-6 py-3 bg-blue-700 rounded-full hover:bg-blue-800 transition"
        >
          Contact Us
        </Link>
      </div>

    </div>
  </div>
</section>


{/* FAQ */}
<section className="relative z-10 py-20">
  <div className="max-w-4xl mx-auto px-6">
    
    <h2 className="text-4xl font-bold text-blue-400 text-center mb-12">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6">

      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="font-bold mb-2">
          Is Inventa suitable for small businesses?
        </h3>
        <p className="text-gray-400">
          Yes. The platform is designed for both small and large wholesale
          businesses.
        </p>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="font-bold mb-2">
          Does it support GST invoices?
        </h3>
        <p className="text-gray-400">
          Yes. You can generate GST compliant invoices directly from the system.
        </p>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="font-bold mb-2">
          Can I track inventory in real time?
        </h3>
        <p className="text-gray-400">
          Yes. Inventory updates automatically when orders are placed or
          processed.
        </p>
      </div>

    </div>
  </div>
</section>


{/* CALL TO ACTION */}
<section className="relative z-10 py-20 bg-blue-900 text-center">

  <h2 className="text-4xl font-bold mb-6">
    Ready to Grow Your Business?
  </h2>

  <p className="text-lg mb-8">
    Join hundreds of businesses already using Inventa.
  </p>

  <Link
    to="/register"
    className="px-10 py-4 bg-white text-blue-900 rounded-full font-bold hover:scale-105 transition"
  >
    Create Free Account
  </Link>

</section>
<section className="bg-gray-900 text-white py-14 px-10">

        <div className="text-center">
          <h4 className="text-2xl font-bold mb-3">
            B2B Inventory Billing System
          </h4>

          <p className="text-gray-400">
            Smart solution for inventory management and B2B billing.
          </p>

          <div className="text-gray-500 mt-6">
            © 2026 B2B Inventory Billing System. All rights reserved.
          </div>
        </div>

      </section>


      </footer>

      <style>{`

      

.fast-float{
  animation: fastFloat 1.2s ease-in-out infinite;
}

@keyframes fastFloat{
  0%{transform:translateY(0)}
  50%{transform:translateY(-10px)}
  100%{transform:translateY(0)}
}

.icon-float{
  animation: iconFloat 1.4s ease-in-out infinite;
}

@keyframes iconFloat{
  0%{transform:translateY(0)}
  50%{transform:translateY(-15px)}
  100%{transform:translateY(0)}
}

.marquee{
  display:inline-block;
  padding-left:100%;
  animation:marquee 18s linear infinite;
}

@keyframes marquee{
  0%{transform:translateX(0)}
  100%{transform:translateX(-100%)}
}

.hero-float{
  animation: heroFloat 4s ease-in-out infinite;
}

@keyframes heroFloat{
  0%{transform:translateY(0)}
  50%{transform:translateY(-15px)}
  100%{transform:translateY(0)}
}

.glow-card:hover{
  transform:translateY(-10px) scale(1.05);
  box-shadow:0 0 25px rgba(59,130,246,0.6);
}

.cursor-glow{
  position:fixed;
  top:0;
  left:0;
  width:300px;
  height:300px;
  border-radius:50%;
  pointer-events:none;
  background:radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 40%, transparent 70%);
  transform:translate(-50%,-50%);
  z-index:9999;
  mix-blend-mode:screen;
  transition: transform 0.05s linear;
}

.spark{
  position:fixed;
  width:6px;
  height:6px;
  border-radius:50%;
  background:#3b82f6;
  pointer-events:none;
  z-index:9999;
  box-shadow:0 0 10px #3b82f6,0 0 20px #3b82f6;
  animation:sparkMove 0.8s linear forwards;
}

@keyframes sparkMove{
  0%{opacity:1;transform:translate(0,0) scale(1)}
  100%{opacity:0;transform:translate(var(--x),var(--y)) scale(0)}
}

.text-glow{
  text-shadow:0 0 10px rgba(59,130,246,0.7);
}

`}</style>

    </div>
  );
}