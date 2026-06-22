import { create } from "zustand";

const useRewardsStore = create((set, get) => ({
  earnedBadges: JSON.parse(
    localStorage.getItem("bv_badges") || "[]"
  ),

  unlockBadge: (badgeId) => {
    const { earnedBadges } = get();
    if (!earnedBadges.includes(badgeId)) {
      const updated = [...earnedBadges, badgeId];
      localStorage.setItem("bv_badges", JSON.stringify(updated));
      set({ earnedBadges: updated });
    }
  },

  hasBadge: (badgeId) => get().earnedBadges.includes(badgeId),

  clearBadges: () => {
    localStorage.removeItem("bv_badges");
    set({ earnedBadges: [] });
  },
}));

export default useRewardsStore;