import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";

const FEATURES = [
  { emoji: "📦", title: "Choose Your Box", desc: "Pick from Petite, Signature, or Grand Edition containers." },
  { emoji: "✨", title: "Curate Your Items", desc: "Hand-pick artisan, self-care, tech, or lifestyle products." },
  { emoji: "🚚", title: "We Ship With Care", desc: "Your one-of-a-kind box delivered to your door in 3-5 days." },
];

const TESTIMONIALS = [
  { name: "Ayesha R.", text: "I gifted a BoxVerse to my sister — she cried happy tears. Absolutely magical experience!", avatar: "👩" },
  { name: "James K.", text: "The build-a-box flow is so satisfying. Feels like designing your own product.", avatar: "👨" },
  { name: "Sara M.", text: "Every item felt intentional. This is the future of gifting.", avatar: "👩‍🦱" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center text-center
        px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-4xl mx-auto w-full">

        <div className="inline-flex items-center gap-2 bg-[#F2DFA0] text-[#7A5E1A]
          px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
          ✦ Craft Your Story
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black
          text-[#1A160E] leading-tight mb-6">
          Build a Box That Feels{" "}
          <span className="text-[#C9A84C]">Uniquely You</span>
        </h1>

        <p className="text-[#5C5040] text-base sm:text-lg leading-relaxed
          max-w-xl mb-10">
          Step into a personalized, gamified shopping universe. Choose your
          container, fill it with hand-picked treasures, and craft a
          one-of-a-kind package — just for you or someone you love.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            label="Start Building →"
            variant="primary"
            onClick={() => navigate("/build")}
          />
          <Button
            label="Explore Collections"
            variant="outline"
            onClick={() => {}}
          />
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { value: "10K+", label: "Boxes Crafted" },
            { value: "200+", label: "Curated Products" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl font-black text-[#C9A84C]">
                {stat.value}
              </div>
              <div className="text-xs text-[#A8957B] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge label="How It Works" variant="default" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A160E] mt-4">
              Three Steps to{" "}
              <span className="text-[#C9A84C]">Pure Delight</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className="flex flex-col items-center text-center p-6
                  bg-[#FAF7F0] rounded-2xl border border-[#EDE5D4]
                  hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="text-5xl mb-4">{f.emoji}</div>
                <div className="w-7 h-7 rounded-full bg-[#C9A84C] text-[#1A160E]
                  flex items-center justify-center text-xs font-bold mb-3">
                  {i + 1}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A160E] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-[#5C5040] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge label="Loved by Customers" variant="default" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A160E] mt-4">
              What People Are{" "}
              <span className="text-[#C9A84C]">Saying</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name}
                className="bg-white border border-[#EDE5D4] rounded-2xl p-6
                  hover:shadow-md transition-all duration-200">
                <p className="text-sm text-[#5C5040] leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <span className="text-sm font-semibold text-[#1A160E]">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#1A160E] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Build Your{" "}
            <span className="text-[#C9A84C]">BoxVerse?</span>
          </h2>
          <p className="text-[#A8957B] text-sm sm:text-base mb-8 leading-relaxed">
            Join thousands of people crafting meaningful, personalized packages
            for themselves and the ones they love.
          </p>
          <Button
            label="Start Building Now →"
            variant="primary"
            onClick={() => navigate("/build")}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;