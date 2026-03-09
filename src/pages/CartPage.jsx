// export default function CartPage() {
//   const cart = [
//     { product: "Rice", price: 1200, qty: 2 },
//     { product: "Oil", price: 200, qty: 1 },
//   ];
//   const gst = 120;
//   const total = 2720;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Cart</h2>
//       <table className="w-full border mb-6">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Product</th>
//             <th className="p-2 border">Price</th>
//             <th className="p-2 border">Qty</th>
//             <th className="p-2 border">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.map((item, i) => (
//             <tr key={i}>
//               <td className="p-2 border">{item.product}</td>
//               <td className="p-2 border">₹{item.price}</td>
//               <td className="p-2 border">{item.qty}</td>
//               <td className="p-2 border">₹{item.price * item.qty}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <p>GST: ₹{gst}</p>
//       <p className="font-bold">Total: ₹{total}</p>
//       <div className="mt-4 flex space-x-4">
//         <button className="bg-gray-200 px-4 py-2 rounded">Continue Shopping</button>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">Checkout</button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

export default function CartPage() {

  const [cart, setCart] = useState([
    { id: 1, product: "Rice", price: 1200, qty: 2, image: "https://via.placeholder.com/60" },
    { id: 2, product: "Oil", price: 200, qty: 1, image: "https://via.placeholder.com/60" },
  ]);

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Cart Table */}

          <div className="lg:col-span-2">

            <table className="w-full border rounded overflow-hidden">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Product</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Quantity</th>
                  <th className="p-3 border">Total</th>
                  <th className="p-3 border">Remove</th>
                </tr>
              </thead>

              <tbody>

                {cart.map((item) => (

                  <tr key={item.id} className="text-center hover:bg-gray-50">

                    <td className="p-3 border flex items-center gap-3">
                      <img src={item.image} alt={item.product} className="w-12 h-12 rounded"/>
                      {item.product}
                    </td>

                    <td className="p-3 border">₹{item.price}</td>

                    <td className="p-3 border">

                      <div className="flex justify-center items-center gap-2">

                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="px-2 bg-gray-200 rounded"
                        >
                          -
                        </button>

                        <span>{item.qty}</span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="px-2 bg-gray-200 rounded"
                        >
                          +
                        </button>

                      </div>

                    </td>

                    <td className="p-3 border font-semibold">
                      ₹{item.price * item.qty}
                    </td>

                    <td className="p-3 border">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* Cart Summary */}

          <div className="bg-white shadow rounded p-5 h-fit">

            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>

            <hr className="my-3"/>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Checkout
            </button>

            <button className="w-full mt-3 bg-gray-200 py-2 rounded hover:bg-gray-300">
              Continue Shopping
            </button>

          </div>

        </div>

      )}

    </div>
  );
}