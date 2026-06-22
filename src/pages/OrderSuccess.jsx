import Confetti from "../components/features/Confetti";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

const PRODUCTS = [
  { id: "candle",  name: "Cedar & Sage Candle",       emoji: "🕯️", price: 18 },
  { id: "serum",   name: "Vitamin C Glow Serum",       emoji: "✨", price: 32 },
  { id: "tea",     name: "Japanese Ceremonial Matcha", emoji: "🍵", price: 24 },
  { id: "journal", name: "Leather-bound Journal",      emoji: "📒", price: 28 },
  { id: "honey",   name: "Wildflower Raw Honey",        emoji: "🍯", price: 16 },
  { id: "earbuds", name: "Mini True Wireless Buds",    emoji: "🎧", price: 45 },
  { id: "mask",    name: "Charcoal Sheet Mask Set",    emoji: "🧖", price: 14 },
  { id: "keycap",  name: "Artisan Resin Keycap",       emoji: "⌨️", price: 22 },
  { id: "soap",    name: "Himalayan Pink Salt Bar",    emoji: "🧼", price: 12 },
  { id: "jam",     name: "Lavender Honey Preserve",    emoji: "🫙", price: 18 },
  { id: "pen",     name: "Brass Fountain Pen",         emoji: "✒️", price: 38 },
  { id: "cable",   name: "Braided Magnetic Cable",     emoji: "🔌", price: 19 },
];

const STEPS = [
  { emoji: "📦", label: "Order Received",    desc: "We have your order details."          },
  { emoji: "🎨", label: "Box Being Crafted", desc: "Our team is hand-packing your box."   },
  { emoji: "🚚", label: "Out for Delivery",  desc: "Your box is on its way to you."       },
  { emoji: "🎉", label: "Delivered",         desc: "Enjoy your one-of-a-kind BoxVerse!"   },
];

const OrderSuccess = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const { orderId, selectedBox, cartItems } = location.state || {};

  const [visible,    setVisible]    = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // ── Entrance animation ──
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // ── Simulate order progress ──
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">

        {/* ── SUCCESS HERO ── */}
        <div className={`text-center mb-12 transition-all duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Animated Box Icon */}
          <div className="text-7xl mb-5 animate-[popIn_0.4s_ease_both]">
            📦
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#1A160E] mb-3">
            Your{" "}
            <span className="text-[#C9A84C]">BoxVerse</span>{" "}
            is on its way!
          </h1>

          <p className="text-[#5C5040] text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
            We are hand-packing your one-of-a-kind box with care. You will
            receive a confirmation email with tracking details shortly.
          </p>

          {/* Order ID Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F2DFA0] text-[#7A5E1A]
            px-5 py-2 rounded-full text-sm font-bold tracking-widest">
            Order #{orderId || "BV-XXXXXXX"}
          </div>
        </div>

        {/* ── ORDER PROGRESS ── */}
        <div className={`bg-white border border-[#EDE5D4] rounded-2xl p-6 mb-6
          transition-all duration-700 delay-200
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          <h2 className="font-serif text-lg font-bold text-[#1A160E] mb-6">
            Order Progress
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center
            justify-between gap-4 sm:gap-0 relative">

            {/* Progress Line (desktop) */}
            <div className="hidden sm:block absolute top-5 left-0 right-0 h-0.5
              bg-[#EDE5D4] z-0" />
            <div
              className="hidden sm:block absolute top-5 left-0 h-0.5 bg-[#C9A84C]
                z-0 transition-all duration-700"
              style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
            />

            {STEPS.map((s, i) => {
              const isDone    = i < activeStep;
              const isCurrent = i === activeStep;
              return (
                <div key={s.label}
                  className="flex flex-row sm:flex-col items-center sm:items-center
                    gap-3 sm:gap-2 z-10 flex-1">

                  {/* Circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center
                    text-lg border-2 transition-all duration-500 shrink-0
                    ${isDone    ? "bg-green-500 border-green-500 text-white"
                    : isCurrent ? "bg-[#C9A84C] border-[#C9A84C] animate-pulse"
                    :             "bg-white border-[#EDE5D4] text-[#A8957B]"}`}>
                    {isDone ? "✓" : s.emoji}
                  </div>

                  {/* Label */}
                  <div className="sm:text-center">
                    <p className={`text-xs font-semibold transition-colors duration-300
                      ${isCurrent ? "text-[#C9A84C]"
                      : isDone    ? "text-green-600"
                      :             "text-[#A8957B]"}`}>
                      {s.label}
                    </p>
                    <p className="text-xs text-[#A8957B] hidden sm:block mt-0.5">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ORDER DETAILS ── */}
        <div className={`bg-white border border-[#EDE5D4] rounded-2xl p-6 mb-6
          transition-all duration-700 delay-300
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          <h2 className="font-serif text-lg font-bold text-[#1A160E] mb-4">
            What's in Your Box
          </h2>

          {/* Box Header */}
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

          {/* Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cartItems?.map((id) => {
              const p = PRODUCTS.find((x) => x.id === id);
              return (
                <div key={id}
                  className="bg-[#FAF7F0] rounded-xl p-3 text-center
                    border border-[#EDE5D4]">
                  <div className="text-3xl mb-1">{p?.emoji}</div>
                  <div className="text-xs font-medium text-[#1A160E] leading-snug">
                    {p?.name}
                  </div>
                  <div className="text-xs text-[#A8957B] mt-0.5">
                    ${p?.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div className={`flex flex-col sm:flex-row gap-3 justify-center
          transition-all duration-700 delay-500
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          <Button
            label="Build Another Box"
            variant="outline"
            onClick={() => navigate("/build")}
          />
          <Button
            label="Track My Order →"
            variant="primary"
            onClick={() => {}}
          />
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;