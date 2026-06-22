import axios from "axios";

const api = axios.create({
  baseURL:        import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Accept":       "application/json",
  },
  withCredentials: true,
});

// ── Request Interceptor — attach token ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bv_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor — handle errors ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("bv_token");
      localStorage.removeItem("bv_user");
      window.location.href = "/";
    }

    if (status === 422) {
      return Promise.reject(error.response.data);
    }

    if (status === 500) {
      console.error("Server error — please try again later.");
    }

    return Promise.reject(error);
  }
);

export default api;