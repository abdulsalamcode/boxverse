import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home         from "../pages/Home";
import BoxBuilder   from "../pages/BoxBuilder";
import Checkout     from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import AuthGuard    from "./AuthGuard";

const AppRouter = () => {
  return (
    <Router>
      <Routes>

        {/* ── Public Routes ── */}
        <Route path="/"     element={<Home />}       />
        <Route path="/build" element={<BoxBuilder />} />

        {/* ── Protected Routes ── */}
        <Route
          path="/checkout"
          element={
            <AuthGuard>
              <Checkout />
            </AuthGuard>
          }
        />
        <Route
          path="/order-success"
          element={
            <AuthGuard>
              <OrderSuccess />
            </AuthGuard>
          }
        />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;