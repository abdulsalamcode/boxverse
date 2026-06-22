import { useState }    from "react";
import Input           from "../common/Input";
import Button          from "../common/Button";
import { useToast }    from "../ui/ToastProvider";
import { useAuthStore } from "../../store/authStore";

const LoginForm = ({ onSuccess, onSwitch }) => {
  const { setAuth }            = useAuthStore();
  const { success, error }     = useToast();
  const [loading, setLoading]  = useState(false);

  const [form, setForm] = useState({
    email:    "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.email.trim())    err.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
                               err.email    = "Enter a valid email";
    if (!form.password.trim()) err.password = "Password is required";
    return err;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      // TEMP TEST LOGIC — replace with authService.login(form) once backend is ready.
      // If the email contains the word "admin", we log in as an admin for testing.
      await new Promise((res) => setTimeout(res, 800));

      const isAdmin = form.email.toLowerCase().includes("admin");

      setAuth(
        {
          name:  isAdmin ? "Admin User" : "Test User",
          email: form.email,
          role:  isAdmin ? "admin" : "user",
        },
        "mock_token_" + Date.now()
      );

      success(
        isAdmin
          ? "Welcome back, Admin!"
          : "Welcome back to BoxVerse!"
      );
      onSuccess();
    } catch {
      error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">

      <div>
        <h2 className="font-serif text-xl font-bold text-[#1A160E]">
          Welcome Back
        </h2>
        <p className="text-xs text-[#A8957B] mt-1">
          Sign in to continue crafting your BoxVerse.
        </p>
        <p className="text-[11px] text-[#C9A84C] mt-2 italic">
          Test tip: use any email containing "admin" (e.g. admin@boxverse.com) to log in as admin.
        </p>
      </div>

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
        placeholder="********"
        value={form.password}
        onChange={handleChange("password")}
        error={errors.password}
      />

      {/* Forgot Password */}
      <div className="text-right">
        <button className="text-xs text-[#C9A84C] hover:text-[#7A5E1A]
          transition-colors duration-200">
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#1A160E] text-[#C9A84C] font-serif font-bold
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
            Signing in...
          </>
        ) : "Sign In"}
      </button>

      {/* Switch */}
      <p className="text-xs text-center text-[#A8957B]">
        Don't have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-[#C9A84C] font-semibold hover:text-[#7A5E1A]
            transition-colors duration-200"
        >
          Create one
        </button>
      </p>

    </div>
  );
};

export default LoginForm;