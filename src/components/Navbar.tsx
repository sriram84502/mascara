
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileText, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("manscara_current_user");
    setUser(stored ? JSON.parse(stored) : null);
  }, []);

  function handleLogout() {
    localStorage.removeItem("manscara_current_user");
    setUser(null);
    navigate("/");
  }

  const navLinkClasses = (isActive: boolean) =>
    `flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-beige transition font-medium ${
      isActive ? "bg-beige text-accent" : "text-gray-700"
    }`;

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white/80 border-b border-beige shadow-sm z-40">
      <Link to="/" className="font-jakarta text-xl font-bold text-black flex items-center gap-2">
        <img src="/favicon.ico" alt="logo" className="w-8 h-8" />
        Manscara
      </Link>
      <div className="flex gap-2 items-center">
        {user ? (
          <>
            <Link
              to="/"
              className={navLinkClasses(location.pathname === "/")}
              aria-label="Home"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/orders"
              className={navLinkClasses(location.pathname.startsWith("/orders"))}
              aria-label="Orders"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline">Orders</span>
            </Link>
            <Link
              to="/profile"
              className={navLinkClasses(location.pathname.startsWith("/profile"))}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 ml-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </>
        ) : (
          <>
            <Button variant="default" asChild>
              <Link to="/login">Sign in / Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

