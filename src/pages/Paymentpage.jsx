import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  const items = orderData?.items || [];
  const amount = orderData?.totalAmount ?? 0;
  const shippingAddress = orderData?.shippingAddress || "";

  const [method, setMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [upiId, setUpiId] = useState("");
  const [netbankingBank, setNetbankingBank] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const validationError = () => {
    if (!orderData || items.length === 0) {
      return "No order details found. Please go to checkout and try again.";
    }

    if (method === "card" || method === "debit") {
      if (!/^[0-9]{13,19}$/.test(cardNumber.replace(/\s/g, ""))) {
        return "Please enter a valid card number (13-19 digits).";
      }
      if (!/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(expiry)) {
        return "Please enter a valid expiry date (MM/YY or MM/YYYY).";
      }
      if (!/^[0-9]{3,4}$/.test(cvv)) {
        return "Please enter a valid CVV (3 or 4 digits).";
      }
      if (!cardHolder.trim()) {
        return "Please enter card holder name.";
      }
    }

    if (method === "upi") {
      if (!/^[\w.-]+@[a-zA-Z0-9.-]+$/.test(upiId.trim())) {
        return "Please enter a valid UPI ID (e.g., name@bank).";
      }
    }

    if (method === "netbanking" && !netbankingBank) {
      return "Please select your bank for net banking.";
    }

    return "";
  };

  const handlePayment = async () => {
    setError("");
    const validation = validationError();
    if (validation) {
      setError(validation);
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.productId || item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            supplier: item.supplier,
            supplierId: item.supplierId,
            image: item.image
          })),
          totalAmount: amount,
          shippingAddress,
          paymentMethod: method,
          paymentStatus: "Completed"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed. Please try again.");
      }

      toast.success("Payment successful! Order placed successfully.");

      // Signal all dashboards to refresh after a new order
      localStorage.setItem("ordersUpdatedAt", Date.now().toString());
      window.dispatchEvent(new Event("orders-updated"));

      setTimeout(() => {
        navigate(`/order-tracking/${data._id}`, { replace: true });
      }, 900);
    } catch (err) {
      console.error(err);
      setError(err.message || "Payment failed. Please retry.");
      toast.error(err.message || "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
          <h3 className="text-xl font-bold mb-3">No order found</h3>
          <p className="text-sm text-gray-500 mb-6">Please complete your checkout before making a payment.</p>
          <button
            onClick={() => navigate("/buyer-dashboard/checkout")}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl"
          >
            Go to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6 transition-all">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white p-5 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">easebuzz.in</h2>
            <p className="text-xs opacity-80">Txn ID: {orderData?.txnId || "ELOF" + Date.now().toString().slice(-6)}</p>
          </div>
          <div className="text-sm bg-white/20 px-4 py-1 rounded-full">Valid for 15:00</div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 bg-gray-50 p-5 border-r">
            <p className="text-gray-500 text-sm mb-4 font-semibold">Payment Methods</p>
            {[
              { id: "card", label: "Credit Card 💳" },
              { id: "debit", label: "Debit Card 💳" },
              { id: "upi", label: "UPI 📱" },
              { id: "netbanking", label: "Net Banking 🏦" }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMethod(item.id)}
                className={`flex justify-between items-center w-full p-3 mb-2 rounded-lg text-left transition ${
                  method === item.id ? "bg-indigo-100 border border-indigo-400" : "hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{item.label}</span>
                {method === item.id && <span className="text-xs text-indigo-500">Selected</span>}
              </button>
            ))}

            <div className="mt-6 p-3 rounded-xl bg-white border border-emerald-100 text-emerald-700 text-xs">
              For business orders, payment confirmation is instant and inventory is reserved immediately.
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs rounded-xl">
              Support: <a href="mailto:support@easebuzz.in" className="underline">support@easebuzz.in</a>
            </div>
          </div>

          <div className="w-full lg:w-2/3 p-8">
            <h3 className="text-gray-700 font-semibold mb-3">
              {method === "upi" ? "Pay using UPI" : method === "netbanking" ? "Net Banking" : "Enter Card Details"}
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            {(method === "card" || method === "debit") && (
              <>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  placeholder="Card Number"
                  className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className="flex gap-4 mb-4">
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength={7}
                    placeholder="MM/YY"
                    className="w-1/2 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={4}
                    placeholder="CVV"
                    type="password"
                    className="w-1/2 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <input
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Card Holder Name"
                  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
                />
              </>
            )}

            {method === "upi" && (
              <>
                <div className="text-center mb-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=easebuzz@icici&pn=Easebuzz&am=${amount}&tn=OrderPayment`}
                    alt="QR Code"
                    className="mx-auto"
                  />
                </div>
                <input
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID"
                  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
                />
              </>
            )}

            {method === "netbanking" && (
              <select
                value={netbankingBank}
                onChange={(e) => setNetbankingBank(e.target.value)}
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
                <option>Axis</option>
                <option>PNB</option>
              </select>
            )}

            <div className="mt-10 border-t pt-5">
              <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4">
                🎉 Offers available for selected payment method. No extra transaction charges.
              </div>

              <button
                onClick={handlePayment}
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? "bg-gray-400" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"} text-white py-3 rounded-xl font-semibold text-lg transition`}
              >
                {isSubmitting ? "Processing Payment..." : `Pay ₹${amount.toLocaleString("en-IN")}`}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                By proceeding, you agree to Terms & Conditions and Refund Policy.
              </p>

              <p className="text-xs text-gray-400 text-right mt-2">Powered by Easebuzz</p>
            </div>

            <div className="mt-5 text-xs text-gray-500">
              <p>Total Items: {items.length}</p>
              <p>Shipping Address: {shippingAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
