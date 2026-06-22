import { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Shorthand helpers ──
  const success = (msg) => showToast(msg, "success");
  const error   = (msg) => showToast(msg, "error");
  const info    = (msg) => showToast(msg, "info");
  const warning = (msg) => showToast(msg, "warning");

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        ))}
      </div>

    </ToastContext.Provider>
  );
};

export default ToastProvider;