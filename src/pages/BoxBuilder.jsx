import { useState }          from "react";
import { useNavigate }       from "react-router-dom";

// ── Layout ──
import Navbar   from "../components/layout/Navbar";
import Sidebar  from "../components/layout/Sidebar";

// ── Box ──
import BoxCard   from "../components/box/BoxCard";
import BoxVisual from "../components/box/BoxVisual";

// ── Product ──
import ProductCard from "../components/product/ProductCard";
import Filters     from "../components/product/Filters";

// ── Builder (Phase 2) ──
import ProductModal    from "../components/builder/ProductModal";
import GiftMessage     from "../components/builder/GiftMessage";
import QuantitySelector from "../components/builder/QuantitySelector";
import DragDropBox     from "../components/builder/DragDropBox";
import BoxFlip         from "../components/builder/BoxFlip";

// ── Features (Phase 3) ──
import SearchBar      from "../components/features/SearchBar";
import WishlistButton from "../components/features/WishlistButton";
import PromoCode      from "../components/features/PromoCode";

// ── UI ──
import { useToast }   from "../components/ui/ToastProvider";
import { SkeletonGrid } from "../components/ui/SkeletonCard";

// ── Common ──
import Button from "../components/common/Button";
import Badge  from "../components/common/Badge";

const BOXES = [
  { id: "petite",    name: "Petite Chest",    emoji: "📦", desc: "Perfect for small treasures — fits up to 4 curated items.",       capacity: 4,  dims: ["18×14×10 cm", "Up to 4 items"],  price: 9.99  },
  { id: "signature", name: "Signature Vault", emoji: "🎁", desc: "Our most loved size — ideal for 6 items of pure indulgence.",     capacity: 6,  dims: ["28×22×16 cm", "Up to 6 items"],  price: 14.99, popular: true },
  { id: "grand",     name: "Grand Edition",   emoji: "🏛️", desc: "A lavish statement box for the ultimate 10-item curation.",       capacity: 10, dims: ["38×30×22 cm", "Up to 10 items"], price: 22.99 },
];

const PRODUCTS = [
  { id: "candle",  name: "Cedar & Sage Candle",       brand: "Botanica Co.",  emoji: "🕯️", price: 18, cat: "self-care" },
  { id: "serum",   name: "Vitamin C Glow Serum",       brand: "Lumière Lab",   emoji: "✨", price: 32, cat: "self-care" },
  { id: "tea",     name: "Japanese Ceremonial Matcha", brand: "Kyoto Craft",   emoji: "🍵", price: 24, cat: "artisan"   },
  { id: "journal", name: "Leather-bound Journal",      brand: "Papyrus & Co.", emoji: "📒", price: 28, cat: "lifestyle" },
  { id: "honey",   name: "Wildflower Raw Honey",       brand: "Hive & Bloom",  emoji: "🍯", price: 16, cat: "artisan"   },
  { id: "earbuds", name: "Mini True Wireless Buds",    brand: "SoundCraft",    emoji: "🎧", price: 45, cat: "tech"      },
  { id: "mask",    name: "Charcoal Sheet Mask Set",    brand: "Seoul Glow",    emoji: "🧖", price: 14, cat: "self-care" },
  { id: "keycap",  name: "Artisan Resin Keycap",       brand: "KeyForge",      emoji: "⌨️", price: 22, cat: "tech"      },
  { id: "soap",    name: "Himalayan Pink Salt Bar",    brand: "Pure Ritual",   emoji: "🧼", price: 12, cat: "self-care" },
  { id: "jam",     name: "Lavender Honey Preserve",    brand: "La Ferme",      emoji: "🫙", price: 18, cat: "artisan"   },
  { id: "pen",     name: "Brass Fountain Pen",         brand: "Atelier Écrit", emoji: "✒️", price: 38, cat: "lifestyle" },
  { id: "cable",   name: "Braided Magnetic Cable",     brand: "LinkWire",      emoji: "🔌", price: 19, cat: "tech"      },
];

const STEPS = [
  { id: 1, label: "Choose Container" },
  { id: 2, label: "Fill Your Box"    },
  { id: 3, label: "Review & Ship"    },
];

