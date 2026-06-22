import { useState }  from "react";
import Input         from "../common/Input";
import Button        from "../common/Button";
import { useToast }  from "../ui/ToastProvider";
import { useAuthStore } from "../../store/authStore";

const UserProfile = () => {
  const { user, logout }      = useAuthStore();
  const { success }           = useToast();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name:  user?.name  || "",
    email: user?.email || "",
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSave = () => {
    // Replace with authService.updateProfile(form)
    success("Profile updated successfully! ✦");
    setEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-[#1A160E] flex items-center
          justify-center text-4xl mb-3 border-4 border-[#C9A84C]">
          👤
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#1A160E]">
          {user?.name || "BoxVerse User"}
        </h2>
        <p className="text-sm text-[#A8957B]">{user?.email}</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-[#EDE5D4] rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-lg font-bold text-[#1A160E]">
            Profile Details
          </h3>
          <button
            onClick={() => setEditing(!editing)}
            className="text-xs text-[#C9A84C] font-semibold hover:text-[#7A5E1A]
              transition-colors duration-200"
          >
            {editing ? "Cancel" : "Edit ✎"}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Full Name"
            value={form.name}
            onChange={handleChange("name")}
            disabled={!editing}
          />
          <Input
            label="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            disabled={!editing}
          />
        </div>

        {editing && (
          <div className="mt-5">
            <Button
              label="Save Changes ✦"
              variant="primary"
              onClick={handleSave}
            />
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="bg-white border border-[#EDE5D4] rounded-2xl p-6">
        <h3 className="font-serif text-lg font-bold text-[#1A160E] mb-4">
          Account
        </h3>
        <Button
          label="Sign Out"
          variant="outline"
          onClick={() => {
            logout();
            success("Signed out successfully.");
          }}
        />
      </div>

    </div>
  );
};

export default UserProfile;