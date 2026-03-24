import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const orderData = location.state;
  const amount = orderData?.totalAmount || 100;

  const [method, setMethod] = useState("card");

  const handlePayment = async () => {
    try {
      await fetch("http://127.0.0.1:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ...orderData,
          paymentMethod: method,
          paymentStatus: "Paid"
        })
      });

      alert("Transaction Successful");
    } catch {
      alert("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white p-5 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">easebuzz.in</h2>
            <p className="text-xs opacity-80">Txn ID: ELOF472D</p>
          </div>
          <div className="text-sm bg-white/20 px-4 py-1 rounded-full">
            Valid for 15:30
          </div>
        </div>

        <div className="flex">

          {/* LEFT PANEL */}
          <div className="w-1/3 bg-gray-50 p-5 border-r">

            <p className="text-gray-500 text-sm mb-4 font-semibold">
              Payment Methods
            </p>

            {[
              { id: "card", label: "Credit Card 💳" },
              { id: "debit", label: "Debit Card 💳" },
              { id: "upi", label: "UPI 📱" },
              { id: "netbanking", label: "Net Banking 🏦" }
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setMethod(item.id)}
                className={`flex justify-between items-center p-3 mb-2 rounded-lg cursor-pointer transition ${
                  method === item.id
                    ? "bg-indigo-100 border border-indigo-400"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </div>
            ))}

          </div>

          {/* RIGHT PANEL */}
          <div className="w-2/3 p-8">

            <h3 className="text-gray-700 font-semibold mb-5">
              {method === "upi"
                ? "Pay using UPI"
                : method === "netbanking"
                ? "Select Your Bank"
                : "Enter Card Details"}
            </h3>

            {/* CARD + DEBIT */}
            {(method === "card" || method === "debit") && (
              <>
                <input
                  placeholder="Card Number"
                  className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <div className="flex gap-4 mb-4">
                  <input
                    placeholder="MM/YY"
                    className="w-1/2 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    placeholder="CVV"
                    className="w-1/2 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <input
                  placeholder="Card Holder Name"
                  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
                />
              </>
            )}

            {/* UPI */}
            {method === "upi" && (
              <div className="text-center">
                <div className="bg-white p-4 rounded-xl shadow inline-block mb-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?am=${amount}`}
                    alt="QR"
                  />
                </div>

                <input
                  placeholder="Enter UPI ID"
                  className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            )}

            {/* NET BANKING */}
            {method === "netbanking" && (
              <select className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400">
                <option>Select Bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
              </select>
            )}

            {/* FOOTER */}
            <div className="mt-10 border-t pt-5">

              <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4">
                🎉 Offers Available on this payment
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition"
              >
                Pay ₹{amount}
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center">
                By proceeding, you agree to Terms & Conditions
              </p>

              <p className="text-xs text-gray-400 text-right mt-2">
                Powered by Easebuzz
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}