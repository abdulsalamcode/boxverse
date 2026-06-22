import { useState } from "react";
import Input        from "../common/Input";
import Button       from "../common/Button";

const SIZES = ["petite", "signature", "grand"];

const BoxForm = ({ box = null, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name:       box?.name       || "",
    emoji:      box?.emoji      || "📦",
    size:       box?.size       || "petite",
    price:      box?.price      || "",
    capacity:   box?.capacity   || "",
    description: box?.description || "",
    is_popular: box?.is_popular || false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim())   err.name     = "Name is required";
    if (!form.price)         err.price    = "Price is required";
    if (!form.capacity)      err.capacity = "Capacity is required";
    return err;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSave({
      ...form,
      price:    parseFloat(form.price),
      capacity: parseInt(form.capacity),
    });
  };

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-6">

      <h3 className="font-serif text-lg font-bold text-[#1A160E] mb-5">
        {box ? "Edit Box" : "Add New Box"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
          label="Box Name"
          placeholder="Signature Vault"
          value={form.name}
          onChange={handleChange("name")}
          error={errors.name}
        />
        <Input
          label="Emoji"
          placeholder="🎁"
          value={form.emoji}
          onChange={handleChange("emoji")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#5C5040]">Size</label>
          <select
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
            className="bg-[#FAF7F0] border border-[#E0D7C5] rounded-lg
              px-3 py-2.5 text-sm text-[#1A160E] outline-none
              focus:border-[#C9A84C] transition-all duration-200"
          >
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Price ($)"
          type="number"
          placeholder="14.99"
          value={form.price}
          onChange={handleChange("price")}
          error={errors.price}
        />
        <Input
          label="Capacity (items)"
          type="number"
          placeholder="6"
          value={form.capacity}
          onChange={handleChange("capacity")}
          error={errors.capacity}
        />
      </div>

      <div className="mb-4">
        <label className="text-xs font-semibold text-[#5C5040] block mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Short box description..."
          rows={3}
          className="w-full bg-[#FAF7F0] border border-[#E0D7C5] rounded-lg
            px-3 py-2.5 text-sm text-[#1A160E] outline-none resize-none
            focus:border-[#C9A84C] transition-all duration-200"
        />
      </div>

      {/* Popular Toggle */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setForm({ ...form, is_popular: !form.is_popular })}
          className={`w-10 h-5 rounded-full transition-all duration-300
            ${form.is_popular ? "bg-[#C9A84C]" : "bg-[#E0D7C5]"}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow transition-all
            duration-300 mx-0.5
            ${form.is_popular ? "translate-x-5" : "translate-x-0"}`}
          />
        </button>
        <span className="text-sm text-[#5C5040]">Mark as Popular</span>
      </div>

      <div className="flex gap-3">
        <Button label="Cancel"  variant="outline"  onClick={onCancel}    />
        <Button
          label={box ? "Save Changes ✦" : "Add Box ✦"}
          variant="primary"
          onClick={handleSubmit}
        />
      </div>

    </div>
  );
};

export default BoxForm;