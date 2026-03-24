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
  FaUsers,
  FaStar
} from "react-icons/fa";

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

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bac.jpg"
          alt="background"
          className="w-full min-h-screen object-cover opacity-20"
        />
      </div>

      {/* OFFER BAR */}
      <div className="relative z-10 bg-blue-900 py-3 overflow-hidden">
        <div className="marquee text-sm whitespace-nowrap">
          🔥 30% OFF Bulk Orders | 🚚 Free Delivery Above ₹5000 | ⭐ Trusted by 500+ Businesses | 📦 10,000+ Products Available
        </div>
      </div>

      {/* NAVBAR */}
      <header className="relative z-10 flex justify-between items-center px-10 py-5 bg-slate-900/80 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-blue-400">Welcome to Inventa</h1>

        <nav className="space-x-4">
          <Link className="px-4 py-2 text-gray-300 hover:text-blue-400" to="/login">
            Login
          </Link>

          <Link className="px-6 py-2 bg-blue-700 rounded-full hover:bg-blue-800" to="/register">
            Register
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <main className="relative z-10 text-center px-10 py-40 fade-in">
        <h2 className="text-7xl font-extrabold text-blue-400 mb-6 text-glow">
          Smart B2B Inventory Platform
        </h2>

        <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-10">
          Manage Products, Orders, Billing, and Inventory in one powerful system.
        </p>

        <div className="flex justify-center gap-6">
          <Link className="px-10 py-4 bg-blue-700 rounded-full hover:bg-blue-800 glow-btn" to="/register">
            Get Started
          </Link>

          <Link className="px-10 py-4 bg-slate-800 rounded-full hover:bg-slate-700 glow-btn" to="/buyer-dashboard/marketplace">
            Explore
          </Link>
        </div>
      </main>

      {/* STATS */}
      <section className="relative z-10 py-20 bg-slate-900/60 fade-in">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-10">

          <div className="stat-card">
            <h3 className="text-4xl font-bold text-blue-400">500+</h3>
            <p>Businesses</p>
          </div>

          <div className="stat-card">
            <h3 className="text-4xl font-bold text-blue-400">10K+</h3>
            <p>Products</p>
          </div>

          <div className="stat-card">
            <h3 className="text-4xl font-bold text-blue-400">99%</h3>
            <p>Accuracy</p>
          </div>

          <div className="stat-card">
            <h3 className="text-4xl font-bold text-blue-400">24/7</h3>
            <p>Support</p>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-24 fade-in">
        <h2 className="text-4xl text-center text-blue-400 mb-16">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-10 px-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`feature-card p-6 rounded-2xl border ${
                activeIcon === i ? "active-card" : "border-blue-800"
              }`}
            >
              <div
                onClick={() => setActiveIcon(i)}
                className={`flex justify-center mb-4 cursor-pointer ${
                  activeIcon === i ? "icon-active" : "text-blue-400"
                }`}
              >
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-24 bg-slate-900/60 text-center fade-in">
        <h2 className="text-4xl text-blue-400 mb-12">What Users Say</h2>

        <div className="grid md:grid-cols-3 gap-10 px-10">
          {[1,2,3].map((t) => (
            <div key={t} className="p-6 bg-slate-800 rounded-xl hover:scale-105 transition">
              <FaStar className="text-yellow-400 mb-3" />
              <p className="text-gray-300">
                "This platform completely transformed our inventory workflow!"
              </p>
              <h4 className="mt-4 font-bold">Client {t}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 text-center fade-in">
        <h2 className="text-4xl text-blue-400 mb-6">
          Ready to Grow Your Business?
        </h2>

        <Link className="px-10 py-4 bg-blue-700 rounded-full hover:bg-blue-800 glow-btn">
          Start Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-slate-900 py-10">
        <div className="flex justify-between px-10">
          <h2 className="text-blue-400">Inventa</h2>

          <div className="flex gap-5">
            <FaLinkedin />
            <FaTwitter />
            <FaFacebook />
          </div>
        </div>
      </footer>

      {/* STYLES */}
      <style>{`
      .marquee{
        display:inline-block;
        padding-left:100%;
        animation:marquee 18s linear infinite;
      }
      @keyframes marquee{
        0%{transform:translateX(0)}
        100%{transform:translateX(-100%)}
      }

      .text-glow{
        text-shadow:0 0 15px rgba(59,130,246,0.7);
      }

      /* REDUCED ROUND STATS */
      .stat-card{
        border:2px solid rgba(59,130,246,0.6);
        padding:12px;
        border-radius:15px;
        transition:0.3s;
      }
      .stat-card:hover{
        transform:scale(1.05);
        box-shadow:0 0 15px rgba(59,130,246,0.6);
      }

      /* FEATURE ANIMATION */
      .feature-card{
        transition: all 0.4s ease;
        background: rgba(15,23,42,0.8);
      }
      .feature-card:hover{
        transform: translateY(-10px) scale(1.05);
        box-shadow:0 0 25px rgba(59,130,246,0.6);
      }

      .active-card{
        border:2px solid #3b82f6;
        box-shadow:0 0 20px rgba(59,130,246,0.7);
        transform:scale(1.05);
      }

      .icon-active{
        color:#3b82f6;
        animation:pulse 1s infinite;
      }

      @keyframes pulse{
        0%{transform:scale(1)}
        50%{transform:scale(1.2)}
        100%{transform:scale(1)}
      }

      .fade-in{
        animation:fadeIn 1.2s ease-in;
      }
      @keyframes fadeIn{
        from{opacity:0; transform:translateY(30px)}
        to{opacity:1; transform:translateY(0)}
      }
      `}</style>
    </div>
  );
}