
import { CreditCard, MapPin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PayNow = () => {
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("manscara_current_user");
    if (user) {
      const parsed = JSON.parse(user);
      setAddress(parsed.address || "");
      setEmail(parsed.email || "");
      setPhone(parsed.phone || "");
    }
  }, []);

  return (
    <div className="min-h-screen bg-beige flex flex-col justify-center items-center animate-fade-in py-12">
      <Navbar />
      <div className="bg-white rounded-xl p-10 max-w-xl w-full flex flex-col items-center shadow-card border border-beige animate-scale-in">
        <CreditCard className="w-10 h-10 text-accent mb-2 animate-pulse" />
        <h2 className="text-3xl font-bold mb-1 text-black">Pay Now</h2>
        <div className="text-gray-700 mb-4 text-base">
          Payment gateway coming soon! For now, try test mode.<br />
          <span className="text-xs text-gray-400">(This is a demo checkout page.)</span>
        </div>
        <div className="w-full bg-beige rounded-lg p-5 shadow transition-all mb-5 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <Mail className="text-accent w-4 h-4" /><span className="text-black">{email || "No email"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-accent w-4 h-4" /><span className="text-black">{phone || "No phone"}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="text-accent w-4 h-4 mt-1" /><span className="text-black">{address || "No address"}</span>
          </div>
        </div>
        <a href="/checkout" className="mt-4 inline-block bg-black text-beige py-3 px-8 rounded-md font-bold text-lg transition-transform hover:scale-105 hover:bg-accent hover:text-black animate-fade-in">Go to Checkout</a>
      </div>
      <Footer />
    </div>
  );
};

export default PayNow;
