import { useState } from "react";

const BoxFlip = ({ box }) => {
  const [flipped, setFlipped] = useState(false);

  if (!box) {
    return (
      <div className="w-full h-48 bg-[#FAF7F0] border-2 border-dashed
        border-[#E0D7C5] rounded-2xl flex items-center justify-center">
        <p className="text-xs text-[#A8957B]">Select a box to preview</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">

      {/* 3D Flip Card */}
      <div
        className="w-48 h-48 cursor-pointer"
        style={{ perspective: "800px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          style={{
            transformStyle:  "preserve-3d",
            transition:      "transform 0.6s ease",
            transform:       flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            width:           "100%",
            height:          "100%",
            position:        "relative",
          }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 bg-white border-2 border-[#EDE5D4]
              rounded-2xl flex flex-col items-center justify-center gap-3
              shadow-lg"
          >
            <span className="text-6xl">{box.emoji}</span>
            <p className="font-serif text-sm font-bold text-[#1A160E]">
              {box.name}
            </p>
            <p className="text-xs text-[#A8957B]">Click to flip</p>
          </div>

          {/* Back */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform:          "rotateY(180deg)",
            }}
            className="absolute inset-0 bg-[#1A160E] border-2 border-[#C9A84C]
              rounded-2xl flex flex-col items-center justify-center gap-3
              shadow-lg p-4"
          >
            <p className="font-serif text-[#C9A84C] text-sm font-bold text-center">
              {box.name}
            </p>
            <div className="flex flex-col gap-1.5 w-full">
              {box.dims?.map((dim) => (
                <div key={dim}
                  className="flex items-center gap-2 text-xs text-[#C5B89A]">
                  <span className="text-[#C9A84C]">✦</span>
                  {dim}
                </div>
              ))}
              <div className="flex items-center gap-2 text-xs text-[#C5B89A]">
                <span className="text-[#C9A84C]">✦</span>
                Up to {box.capacity} items
              </div>
            </div>
            <p className="text-[#C9A84C] font-bold font-serif text-lg">
              ${box.price?.toFixed(2)}
            </p>
          </div>

        </div>
      </div>

      {/* Hint */}
      <p className="text-xs text-[#A8957B]">
        {flipped ? "Click to flip back 🔄" : "Click box to see details 📋"}
      </p>

    </div>
  );
};

export default BoxFlip;