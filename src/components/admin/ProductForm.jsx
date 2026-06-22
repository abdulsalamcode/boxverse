import { useState }  from "react";
import Input         from "../common/Input";
import Button        from "../common/Button";

const CATEGORIES = ["self-care", "artisan", "tech", "lifestyle"];

const ProductForm = ({ product = null, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name:     product?.name     || "",
    brand:    product?.brand    || "",
    emoji:    product?.emoji    || "✨",
    price:    product?.price    || "",
    category: product?.category || "self-care",
    description: product?.description || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim())    err.name  = "Name is required";
    if (!form.brand.trim())   err.brand = "Brand is required";
    if (!form.price)          err.price = "Price is required";
    else if (isNaN(form.price) || form.price <= 0)
                              err.price = "Enter a valid price";
    return err;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSave({ ...form, price: parseFloat(form.price) });
  };

  return (
    <div className="bg-white border border-[#EDE5D4] rounded-2xl p-6">

      <h3 className="font-serif text-lg font-bold text-[#1A160E] mb-5">
        {product ? "Edit Product" : "Add New Product"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
          label="Product Name"
          placeholder="Cedar & Sage Candle"
          value={form.name}
          onChange={handleChange("name")}
          error={errors.name}
        />
        <Input
          label="Brand"
          placeholder="Botanica Co."
          value={form.brand}
          onChange={handleChange("brand")}
          error={errors.brand}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <Input
          label="Emoji"
          placeholder="🕯️"
          value={form.emoji}
          onChange={handleChange("emoji")}
        />
        <Input
          label="Price ($)"
          type="number"
          placeholder="18.00"
          value={form.price}
          onChange={handleChange("price")}
          error={errors.price}
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#5C5040]">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="bg-[#FAF7F0] border border-[#E0D7C5] rounded-lg
              px-3 py-2.5 text-sm text-[#1A160E] outline-none
              focus:border-[#C9A84C] transition-all duration-200"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label className="text-xs font-semibold text-[#5C5040] block mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Short product description..."
          rows={3}
          className="w-full bg-[#FAF7F0] border border-[#E0D7C5] rounded-lg
            px-3 py-2.5 text-sm text-[#1A160E] outline-none resize-none
            focus:border-[#C9A84C] transition-all duration-200"
        />
      </div>

      <div className="flex gap-3">
        <Button label="Cancel" variant="outline" onClick={onCancel} />
        <Button
          label={product ? "Save Changes ✦" : "Add Product ✦"}
          variant="primary"
          onClick={handleSubmit}
        />
      </div>

    </div>
  );
};

export default ProductForm;