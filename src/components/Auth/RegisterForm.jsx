import { useState }  from "react";
import Input         from "../common/Input";
import { useToast }  from "../ui/ToastProvider";
import { useAuthStore } from "../../store/authStore";

const RegisterForm = ({ onSuccess, onSwitch }) => {
  const { setAuth }           = useAuthStore();
  const { success, error }    = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name:            "",
    email:           "",
    password:        "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim())     err.name  = "Name is required";
    if (!form.email.trim())    err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
                               err.email = "Enter a valid email";
    if (!form.password.trim()) err.password = "Password is required";
    else if (form.password.length < 8)
                               err.password = "Minimum 8 characters";
    if (form.password !== form.confirmPassword)
                               err.confirmPassword = "Passwords do not match";
    return err;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      // Simulate API -- replace with authService.register(form)
      await new Promise((res) => setTimeout(res, 1200));
      setAuth(
        { name: form.name, email: form.email, role: "user" },
        "mock_token_" + Date.now()
      );
      success("Welcome to BoxVerse! Your journey begins.");
      onSuccess();
    } catch {
      error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">

      <div>
        <h2 className="font-serif text-xl font-bold text-[#1A160E]">
          Create Account
        </h2>
        <p className="text-xs text-[#A8957B] mt-1">
          Join BoxVerse and start crafting your story.
        </p>
      </div>

      <Input
        label="Full Name"
        placeholder="Aria Sinclair"
        value={form.name}
        onChange={handleChange("name")}
        error={errors.name}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="aria@example.com"
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Min 8 characters"
        value={form.password}
        onChange={handleChange("password")}
        error={errors.password}
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Repeat password"
        value={form.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#C9A84C] text-[#1A160E] font-serif font-bold
          text-sm py-3 rounded-xl transition-all duration-200
          hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Creating Account...
          </>
        ) : "Create Account"}
      </button>

      {/* Switch */}
      <p className="text-xs text-center text-[#A8957B]">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-[#C9A84C] font-semibold hover:text-[#7A5E1A]
            transition-colors duration-200"
        >
          Sign in
        </button>
      </p>

    </div>
  );
};

export default RegisterForm;