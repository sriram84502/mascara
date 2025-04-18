
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function getPasswordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  if (!pw) return { label: "", color: "" };
  if (score <= 2) return { label: "Weak", color: "bg-red-300 text-red-800" };
  if (score <= 4) return { label: "Moderate", color: "bg-yellow-200 text-yellow-900" };
  return { label: "Strong", color: "bg-green-200 text-green-800" };
}

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("manscara_users") || "[]");
  } catch {
    return [];
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const pwStrength = getPasswordStrength(pw);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const users = getUsers();
    const user = users.find((u: any) => u.email === email && u.pw === pw);
    if (!user) {
      setError("No such user / incorrect password.");
      return;
    }
    localStorage.setItem("manscara_current_user", JSON.stringify(user));
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-beige flex justify-center items-center animate-fade-in flex-col">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-card w-full max-w-sm flex flex-col gap-6 border border-beige animate-scale-in"
      >
        <div className="flex items-center gap-2 mb-4">
          <LogIn className="text-black" />
          <h2 className="text-2xl font-jakarta font-bold text-black">Login</h2>
        </div>
        <div className="flex flex-col gap-3">
          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Password"
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                required
              />
            </div>
            {pw && (
              <div className="flex items-center gap-2 mt-1 ml-2">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${pwStrength.color} transition-all`}>
                  {pwStrength.label}
                </span>
                {pwStrength.label === "Weak" && (
                  <span className="text-xs text-gray-400">Try a longer, more complex password.</span>
                )}
              </div>
            )}
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button
          type="submit"
          className="w-full bg-black text-beige font-bold rounded-lg hover:scale-105 hover:bg-accent transition-all"
        >
          Sign In
        </Button>
        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-accent underline">
            Sign up
          </a>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default Login;
