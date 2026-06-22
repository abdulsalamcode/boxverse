import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function AdminGuard() {
  const user = useAuthStore((state) => state.user);

  // Not logged in at all
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not an admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Authorized — render the nested admin routes
  return <Outlet />;
}