const BoxBuilder = () => {
  const navigate        = useNavigate();
  const { success, error, info, warning } = useToast();

  // ── Core State ──
  const [step,         setStep]         = useState(1);
  const [selectedBox,  setSelectedBox]  = useState(null);
  const [cartItems,    setCartItems]    = useState([]);
  const [filter,       setFilter]       = useState("all");
  const [loading,      setLoading]      = useState(false);

  // ── Phase 2 State ──
  const [activeProduct, setActiveProduct] = useState(null);
  const [giftMessage,   setGiftMessage]   = useState("");
  const [discount,      setDiscount]      = useState(0);

  // ── Phase 3 State ──
  const [searchQuery, setSearchQuery] = useState("");

  // ── Cart Handlers ──
  const toggleProduct = (id) => {
    if (cartItems.includes(id)) {
      setCartItems(cartItems.filter((x) => x !== id));
      warning("Item removed from box.");
    } else {
      if (cartItems.length >= selectedBox?.capacity) {
        error("Box is full! Remove an item first.");
        return;
      }
      setCartItems([...cartItems, id]);
      success("Item added to your box! ✦");
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((x) => x !== id));
    info("Item removed.");
  };

  // ── Derived Values ──
  const filteredProducts = PRODUCTS
    .filter((p) => filter === "all" || p.cat === filter)
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const itemsTotal  = cartItems.reduce(
    (sum, id) => sum + (PRODUCTS.find((p) => p.id === id)?.price || 0), 0
  );
  const discountAmt = (itemsTotal * discount) / 100;
  const grandTotal  = selectedBox
    ? itemsTotal + selectedBox.price - discountAmt
    : 0;
  const shipping    = 4.99;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Navbar />

      {/* ── STEPPER ── */}
      <div className="bg-white border-b border-[#EDE5D4] sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {STEPS.map((s, i) => {
              const isActive = step === s.id;
              const isDone   = step > s.id;
              return (
                <div key={s.id} className="flex items-center">
                  <div
                    onClick={() => isDone && setStep(s.id)}
                    className={`flex items-center gap-2.5 px-5 py-4
                      border-b-[3px] transition-all duration-200
                      ${isActive ? "border-[#C9A84C]" : "border-transparent"}
                      ${isDone ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center
                      justify-center text-xs font-bold transition-all duration-300
                      ${isDone   ? "bg-green-500 text-white"
                      : isActive ? "bg-[#C9A84C] text-[#1A160E]"
                      :            "bg-[#F5F0E8] text-[#5C5040]"}`}>
                      {isDone ? "✓" : s.id}
                    </div>
                    <span className={`text-sm whitespace-nowrap
                      ${isActive ? "font-semibold text-[#1A160E]"
                      : isDone   ? "font-medium text-green-600"
                      :            "font-medium text-[#5C5040]"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-8 h-px bg-[#E0D7C5] mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">

        {/* ══ STEP 1 — Choose Container ══ */}
        {step === 1 && (
          <div className="animate-[fadeUp_0.4s_ease_both]">

            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#F2DFA0]
                text-[#7A5E1A] px-4 py-1.5 rounded-full text-xs font-semibold
                uppercase tracking-widest mb-5">
                ✦ Craft Your Story
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-black
                text-[#1A160E] mb-3">
                Choose Your <span className="text-[#C9A84C]">Perfect</span> Container
              </h1>
              <p className="text-[#5C5040] text-sm sm:text-base max-w-md
                mx-auto leading-relaxed">
                Every great story needs a stage. Pick the vessel that matches your vision.
              </p>
            </div>

            {/* Box Flip Preview */}
            {selectedBox && (
              <div className="flex justify-center mb-8">
                <BoxFlip box={selectedBox} />
              </div>
            )}

            {/* Box Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              gap-5 mb-10">
              {BOXES.map((box) => (
                <BoxCard
                  key={box.id}
                  box={box}
                  isSelected={selectedBox?.id === box.id}
                  onSelect={(b) => {
                    setSelectedBox(b);
                    success(`${b.name} selected! ✦`);
                  }}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                label="Fill My Box →"
                variant="primary"
                disabled={!selectedBox}
                onClick={() => setStep(2)}
              />
            </div>
          </div>
        )}

        {/* ══ STEP 2 — Fill Your Box ══ */}
        {step === 2 && selectedBox && (
          <div className="animate-[fadeUp_0.4s_ease_both]">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left — Products */}
              <div className="flex-1 min-w-0">
                <div className="mb-5">
                  <h2 className="font-serif text-2xl font-bold text-[#1A160E] mb-1">
                    Fill Your{" "}
                    <span className="text-[#C9A84C]">{selectedBox.name}</span>
                  </h2>
                  <p className="text-sm text-[#A8957B]">
                    {selectedBox.capacity - cartItems.length > 0
                      ? `${selectedBox.capacity - cartItems.length} slot(s) remaining`
                      : "📦 Box is full!"}
                  </p>
                </div>

                {/* Search Bar */}
                <div className="mb-4">
                  <SearchBar
                    onSearch={setSearchQuery}
                    placeholder="Search products by name or brand..."
                  />
                </div>

                {/* Filters */}
                <div className="mb-5">
                  <Filters
                    activeFilter={filter}
                    onFilterChange={setFilter}
                  />
                </div>

                {/* Drag Drop Box */}
                <div className="mb-6">
                  <DragDropBox
                    cartItems={cartItems}
                    products={PRODUCTS}
                    onRemove={removeItem}
                    capacity={selectedBox.capacity}
                  />
                </div>

                {/* Product Grid */}
                {loading ? (
                  <SkeletonGrid count={8} type="product" />
                ) : filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center
                    py-16 gap-3">
                    <span className="text-5xl">🔍</span>
                    <p className="text-sm text-[#A8957B]">
                      No products found for "{searchQuery}"
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3
                    lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="relative">
                        {/* Wishlist Button */}
                        <div className="absolute top-2 left-2 z-10">
                          <WishlistButton productId={product.id} size="sm" />
                        </div>
                        <ProductCard
                          product={product}
                          inBox={cartItems.includes(product.id)}
                          onToggle={toggleProduct}
                          onClick={() => setActiveProduct(product)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right — Sidebar */}
              <div className="w-full lg:w-80 shrink-0">
                <Sidebar
                  selectedBox={selectedBox}
                  cartItems={cartItems}
                  products={PRODUCTS}
                  onRemove={removeItem}
                  onCheckout={() => setStep(3)}
                />
                <div className="text-center mt-3">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-[#A8957B] hover:text-[#1A160E]
                      transition-colors duration-200"
                  >
                    ← Change container
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ STEP 3 — Review & Ship ══ */}
        {step === 3 && selectedBox && (
          <div className="animate-[fadeUp_0.4s_ease_both] max-w-3xl mx-auto">

            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#1A160E] mb-1">
                Review Your Masterpiece
              </h2>
              <p className="text-sm text-[#A8957B]">
                Check your selections before we craft and ship your creation.
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-[#EDE5D4] rounded-2xl
              p-6 mb-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">{selectedBox.emoji}</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A160E]">
                    {selectedBox.name}
                  </h3>
                  <p className="text-xs text-[#A8957B]">
                    {cartItems.length} item(s) inside
                  </p>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {cartItems.map((id) => {
                  const p = PRODUCTS.find((x) => x.id === id);
                  return (
                    <div key={id} className="bg-[#FAF7F0] rounded-xl p-3
                      text-center">
                      <div className="text-3xl mb-1">{p.emoji}</div>
                      <div className="text-xs font-medium text-[#1A160E]
                        leading-snug">{p.name}</div>
                      <div className="text-xs text-[#A8957B] mt-0.5">
                        ${p.price}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Summary */}
              <div className="border-t border-[#EDE5D4] pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-[#5C5040]">
                  <span>Box</span><span>${selectedBox.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#5C5040]">
                  <span>Items</span><span>${itemsTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmt.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-[#5C5040]">
                  <span>Shipping</span><span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold
                  text-[#1A160E] pt-2 border-t border-[#EDE5D4]">
                  <span>Total</span>
                  <span className="text-[#7A5E1A] font-serif text-xl">
                    ${(grandTotal + shipping).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Gift Message */}
            <div className="mb-5">
              <GiftMessage
                value={giftMessage}
                onChange={setGiftMessage}
              />
            </div>

            {/* Promo Code */}
            <div className="mb-5">
              <PromoCode onApply={(d) => {
                setDiscount(d);
                success(`Promo applied! ${d}% off 🎉`);
              }} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                label="← Edit Box"
                variant="outline"
                onClick={() => setStep(2)}
              />
              <Button
                label="Proceed to Checkout →"
                variant="primary"
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      selectedBox,
                      cartItems,
                      grandTotal,
                      shipping,
                      giftMessage,
                      discount,
                    },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Modal ── */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          inBox={cartItems.includes(activeProduct.id)}
          onToggle={toggleProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}

    </div>
  );
};

export default BoxBuilder;