import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AuthGuard = ({ children }) => {
  const user  = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const isAuthenticated = !!user && !!token;

  // ── Not Authenticated — Redirect to Home ──
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ── Authenticated — Render Page ──
  return children;
};

export default AuthGuard;