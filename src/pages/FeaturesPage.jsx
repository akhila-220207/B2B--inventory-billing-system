import { FaBoxes, FaHandshake, FaFileInvoiceDollar, FaChartLine } from "react-icons/fa";

export default function FeaturesPage() {
  const features = [
    {
      icon: <FaBoxes className="text-blue-600 text-5xl mb-4 transition-colors duration-300 group-hover:text-blue-800" />,
      title: "Smart Inventory Tracking",
      description:
        "Manage and monitor your product stock in real time. Track available quantities, receive low-stock alerts, and keep your inventory organized efficiently.",
      hoverColor: "hover:bg-blue-50",
    },
    {
      icon: <FaHandshake className="text-green-600 text-5xl mb-4 transition-colors duration-300 group-hover:text-green-800" />,
      title: "Connect Buyers & Suppliers",
      description:
        "A unified platform where suppliers list their products and buyers can easily browse, compare, and order products directly from trusted suppliers.",
      hoverColor: "hover:bg-green-50",
    },
    {
      icon: <FaFileInvoiceDollar className="text-purple-600 text-5xl mb-4 transition-colors duration-300 group-hover:text-purple-800" />,
      title: "Smart Billing & Invoicing",
      description:
        "Generate invoices instantly with automatic price calculations and GST support. Download or print professional bills for every transaction.",
      hoverColor: "hover:bg-purple-50",
    },
    {
      icon: <FaChartLine className="text-orange-600 text-5xl mb-4 transition-colors duration-300 group-hover:text-orange-800" />,
      title: "Business Insights",
      description:
        "View detailed reports and analytics on sales, orders, and inventory. Track business performance and make better decisions with real-time data.",
      hoverColor: "hover:bg-orange-50",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl ${feature.hoverColor}`}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
