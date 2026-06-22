import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AdminGuard = ({ children }) => {
  const { user, token } = useAuthStore();

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminGuard;