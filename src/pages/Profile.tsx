
import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Edit, Plus, Home, Trash2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types for structured state
type Address = {
  address: string;
  postalCode: string;
};
type UserType = {
  name?: string;
  email: string;
  phone: string;
  address: string;
  postalCode?: string;
  pw: string;
  extraAddresses?: Address[];
};

const getCurrentUser = (): UserType | null => {
  const saved = localStorage.getItem("manscara_current_user");
  return saved ? JSON.parse(saved) : null;
};

const setCurrentUser = (user: UserType) => {
  localStorage.setItem("manscara_current_user", JSON.stringify(user));
};

const updateUserInList = (user: UserType) => {
  let users: UserType[] = [];
  try {
    users = JSON.parse(localStorage.getItem("manscara_users") || "[]");
  } catch {}
  const idx = users.findIndex((u) => u.email === user.email);
  if (idx > -1) {
    users[idx] = user;
    localStorage.setItem("manscara_users", JSON.stringify(users));
  }
};

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedPostalCode, setEditedPostalCode] = useState("");
  const [editError, setEditError] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [setAsPrimary, setSetAsPrimary] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressError, setAddressError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    if (u) {
      const all: Address[] = [];
      if (u.address) {
        all.push({ address: u.address, postalCode: u.postalCode || "" });
      }
      if (u.extraAddresses) {
        u.extraAddresses.forEach(addr => {
          all.push({ address: addr.address, postalCode: addr.postalCode });
        });
      }
      setAddresses(all);
    }
  }, []);

  // Profile update logic
  const handleProfileEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!editedName.trim() || !editedEmail.trim() || !editedPhone.trim() || !editedAddress.trim() || !editedPostalCode.trim()) {
      setEditError("All fields are required.");
      return;
    }
    const updated: UserType = {
      ...user,
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      address: editedAddress,
      postalCode: editedPostalCode,
    };
    setUser(updated);
    setCurrentUser(updated);
    updateUserInList(updated);
    setEditError("");
    setShowProfileEdit(false);

    // Update displayed addresses
    const newAddresses = [{ address: editedAddress, postalCode: editedPostalCode }];
    (user.extraAddresses || []).forEach(addr => newAddresses.push(addr));
    setAddresses(newAddresses);
  };

  const startProfileEdit = () => {
    if (!user) return;
    setEditedName(user.name || "");
    setEditedEmail(user.email);
    setEditedPhone(user.phone);
    setEditedAddress(user.address);
    setEditedPostalCode(user.postalCode || "");
    setEditError("");
    setShowProfileEdit(true);
  };

  // Add address logic
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim() || !newPostalCode.trim()) {
      setAddressError("All fields are required.");
      return;
    }
    if (!user) return;
    let newPrimary = { address: user.address, postalCode: user.postalCode || "" };
    let extraAddresses = [...(user.extraAddresses || [])];
    if (setAsPrimary) {
      extraAddresses = [newPrimary, ...extraAddresses];
      newPrimary = { address: newAddress, postalCode: newPostalCode };
    } else {
      extraAddresses.push({ address: newAddress, postalCode: newPostalCode });
    }
    const updated: UserType = {
      ...user,
      address: newPrimary.address,
      postalCode: newPrimary.postalCode,
      extraAddresses
    };
    setUser(updated);
    setCurrentUser(updated);
    updateUserInList(updated);
    setNewAddress("");
    setNewPostalCode("");
    setShowAddressForm(false);
    setSetAsPrimary(false);
    setAddressError("");

    // Update displayed addresses
    const all: Address[] = [];
    all.push({ address: updated.address, postalCode: updated.postalCode || "" });
    extraAddresses.forEach(addr => all.push(addr));
    setAddresses(all);
  };

  // Make address primary
  const makePrimary = (idx: number) => {
    if (!user) return;
    if (idx === 0) return;
    const all = [
      { address: user.address, postalCode: user.postalCode || "" },
      ...(user.extraAddresses || [])
    ];
    const newPrimary = all[idx];
    const rest = all.filter((_, i) => i !== idx);
    const updated: UserType = {
      ...user,
      address: newPrimary.address,
      postalCode: newPrimary.postalCode,
      extraAddresses: rest
    };
    setUser(updated);
    setCurrentUser(updated);
    updateUserInList(updated);
    setAddresses([newPrimary, ...rest]);
  };

  // Delete address
  const deleteAddress = (idx: number) => {
    if (!user) return;
    let all = [
      { address: user.address, postalCode: user.postalCode || "" },
      ...(user.extraAddresses || [])
    ];
    if (all.length === 1) return; // Cannot delete the only address
    if (idx === 0) {
      // Deleting primary: promote next address as primary
      const [_, ...rest] = all;
      const updated: UserType = {
        ...user,
        address: rest[0].address,
        postalCode: rest[0].postalCode,
        extraAddresses: rest.slice(1)
      };
      setUser(updated);
      setCurrentUser(updated);
      updateUserInList(updated);
      setAddresses([rest[0], ...rest.slice(1)]);
    } else {
      // Deleting a secondary
      all.splice(idx, 1);
      const updated: UserType = {
        ...user,
        address: all[0].address,
        postalCode: all[0].postalCode,
        extraAddresses: all.slice(1)
      };
      setUser(updated);
      setCurrentUser(updated);
      updateUserInList(updated);
      setAddresses(all);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-beige flex items-center justify-center animate-fade-in">
          <div className="bg-white shadow-card p-8 rounded-xl border border-beige text-center">
            <div className="font-bold text-lg text-black mb-2">Please log in to view your profile.</div>
            <Button className="bg-black text-beige" onClick={() => navigate("/login")}>Go to Login</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#F1F0FB] via-white to-[#FDE1D3] w-full flex flex-col items-center pt-6 px-2 animate-fade-in-up">
        {/* Profile Card */}
        <section className="glass border border-beige max-w-lg w-full rounded-3xl shadow-xl animate-scale-in mb-9 py-0 px-0">
          <div className="flex flex-col items-center gap-3 py-10 px-8">
            <span className="bg-gradient-to-tr from-[#8B5CF6] to-[#1EAEDB] rounded-full p-2 shadow-lg mb-1">
              <User className="w-14 h-14 text-white" />
            </span>
            <h2 className="text-3xl font-extrabold text-[#1A1D1A] mb-1 text-center tracking-tight">
              {user.name || "Your Profile"}
            </h2>
            {!showProfileEdit ? (
              <>
                <div className="grid grid-cols-1 gap-2 w-full mt-6 mb-4">
                  <div className="flex items-center gap-3 text-[#403E43] text-base">
                    <User className="w-5 h-5 text-[#8B5CF6]" />
                    <span className="font-semibold">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#403E43] text-base">
                    <Mail className="w-5 h-5 text-[#8B5CF6]" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#403E43] text-base">
                    <Phone className="w-5 h-5 text-[#8B5CF6]" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#403E43] text-base">
                    <MapPin className="w-5 h-5 text-[#8B5CF6]" />
                    <span className="break-words max-w-xs">{user.address}</span>
                  </div>
                  {user.postalCode && (
                    <div className="flex items-center gap-3 text-[#403E43] text-base">
                      <Mail className="w-5 h-5 text-[#8B5CF6]" />
                      <span>Postal Code: {user.postalCode}</span>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2 flex items-center gap-2 border border-black text-black hover:bg-[#E5DEFF] hover:text-black transition"
                  onClick={startProfileEdit}
                >
                  <Edit className="w-4 h-4" /> Edit Profile
                </Button>
              </>
            ) : (
              <form
                onSubmit={handleProfileEdit}
                className="w-full mt-2 animate-fade-in flex flex-col gap-4 pt-0"
              >
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label className="text-black font-semibold flex items-center gap-2 mb-1 text-sm">
                      <User className="w-4 h-4" /> Name
                    </label>
                    <Input
                      type="text"
                      className="rounded-lg bg-[#F6F6F7] border-[#DDD1B2] focus:ring-2 focus:ring-[#8B5CF6] transition"
                      value={editedName}
                      onChange={e => setEditedName(e.target.value)}
                      required
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="text-black font-semibold flex items-center gap-2 mb-1 text-sm">
                      <Mail className="w-4 h-4" /> Email
                    </label>
                    <Input
                      type="email"
                      className="rounded-lg bg-[#F6F6F7] border-[#DDD1B2] focus:ring-2 focus:ring-[#8B5CF6] transition"
                      value={editedEmail}
                      onChange={e => setEditedEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-black font-semibold flex items-center gap-2 mb-1 text-sm">
                      <Phone className="w-4 h-4" /> Phone
                    </label>
                    <Input
                      type="tel"
                      className="rounded-lg bg-[#F6F6F7] border-[#DDD1B2] focus:ring-2 focus:ring-[#8B5CF6] transition"
                      value={editedPhone}
                      onChange={e => setEditedPhone(e.target.value)}
                      required
                      maxLength={15}
                    />
                  </div>
                  <div>
                    <label className="text-black font-semibold flex items-center gap-2 mb-1 text-sm">
                      <MapPin className="w-4 h-4" /> Address
                    </label>
                    <Input
                      type="text"
                      className="rounded-lg bg-[#F6F6F7] border-[#DDD1B2] focus:ring-2 focus:ring-[#8B5CF6] transition"
                      value={editedAddress}
                      onChange={e => setEditedAddress(e.target.value)}
                      required
                      maxLength={200}
                    />
                  </div>
                  <div>
                    <label className="text-black font-semibold flex items-center gap-2 mb-1 text-sm">
                      <Mail className="w-4 h-4" /> Postal Code
                    </label>
                    <Input
                      type="text"
                      className="rounded-lg bg-[#F6F6F7] border-[#DDD1B2] focus:ring-2 focus:ring-[#8B5CF6] transition"
                      value={editedPostalCode}
                      onChange={e => setEditedPostalCode(e.target.value)}
                      required
                      maxLength={12}
                    />
                  </div>
                </div>
                {editError && (
                  <div className="text-red-500 text-sm font-medium">{editError}</div>
                )}
                <div className="flex gap-2 mt-3">
                  <Button
                    type="submit"
                    className="bg-[#8B5CF6] text-white flex-1 hover:bg-[#7E69AB] transition rounded-lg font-semibold"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="border border-black flex-1 rounded-lg"
                    onClick={() => setShowProfileEdit(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Saved Addresses Section */}
        <section className="w-full max-w-lg glass border border-beige rounded-3xl shadow-xl mb-12 py-7 px-7 animate-fade-in">
          <div className="flex items-center gap-2 mb-5">
            <Home className="w-6 h-6 text-[#8B5CF6]" />
            <span className="font-bold text-xl text-[#1A1D1A]">Saved Addresses</span>
            <Button
              size="sm"
              className={`ml-auto px-3 py-1 text-xs rounded-lg bg-[#8B5CF6] text-white hover:bg-[#1EAEDB] transition`}
              onClick={() => setShowAddressForm(v => !v)}
              type="button"
            >
              <Plus className="w-4 h-4 mr-1" />
              {showAddressForm ? "Cancel" : "Add Address"}
            </Button>
          </div>
          <ul className="mb-2 flex flex-col gap-4">
            {addresses.map((addr, idx) => (
              <li
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 bg-gradient-to-tr from-[#EFE1C3]/70 to-[#D3E4FD]/50 border border-[#DDD1B2] rounded-xl shadow group hover:scale-[1.025] hover:shadow-lg transition-all relative"
              >
                <div className="flex items-center gap-2 flex-1">
                  <MapPin className="w-4 h-4 text-[#8B5CF6] mt-0.5" />
                  <span className="break-all text-base">{addr.address}</span>
                  <span className="text-xs ml-2 text-muted-foreground">Postal Code: {addr.postalCode}</span>
                </div>
                <div className="flex items-center gap-2 ml-auto mt-1 sm:mt-0">
                  {idx === 0 ? (
                    <span className="text-xs px-3 py-1 bg-gradient-to-tr from-[#8B5CF6] to-[#1EAEDB] text-white rounded font-semibold flex items-center gap-1 shadow" style={{ minWidth: 72, justifyContent: "center" }}>
                      <Star className="w-3 h-3 mr-1" />
                      Primary
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      className="px-2 py-1 bg-white text-[#8B5CF6] border border-[#8B5CF6] hover:bg-[#F6F6F7] hover:text-black transition-all font-semibold rounded"
                      style={{ minWidth: 110, justifyContent: "center" }}
                      onClick={() => makePrimary(idx)}
                    >
                      Set as Primary
                    </Button>
                  )}
                  {addresses.length > 1 && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-600 p-1 hover:bg-red-100 rounded-full"
                      onClick={() => deleteAddress(idx)}
                      aria-label="Delete address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </li>
            ))}
            {addresses.length === 0 && (
              <li className="text-xs text-gray-500">No addresses found.</li>
            )}
          </ul>
          {showAddressForm && (
            <form
              className="flex flex-col md:flex-row gap-2 mt-3 items-center bg-white/60 rounded-xl p-3 border border-[#EEE] shadow-sm"
              onSubmit={handleAddAddress}
            >
              <div className="flex-1 flex flex-col md:flex-row gap-2">
                <Input
                  className="rounded-lg border-[#DDD1B2] bg-[#F6F6F7]"
                  type="text"
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  placeholder="New Address"
                  required
                  maxLength={200}
                />
                <Input
                  className="rounded-lg border-[#DDD1B2] bg-[#F6F6F7]"
                  type="text"
                  value={newPostalCode}
                  onChange={e => setNewPostalCode(e.target.value)}
                  placeholder="Postal Code"
                  required
                  maxLength={12}
                />
              </div>
              <label className="flex items-center text-xs text-black gap-1 mt-1 md:mt-0 px-2 cursor-pointer">
                <input type="checkbox" checked={setAsPrimary} onChange={e => setSetAsPrimary(e.target.checked)} className="mr-1 accent-[#8B5CF6]" />
                Set as primary
              </label>
              <Button size="sm" className="bg-[#8B5CF6] text-white mt-2 md:mt-0 rounded-lg font-semibold px-4">Save</Button>
            </form>
          )}
          {addressError && <div className="text-red-600 text-xs mt-2">{addressError}</div>}
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Profile;
