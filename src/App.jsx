import { useState, useEffect }                              from "react";
import { BrowserRouter as Router, Routes, Route, Navigate,
         useLocation }                                      from "react-router-dom";

// ── Pages ──
import Home         from "./pages/Home";
import BoxBuilder   from "./pages/BoxBuilder";
import Checkout     from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

// ── Auth Pages ──
import UserProfile  from "./components/Auth/UserProfile";
import OrderHistory from "./components/Auth/OrderHistory";
import AuthModal    from "./components/Auth/AuthModal";

// ── Gamification (capital G — matches actual folder name) ──
import RewardsPage from "./components/Gamification/RewardsPage";

// ── Guards ──
import AuthGuard  from "./routes/AuthGuard";
import AdminGuard from "./routes/AdminGuard";

// ── Admin ──
import AdminLayout     from "./pages/admin/AdminLayout";
import AdminDashboard  from "./pages/admin/AdminDashboard";
import AdminProducts   from "./pages/admin/AdminProducts";
import AdminBoxes      from "./pages/admin/AdminBoxes";
import AdminOrders     from "./pages/admin/AdminOrders";
import AdminUsers      from "./pages/admin/AdminUsers";

// ── UI ──
import { ToastProvider } from "./components/ui/ToastProvider";
import { useUIStore }    from "./store/uiStore";

// ── Page Transition ──
const PageTransition = ({ children }) => {
  const location              = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className={`transition-all duration-500
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {children}
    </div>
  );
};

// ── All Routes ──
const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>

        {/* ── Public Routes ── */}
        <Route path="/"        element={<Home />}        />
        <Route path="/build"   element={<BoxBuilder />}  />
        <Route path="/rewards" element={<RewardsPage />} />

        {/* ── Protected Routes (logged-in user) ── */}
        <Route path="/checkout"
          element={<AuthGuard><Checkout /></AuthGuard>}
        />
        <Route path="/order-success"
          element={<AuthGuard><OrderSuccess /></AuthGuard>}
        />
        <Route path="/profile"
          element={<AuthGuard><UserProfile /></AuthGuard>}
        />
        <Route path="/orders"
          element={<AuthGuard><OrderHistory /></AuthGuard>}
        />

        {/* ── Admin Routes (admin role only) ── */}
        <Route path="/admin"
          element={<AdminGuard><AdminLayout /></AdminGuard>}
        >
          <Route index               element={<AdminDashboard />} />
          <Route path="products"     element={<AdminProducts />}  />
          <Route path="boxes"        element={<AdminBoxes />}     />
          <Route path="orders"       element={<AdminOrders />}    />
          <Route path="users"        element={<AdminUsers />}     />
        </Route>

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </PageTransition>
  );
};

// ── Root App ──
const App = () => {
  const authModalOpen  = useUIStore((state) => state.authModalOpen);
  const closeAuthModal = useUIStore((state) => state.closeAuthModal);

  return (
    <Router>
      <ToastProvider>
        <AppRoutes />

        {/* Rendered at root level — outside PageTransition's transform context,
            so position:fixed centers correctly regardless of scroll. */}
        <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
      </ToastProvider>
    </Router>
  );
};

export default App;