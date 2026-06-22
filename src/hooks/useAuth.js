import { useState, useEffect } from "react";

const useAuth = () => {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Load from localStorage on mount ──
  useEffect(() => {
    const storedToken = localStorage.getItem("bv_token");
    const storedUser  = localStorage.getItem("bv_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ── Login ──
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("bv_token",  authToken);
    localStorage.setItem("bv_user",   JSON.stringify(userData));
  };

  // ── Logout ──
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("bv_token");
    localStorage.removeItem("bv_user");
  };

  const isAuthenticated = !!token && !!user;

  return {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  };
};

export default useAuth;