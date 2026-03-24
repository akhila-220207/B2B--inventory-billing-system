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

          <a className="px-10 py-4 bg-slate-800 rounded-full hover:bg-slate-700 glow-btn inline-block" href="#features">
            Explore
          </a>
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
      <section id="features" className="relative z-10 py-24 fade-in">
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
        <div className="max-w-7xl mx-auto px-10">
          <h2 className="text-4xl font-black text-blue-400 mb-4 tracking-tight">What Users Say</h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto">Don't just take our word for it. Hear from the businesses that use our platform daily.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-xl relative text-left group">
              <span className="absolute -top-6 -left-2 text-7xl text-blue-500/20 font-serif font-black group-hover:text-blue-500/40 transition-colors">"</span>
              <p className="text-slate-300 leading-relaxed mb-8 relative z-10 italic">
                "InventaB2B completely transformed our inventory workflow. The automated stock alerts alone have saved us thousands in potential lost sales."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-white text-md">Sarah Jenkins</h4>
                  <p className="text-blue-400 text-[11px] uppercase tracking-wider font-bold mt-0.5">RetailCo</p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-xl relative text-left group">
              <span className="absolute -top-6 -left-2 text-7xl text-blue-500/20 font-serif font-black group-hover:text-blue-500/40 transition-colors">"</span>
              <p className="text-slate-300 leading-relaxed mb-8 relative z-10 italic">
                "Billing used to be our biggest headache. Now, it takes seconds. The integrated GST invoicing is flawless and keeps us entirely compliant."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-white text-md">Rahul Sharma</h4>
                  <p className="text-blue-400 text-[11px] uppercase tracking-wider font-bold mt-0.5">TechDistributors</p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-xl relative text-left group">
              <span className="absolute -top-6 -left-2 text-7xl text-blue-500/20 font-serif font-black group-hover:text-blue-500/40 transition-colors">"</span>
              <p className="text-slate-300 leading-relaxed mb-8 relative z-10 italic">
                "We manage over 5 warehouses directly through this platform. The real-time tracking is second to none, highly recommend to any modern wholesaler."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-white text-md">Michael Chen</h4>
                  <p className="text-blue-400 text-[11px] uppercase tracking-wider font-bold mt-0.5">GlobalGoods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 text-center fade-in">
        <h2 className="text-4xl text-blue-400 mb-6">
          Ready to Grow Your Business?
        </h2>

        <Link className="px-10 py-4 bg-blue-700 rounded-full hover:bg-blue-800 glow-btn" to="/register">
          Start Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-slate-900 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Logo and About */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-black text-blue-400 tracking-tighter mb-4">
                Inventa<span className="text-white">B2B</span>
              </h2>
              <p className="text-slate-400 text-sm leading-loose mb-6">
                The ultimate smart B2B inventory platform. Manage products, orders, billing, and inventory all in one place.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 shadow-lg">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 shadow-lg">
                  <FaTwitter size={18} />
                </a>
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 shadow-lg">
                  <FaFacebook size={18} />
                </a>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Platform</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Features</a></li>
                <li><Link to="/buyer-dashboard/marketplace" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Marketplace</Link></li>
                <li><Link to="/register" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Supplier Portal</Link></li>
                <li><Link to="/login" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Sign In</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Cookie Guidelines</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} InventaB2B. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
              Built with love for b2b success
            </p>
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