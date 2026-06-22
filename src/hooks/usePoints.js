import { create } from "zustand";

const LEVELS = [
  { title: "Newcomer",        emoji: "🌱", required: 0    },
  { title: "Curator",         emoji: "🎨", required: 100  },
  { title: "Artisan",         emoji: "🏺", required: 300  },
  { title: "Collector",       emoji: "💼", required: 600  },
  { title: "Box Master",      emoji: "👑", required: 1000 },
  { title: "BoxVerse Legend", emoji: "🌟", required: 2000 },
];

const usePointsStore = create((set, get) => ({
  points: parseInt(localStorage.getItem("bv_points") || "0"),

  addPoints: (amount) => {
    const newPoints = get().points + amount;
    localStorage.setItem("bv_points", newPoints);
    set({ points: newPoints });
  },

  resetPoints: () => {
    localStorage.removeItem("bv_points");
    set({ points: 0 });
  },
}));

export const usePoints = () => {
  const { points, addPoints, resetPoints } = usePointsStore();

  const level = [...LEVELS]
    .reverse()
    .find((l) => points >= l.required) || LEVELS[0];

  const currentIndex = LEVELS.indexOf(level);
  const nextLevel    = LEVELS[currentIndex + 1] || LEVELS[LEVELS.length - 1];

  const progress = nextLevel.required > level.required
    ? Math.min(
        ((points - level.required) /
         (nextLevel.required - level.required)) * 100,
        100
      )
    : 100;

  return { points, level, nextLevel, progress, addPoints, resetPoints };
};

export default usePoints;