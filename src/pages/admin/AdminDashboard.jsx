import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="bg-gray-800 rounded-2xl p-5 flex items-start gap-4 border border-gray-700 hover:border-gray-500 transition-colors">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white text-2xl font-bold mt-0.5">{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
  </div>
);

const statusColor = {
  pending: "bg-yellow-500/20 text-yellow-400",
  processing: "bg-blue-500/20 text-blue-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          axios.get("/api/admin/dashboard/stats"),
          axios.get("/api/admin/orders?limit=5&sort=latest"),
        ]);
        setStats(statsRes.data.data);
        setRecentOrders(ordersRes.data.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mr-3" />
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
        <AlertCircle size={18} />
        {error}
      </div>
    );
  }

  const statCards = [
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `$${stats?.total_revenue?.toLocaleString() ?? 0}`,
      sub: "All time",
      color: "bg-violet-600",
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: stats?.total_orders ?? 0,
      sub: `${stats?.pending_orders ?? 0} pending`,
      color: "bg-blue-600",
    },
    {
      icon: Package,
      label: "Products",
      value: stats?.total_products ?? 0,
      sub: `${stats?.low_stock ?? 0} low stock`,
      color: "bg-emerald-600",
    },
    {
      icon: Users,
      label: "Customers",
      value: stats?.total_users ?? 0,
      sub: `${stats?.new_users_this_month ?? 0} this month`,
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back. Here's what's happening with BoxVerse today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-800 border border-gray-700 rounded-xl px-4 py-2">
          <Clock size={15} />
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div className="flex items-center gap-2 text-white font-semibold">
            <TrendingUp size={18} className="text-violet-400" />
            Recent Orders
          </div>
          <Link
            to="/admin/orders"
            className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 transition-colors"
          >
            View all <ChevronRight size={15} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-sm px-6 py-8 text-center">
            No orders yet.
          </p>
        ) : (
          <div className="divide-y divide-gray-700">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center text-xs font-bold">
                    #{order.id}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {order.user?.name ?? "Guest"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {order.items_count} item
                      {order.items_count !== 1 ? "s" : ""} ·{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                      statusColor[order.status] ?? "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-white text-sm font-semibold">
                    ${parseFloat(order.total_price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}