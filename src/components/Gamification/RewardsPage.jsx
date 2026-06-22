import PointsDisplay   from "./PointsDisplay";
import BadgeCollection from "./BadgeCollection";
import ProgressBar     from "./ProgressBar";
import usePoints       from "../../hooks/usePoints";
import Navbar          from "../layout/Navbar";
import Footer          from "../layout/Footer";

const HOW_TO_EARN = [
  { emoji: "📦", action: "Place an order",          points: "+50 pts"  },
  { emoji: "🎁", action: "Send a gift message",      points: "+20 pts"  },
  { emoji: "❤️", action: "Add to wishlist",          points: "+5 pts"   },
  { emoji: "🏷️", action: "Use a promo code",         points: "+10 pts"  },
  { emoji: "⭐", action: "Leave a review",           points: "+30 pts"  },
  { emoji: "👥", action: "Refer a friend",           points: "+100 pts" },
];

const RewardsPage = () => {
  const { points } = usePoints();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F2DFA0]
            text-[#7A5E1A] px-4 py-1.5 rounded-full text-xs font-semibold
            uppercase tracking-widest mb-4">
            ⭐ BoxVerse Rewards
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black
            text-[#1A160E] mb-3">
            Your <span className="text-[#C9A84C]">Rewards</span> Hub
          </h1>
          <p className="text-sm text-[#5C5040] max-w-md mx-auto leading-relaxed">
            Earn points with every box you build. Unlock badges,
            climb levels, and become a BoxVerse Legend.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Points — takes 1 col */}
          <div className="lg:col-span-1">
            <PointsDisplay />
          </div>

          {/* Progress — takes 2 cols */}
          <div className="lg:col-span-2">
            <ProgressBar />
          </div>
        </div>

        {/* Badge Collection */}
        <div className="mb-6">
          <BadgeCollection />
        </div>

        {/* How to Earn */}
        <div className="bg-white border border-[#EDE5D4] rounded-2xl p-6">
          <h3 className="font-serif text-lg font-bold text-[#1A160E] mb-5">
            How to Earn Points
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HOW_TO_EARN.map((item) => (
              <div key={item.action}
                className="flex items-center gap-3 bg-[#FAF7F0]
                  border border-[#EDE5D4] rounded-xl p-3">
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#1A160E] leading-snug">
                    {item.action}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#C9A84C]
                  shrink-0">
                  {item.points}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default RewardsPage;