import RewardBadge from "./RewardBadge";
import usePoints   from "../../hooks/usePoints";

const ALL_BADGES = [
  { id: "first_box",    emoji: "📦", title: "First Box",      desc: "Place your first order",            required: 1    },
  { id: "curator",      emoji: "🎨", title: "Curator",         desc: "Build 3 boxes",                     required: 3    },
  { id: "artisan_fan",  emoji: "🍯", title: "Artisan Fan",     desc: "Add 5 artisan products",            required: 50   },
  { id: "tech_lover",   emoji: "⌨️", title: "Tech Lover",      desc: "Add 5 tech products",               required: 100  },
  { id: "gift_giver",   emoji: "🎁", title: "Gift Giver",      desc: "Send 2 gift messages",              required: 150  },
  { id: "box_master",   emoji: "👑", title: "Box Master",      desc: "Reach 500 points",                  required: 500  },
  { id: "loyal",        emoji: "💎", title: "Loyal Customer",  desc: "Place 10 orders",                   required: 1000 },
  { id: "legend",       emoji: "🌟", title: "BoxVerse Legend", desc: "Reach the top tier",                required: 2000 },
];

const BadgeCollection = () => {
  const { points } = usePoints();

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg font-bold text-[#1A160E]">
          Badge Collection
        </h3>
        <span className="text-xs text-[#A8957B]">
          {ALL_BADGES.filter((b) => points >= b.required).length}/
          {ALL_BADGES.length} earned
        </span>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-6">
        {ALL_BADGES.map((badge) => (
          <RewardBadge
            key={badge.id}
            badge={badge}
            earned={points >= badge.required}
            size="md"
          />
        ))}
      </div>

    </div>
  );
};

export default BadgeCollection;