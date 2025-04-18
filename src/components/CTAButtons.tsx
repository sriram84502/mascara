
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
    <Button
      className="bg-black text-beige px-8 py-3 font-bold text-lg shadow rounded-lg flex items-center gap-2 hover:bg-accent hover:text-black hover:scale-110 transition-all animate-scale-in pulse"
      asChild
    >
      <Link to="/checkout">
        <ShoppingCart className="w-6 h-6" /> Buy Now
      </Link>
    </Button>
    <Button
      variant="outline"
      className="border-black border-2 text-black font-bold px-8 py-3 text-lg rounded-lg flex items-center gap-2 hover:bg-black hover:text-beige hover:border-accent hover:scale-110 transition-all animate-scale-in"
      asChild
    >
      <Link to="#reviews">
        <Star className="w-6 h-6" /> Rate Product
      </Link>
    </Button>
  </div>
);
export default CTAButtons;

