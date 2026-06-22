import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Checkout = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const { selectedBox, cartItems, grandTotal, shipping } = location.state || {};

  const PRODUCTS = [
    { id: "candle",  name: "Cedar & Sage Candle",       brand: "Botanica Co.",   emoji: "🕯️", price: 18, cat: "self-care" },
    { id: "serum",   name: "Vitamin C Glow Serum",       brand: "Lumière Lab",    emoji: "✨", price: 32, cat: "self-care" },
    { id: "tea",     name: "Japanese Ceremonial Matcha", brand: "Kyoto Craft",    emoji: "🍵", price: 24, cat: "artisan"   },
    { id: "journal", name: "Leather-bound Journal",      brand: "Papyrus & Co.",  emoji: "📒", price: 28, cat: "lifestyle" },
    { id: "honey",   name: "Wildflower Raw Honey",       brand: "Hive & Bloom",   emoji: "🍯", price: 16, cat: "artisan"   },
    { id: "earbuds", name: "Mini True Wireless Buds",    brand: "SoundCraft",     emoji: "🎧", price: 45, cat: "tech"      },
    { id: "mask",    name: "Charcoal Sheet Mask Set",    brand: "Seoul Glow",     emoji: "🧖", price: 14, cat: "self-care" },
    { id: "keycap",  name: "Artisan Resin Keycap",       brand: "KeyForge",       emoji: "⌨️", price: 22, cat: "tech"      },
    { id: "soap",    name: "Himalayan Pink Salt Bar",    brand: "Pure Ritual",    emoji: "🧼", price: 12, cat: "self-care" },
    { id: "jam",     name: "Lavender Honey Preserve",    brand: "La Ferme",       emoji: "🫙", price: 18, cat: "artisan"   },
    { id: "pen",     name: "Brass Fountain Pen",         brand: "Atelier Écrit",  emoji: "✒️", price: 38, cat: "lifestyle" },
    { id: "cable",   name: "Braided Magnetic Cable",     brand: "LinkWire",       emoji: "🔌", price: 19, cat: "tech"      },
  ];

  // ── Form State ──
  const [form, setForm] = useState({
    firstName:  "",
    lastName:   "",
    email:      "",
    city:       "",
    zip:        "",
    address:    "",
  });

  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  // ── Handlers ──
  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim())  newErrors.lastName  = "Last name is required";
    if (!form.email.trim())     newErrors.email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.city.trim())      newErrors.city      = "City is required";
    if (!form.zip.trim())       newErrors.zip       = "ZIP code is required";
    if (!form.address.trim())   newErrors.address   = "Address is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    // Simulate API call — replace with real orderService.placeOrder()
    setTimeout(() => {
      const orderId = "BV-" + Math.random().toString(36).substr(2, 7).toUpperCase();
      setLoading(false);
      navigate("/order-success", { state: { orderId, selectedBox, cartItems } });
    }, 1500);
  };

  const orderTotal = (grandTotal || 0) + (shipping || 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-black text-[#1A160E] mb-1">
            Almost There
          </h1>
          <p className="text-sm text-[#A8957B]">
            Fill in your shipping details and place your order.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT — Shipping Form ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-[#EDE5D4] rounded-2xl p-6">

              <h2 className="font-serif text-lg font-bold text-[#1A160E] mb-5">
                Shipping Details
              </h2>

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                  label="First Name"
                  placeholder="Aria"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  error={errors.firstName}
                />
                <Input
                  label="Last Name"
                  placeholder="Sinclair"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  error={errors.lastName}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="aria@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                />
              </div>

              {/* City + ZIP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                  label="City"
                  placeholder="New York"
                  value={form.city}
                  onChange={handleChange("city")}
                  error={errors.city}
                />
                <Input
                  label="ZIP / Postal Code"
                  placeholder="10001"
                  value={form.zip}
                  onChange={handleChange("zip")}
                  error={errors.zip}
                />
              </div>

              {/* Address */}
              <div className="mb-6">
                <Input
                  label="Delivery Address"
                  placeholder="123 Artisan Avenue, Apt 4B"
                  value={form.address}
                  onChange={handleChange("address")}
                  error={errors.address}
                />
              </div>

              {/* Shipping Note */}
              <div className="flex items-center gap-3 bg-[#FAF7F0] rounded-xl p-4 mb-6">
                <span className="text-2xl">🚚</span>
                <p className="text-sm text-[#5C5040]">
                  Standard delivery{" "}
                  <strong className="text-[#1A160E]">${shipping?.toFixed(2)}</strong>
                  {" "}— estimated 3–5 business days
                </p>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#C9A84C] text-[#1A160E] font-serif font-bold
                  text-base py-3.5 rounded-xl transition-all duration-200
                  hover:opacity-90 hover:-translate-y-0.5 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Placing Order...
                  </>
                ) : (
                  `Place Order — $${orderTotal.toFixed(2)}`
                )}
              </button>

              {/* Back */}
              <div className="text-center mt-3">
                <button
                  onClick={() => navigate(-1)}
                  className="text-xs text-[#A8957B] hover:text-[#1A160E] transition-colors duration-200"
                >
                  ← Edit box contents
                </button>
              </div>

            </div>
          </div>

          {/* ── RIGHT — Order Summary ── */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5 sticky top-24">

              <h3 className="font-serif text-lg font-bold text-[#1A160E] mb-4">
                Order Summary
              </h3>

              {/* Box */}
              <div className="flex items-center gap-3 pb-4 border-b border-[#F0E8D5] mb-4">
                <span className="text-3xl">{selectedBox?.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-[#1A160E]">
                    {selectedBox?.name}
                  </p>
                  <p className="text-xs text-[#A8957B]">
                    {cartItems?.length} item(s) inside
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-y-auto pr-1">
                {cartItems?.map((id) => {
                  const p = PRODUCTS.find((x) => x.id === id);
                  return (
                    <div key={id}
                      className="flex items-center justify-between text-sm text-[#5C5040]">
                      <div className="flex items-center gap-2">
                        <span>{p?.emoji}</span>
                        <span className="truncate max-w-[140px] text-xs">{p?.name}</span>
                      </div>
                      <span className="text-xs font-medium text-[#1A160E]">${p?.price}</span>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="border-t border-[#EDE5D4] pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-[#5C5040]">
                  <span>Box</span><span>${selectedBox?.price?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#5C5040]">
                  <span>Items</span><span>${grandTotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#5C5040]">
                  <span>Shipping</span><span>${shipping?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#1A160E]
                  pt-2 border-t border-[#EDE5D4]">
                  <span>Total</span>
                  <span className="font-serif text-lg text-[#7A5E1A]">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;