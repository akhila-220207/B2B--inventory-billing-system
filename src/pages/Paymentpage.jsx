import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const orderData = location.state;
    const amount = orderData?.totalAmount || 0;
    const [method, setMethod] = useState("card");
const handlePayment = async () => {
  if (!orderData) {
    alert("No order data found");
    return;
  }

  let paymentStatus = "Paid";

  if (method === "cod") {
    paymentStatus = "Pending";
    alert("📦 Order placed with Cash on Delivery");
  } else if (method === "upi") {
    alert("📱 UPI Payment Successful");
  } else if (method === "card") {
    alert("💳 Card Payment Successful");
  } else {
    alert("🏦 Net Banking Successful");
  }

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
        paymentStatus
      })
    });

    // redirect after success
    window.location.href = "/buyer-dashboard/orders";

  } catch (err) {
    alert("❌ Payment failed. Try again.");
  }
};
  
    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">B2B Payment</h2>
            <p className="text-xs opacity-80">Txn ID: TXN12345</p>
          </div>
          <p className="text-sm">Amount: ₹{amount}</p>
        </div>

        <div className="flex">

          {/* LEFT: Payment Methods */}
          <div className="w-1/3 border-r p-4 space-y-3">

            <button
              onClick={() => setMethod("card")}
              className={`w-full text-left p-3 rounded-lg ${
                method === "card" ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              💳 Credit / Debit Card
            </button>

            <button
              onClick={() => setMethod("upi")}
              className={`w-full text-left p-3 rounded-lg ${
                method === "upi" ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              📱 UPI
            </button>

            <button
              onClick={() => setMethod("netbanking")}
              className={`w-full text-left p-3 rounded-lg ${
                method === "netbanking" ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              🏦 Net Banking
            </button>

            <button
              onClick={() => setMethod("cod")}
              className={`w-full text-left p-3 rounded-lg ${
                method === "cod" ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              📦 Cash on Delivery
            </button>
          </div>

          {/* RIGHT: Payment Details */}
          <div className="w-2/3 p-6">

            {/* CARD */}
            {method === "card" && (
              <div>
                <h3 className="font-bold mb-4">Enter Card Details</h3>

                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full border p-2 rounded mb-3"
                />

                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 border p-2 rounded"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Card Holder Name"
                  className="w-full border p-2 rounded mb-4"
                />
              </div>
            )}

            {/* UPI */}
            {method === "upi" && (
              <div className="text-center">
                <h3 className="font-bold mb-4">Scan & Pay via UPI</h3>
                <img
                  className="mx-auto"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=test@upi&pn=Demo&am=${amount}`}
                  alt="QR"
                />
                <p className="text-sm text-gray-500 mt-3">
                  Or enter UPI ID below
                </p>
                <input
                  type="text"
                  placeholder="example@upi"
                  className="w-full border p-2 rounded mt-3"
                />
              </div>
            )}

            {/* NET BANKING */}
            {method === "netbanking" && (
              <div>
                <h3 className="font-bold mb-4">Select Bank</h3>
                <select className="w-full border p-2 rounded">
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                </select>
              </div>
            )}

            {/* COD */}
            {method === "cod" && (
              <div className="text-center">
                <h3 className="font-bold mb-4">Cash on Delivery</h3>
                <p className="text-gray-500">
                  Pay when your order is delivered.
                </p>
              </div>
            )}

            {/* PAY BUTTON */}
            <button
                onClick={handlePayment}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                Pay ₹{amount}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}