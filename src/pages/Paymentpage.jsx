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
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">

      <div className="w-[900px] bg-white rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white p-4 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">easebuzz.in</h2>
            <p className="text-xs opacity-80">T ID: ELOF472D</p>
          </div>
          <div className="text-sm bg-white/20 px-3 py-1 rounded-lg">
            Payment Link valid for 15:30
          </div>
        </div>

        <div className="flex">

          {/* LEFT PANEL */}
          <div className="w-1/3 bg-gray-50 p-4 border-r">

            <p className="text-gray-500 text-sm mb-3">
              Select Payment Method
            </p>

            <div
              onClick={() => setMethod("card")}
              className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer ${
                method === "card"
                  ? "bg-indigo-100 border"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>Credit Card</span>
              <span>💳</span>
            </div>

            <div
              onClick={() => setMethod("debit")}
              className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer ${
                method === "debit"
                  ? "bg-indigo-100 border"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>Debit Card</span>
              <span>💳</span>
            </div>

            <div
              onClick={() => setMethod("upi")}
              className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer ${
                method === "upi"
                  ? "bg-indigo-100 border"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>UPI</span>
              <span>📱</span>
            </div>

            <div
              onClick={() => setMethod("netbanking")}
              className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer ${
                method === "netbanking"
                  ? "bg-indigo-100 border"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>Net Banking</span>
              <span>🏦</span>
            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="w-2/3 p-6">

            <h3 className="text-gray-600 text-sm mb-4">
              Enter Card Details
            </h3>

            {/* ✅ FIXED HERE */}
            {(method === "card" || method === "debit") && (
              <>
                <input
                  placeholder="Card Number"
                  className="w-full border p-3 rounded-lg mb-3"
                />

                <div className="flex gap-3 mb-3">
                  <input
                    placeholder="MM/YY"
                    className="w-1/3 border p-3 rounded-lg"
                  />
                  <input
                    placeholder="CVV"
                    className="w-1/3 border p-3 rounded-lg"
                  />
                </div>

                <input
                  placeholder="Card Holder Name"
                  className="w-full border p-3 rounded-lg"
                />
              </>
            )}

            {method === "upi" && (
              <div className="text-center">
                <img
                  className="mx-auto mb-4"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?am=${amount}`}
                  alt="QR"
                />
                <input
                  placeholder="Enter UPI ID"
                  className="w-full border p-3 rounded-lg"
                />
              </div>
            )}

            {method === "netbanking" && (
              <select className="w-full border p-3 rounded-lg">
                <option>Select Bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
              </select>
            )}

            {/* FOOTER */}
            <div className="mt-10 border-t pt-4">

              <div className="bg-green-100 text-green-700 text-sm p-2 rounded mb-3">
                Offers Available
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold"
              >
                Pay ₹{amount}
              </button>

              <p className="text-xs text-gray-400 mt-3 text-center">
                By proceeding, you agree to terms & conditions
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