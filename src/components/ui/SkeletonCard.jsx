const SkeletonCard = ({ type = "product" }) => {

  const shimmer = "animate-pulse bg-gradient-to-r from-[#F0E8D5] via-[#FAF7F0] to-[#F0E8D5] bg-[length:200%_100%]";

  if (type === "box") {
    return (
      <div className="bg-white border-2 border-[#EDE5D4] rounded-2xl p-5">
        {/* Emoji placeholder */}
        <div className={`w-14 h-14 rounded-xl mb-4 ${shimmer}`} />
        {/* Name */}
        <div className={`h-5 w-3/4 rounded-lg mb-2 ${shimmer}`} />
        {/* Desc */}
        <div className={`h-3 w-full rounded mb-1.5 ${shimmer}`} />
        <div className={`h-3 w-5/6 rounded mb-4 ${shimmer}`} />
        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <div className={`h-6 w-20 rounded-full ${shimmer}`} />
          <div className={`h-6 w-24 rounded-full ${shimmer}`} />
        </div>
        {/* Price */}
        <div className={`h-6 w-1/3 rounded-lg ${shimmer}`} />
      </div>
    );
  }

  if (type === "product") {
    return (
      <div className="bg-white border-[1.5px] border-[#EDE5D4] rounded-2xl overflow-hidden">
        {/* Image area */}
        <div className={`h-28 w-full ${shimmer}`} />
        <div className="p-3">
          {/* Name */}
          <div className={`h-4 w-4/5 rounded mb-1.5 ${shimmer}`} />
          {/* Brand */}
          <div className={`h-3 w-1/2 rounded mb-3 ${shimmer}`} />
          {/* Price + Button */}
          <div className="flex items-center justify-between">
            <div className={`h-5 w-1/4 rounded ${shimmer}`} />
            <div className={`w-7 h-7 rounded-full ${shimmer}`} />
          </div>
        </div>
      </div>
    );
  }

  if (type === "order") {
    return (
      <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl ${shimmer}`} />
          <div className="flex-1">
            <div className={`h-4 w-1/2 rounded mb-2 ${shimmer}`} />
            <div className={`h-3 w-1/3 rounded ${shimmer}`} />
          </div>
        </div>
        <div className={`h-3 w-full rounded mb-2 ${shimmer}`} />
        <div className={`h-3 w-3/4 rounded ${shimmer}`} />
      </div>
    );
  }

  return null;
};

// ── Grid of Skeletons ──
export const SkeletonGrid = ({ count = 8, type = "product" }) => {
  return (
    <div className={`grid gap-4 ${
      type === "product"
        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    }`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} type={type} />
      ))}
    </div>
  );
};

export default SkeletonCard;