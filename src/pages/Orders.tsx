
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Truck, Check, Package, Clock, MapPin } from "lucide-react";

type Order = {
  id: string;
  date: string;
  qty: number;
  total: number;
  address: string;
  email?: string;
  status?: "accepted" | "delivered" | "out for delivery" | string;
  trackingId?: string;
  estDate?: string;
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Function to remove an order by id
  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    const allOrders = JSON.parse(localStorage.getItem("manscara_orders") || "[]");
    const updatedAll = allOrders.filter((o: Order) => o.id !== orderId);
    localStorage.setItem("manscara_orders", JSON.stringify(updatedAll));
  };

  useEffect(() => {
    const u = localStorage.getItem("manscara_current_user");
    if (!u) return;
    const user = JSON.parse(u);
    let all: Order[] = [];
    try {
      all = JSON.parse(localStorage.getItem("manscara_orders") || "[]");
    } catch {}
    const userOrders = all.filter((o: Order) => !o.email || o.email === user.email);
    setOrders(userOrders);
  }, []);

  const renderStatus = (order: Order) => {
    if (!order.status) return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
        <Package className="w-4 h-4" /> Pending
      </span>
    );
    switch (order.status) {
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
            <Check className="w-4 h-4" /> Accepted
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
            <Check className="w-4 h-4" /> Delivered
          </span>
        );
      case "out for delivery":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
            <Truck className="w-4 h-4" /> Out for Delivery
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
            <Package className="w-4 h-4" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-beige font-jakarta flex flex-col">
      <Navbar />
      <div className="container max-w-2xl mx-auto py-12 flex-1">
        <h2 className="text-3xl font-bold text-black mb-4">Your Orders</h2>
        <div className="p-6 bg-white rounded-lg shadow-card border border-beige text-gray-600">
          {orders.length === 0 ? (
            <>
              <p className="mb-2">No orders found. Order now!</p>
              <div className="grid place-items-center">
                <Button className="bg-black text-beige px-6 py-2 rounded-md font-semibold hover:bg-accent hover:text-black transition-all" asChild>
                  <a href="/checkout">Order Now</a>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-5">
              {orders.slice(0, 3).map(order => (
                <div key={order.id} className="p-4 border rounded-lg bg-beige/20">
                  <div className="flex justify-between text-black mb-1 items-center">
                    <span className="font-bold text-lg">Order ID:{" "}
                      <span className="font-mono">{order.id}</span>
                    </span>
                    <span className="text-xs text-gray-500">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-1">
                    <span>Qty: <b>{order.qty}</b></span>
                    <span>Total: <b>₹{order.total}</b></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mb-2">
                    {renderStatus(order)}
                    {/* Show est date and tracking ID for out for delivery */}
                    {order.status === "out for delivery" && (
                      <div className="flex flex-col sm:flex-row gap-2 sm:items-center ml-3">
                        {order.estDate && (
                          <span className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded text-yellow-900">
                            <Clock className="w-4 h-4" /> ETA: {order.estDate}
                          </span>
                        )}
                        {order.trackingId && (
                          <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded text-gray-700">
                            <MapPin className="w-4 h-4" /> Tracking: <b>{order.trackingId}</b>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-xs flex gap-2 items-center">
                    <span className="font-semibold">Address:</span>
                    <span className="text-gray-600 break-all">{order.address}</span>
                  </div>
                  <div className="flex mt-4 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Cancel Order
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-8 text-center text-gray-400 text-xs">
          *Once logged in, all your recent and past orders will be shown here.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
