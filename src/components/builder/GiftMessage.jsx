import { useState } from "react";

const MAX_CHARS = 150;

const GiftMessage = ({ value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const remaining = MAX_CHARS - (value?.length || 0);

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎀</span>
        <div>
          <h3 className="font-serif text-base font-bold text-[#1A160E]">
            Add a Gift Message
          </h3>
          <p className="text-xs text-[#A8957B]">
            Optional — include a personal note in your box
          </p>
        </div>
      </div>

      {/* Textarea */}
      <div className={`relative border-2 rounded-xl transition-all duration-200
        ${focused ? "border-[#C9A84C]" : "border-[#E0D7C5]"}`}>
        <textarea
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              onChange(e.target.value);
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={()  => setFocused(false)}
          placeholder="Write something heartfelt... e.g. 'Happy Birthday! Hope this box brings you joy ✨'"
          rows={4}
          className="w-full bg-transparent px-4 py-3 text-sm text-[#1A160E]
            placeholder:text-[#C5B89A] outline-none resize-none rounded-xl"
        />

        {/* Char Count */}
        <div className="absolute bottom-3 right-3 text-xs text-[#A8957B]">
          {remaining} left
        </div>
      </div>

      {/* Preview */}
      {value?.trim() && (
        <div className="mt-4 bg-[#FAF7F0] border border-dashed border-[#C9A84C]
          rounded-xl p-4">
          <p className="text-xs text-[#A8957B] mb-1 uppercase tracking-widest font-medium">
            Preview
          </p>
          <p className="text-sm text-[#5C5040] italic leading-relaxed">
            "{value}"
          </p>
        </div>
      )}

    </div>
  );
};

export default GiftMessage;