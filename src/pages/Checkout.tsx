import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { v4 as uuidv4 } from "uuid"; // For unique order ids
import { useEffect } from "react";
const Checkout = () => {
  const [qty, setQty] = useState(1);
  const [confirm, setConfirm] = useState(false);

  // Animate the total / product card when quantity changes
  const [animKey, setAnimKey] = useState(0);

  function handleChange(delta: number) {
    setQty(q => {
      const newQty = Math.max(1, q + delta);
      setAnimKey(prev => prev + 1); // trigger key change for animation
      return newQty;
    });
  }

  const total = qty * 299;

  function placeOrder() {
    const u = localStorage.getItem("manscara_current_user");
    if (!u) {
      alert("Please login to place an order.");
      return;
    }
    const user = JSON.parse(u);
    const orders = JSON.parse(localStorage.getItem("manscara_orders") || "[]");
    const order = {
      id: uuidv4(),
      email: user.email,
      qty,
      total,
      address: user.address,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem("manscara_orders", JSON.stringify([order, ...orders]));
    setConfirm(true);
    setTimeout(() => setConfirm(false), 1500);
  }

  useEffect(() => {
    setConfirm(false);
  }, []);

  return (
    <div className="min-h-screen bg-beige font-jakarta flex flex-col">
      <Navbar />
      <div className="container max-w-xl mx-auto py-12 flex-1">
        <h2 className="text-3xl font-bold text-black mb-5">Checkout</h2>
        <div
          key={animKey}
          className="bg-white rounded-lg p-8 border border-beige shadow-card animate-scale-in"
        >
          <div className="flex flex-col gap-4">
            <span className="font-bold text-xl text-black">Manscara Facewash (100mL)</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{qty}x ₹299</span>
              <div className="flex items-center gap-1">
                <button
                  aria-label="Decrease quantity"
                  className="rounded-full bg-beige text-black font-bold w-7 h-7 flex items-center justify-center border border-gray-300 hover:scale-110 hover:bg-accent transition-all"
                  onClick={() => handleChange(-1)}
                  disabled={qty === 1}
                  type="button"
                ><Minus className="w-4 h-4" /></button>
                <button
                  aria-label="Increase quantity"
                  className="rounded-full bg-beige text-black font-bold w-7 h-7 flex items-center justify-center border border-gray-300 hover:scale-110 hover:bg-accent transition-all"
                  onClick={() => handleChange(1)}
                  type="button"
                ><Plus className="w-4 h-4" /></button>
              </div>
            </div>
            <span className="text-lg font-semibold text-black py-1 animate-fade-in">Total: ₹{total}</span>
          </div>
          <button
            className="w-full mt-6 bg-black text-beige py-3 rounded-lg font-bold text-lg transition-all hover:scale-105 hover:bg-accent hover:text-black"
            onClick={placeOrder}
            type="button"
          >
            Place Order
          </button>
          {confirm && (
            <div className="text-green-500 font-bold text-center mt-2 animate-fade-in">
              Order placed!
            </div>
          )}
        </div>
        <div className="text-sm text-gray-600 mt-4 text-center animate-fade-in">
          Secure payments &mdash; Stripe/UPI/Cards (login for real purchases)
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Checkout;
