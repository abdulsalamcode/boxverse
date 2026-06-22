import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  X,
  Eye,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUSES = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

const STATUS_STYLE = {
  pending:    "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  processing: "bg-blue-500/20   text-blue-400   border border-blue-500/30",
  shipped:    "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  delivered:  "bg-green-500/20  text-green-400  border border-green-500/30",
  cancelled:  "bg-red-500/20    text-red-400    border border-red-500/30",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => (
  <span
    className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
      STATUS_STYLE[status] ?? "bg-gray-700 text-gray-400"
    }`}
  >
    {status}
  </span>
);

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
    <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      <div className="px-6 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [detailOrder, setDetailOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/admin/orders", {
        params: {
          search,
          status: statusFilter === "all" ? undefined : statusFilter,
          page,
          per_page: 10,
        },
      });
      setOrders(res.data.data);
      setPagination(res.data.meta ?? { current_page: 1, last_page: 1 });
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const openDetail = (order) => {
    setDetailOrder(order);
    setNewStatus(order.status);
  };

  const handleStatusUpdate = async () => {
    if (!detailOrder || newStatus === detailOrder.status) return;
    setUpdatingStatus(true);
    try {
      const res = await axios.patch(`/api/admin/orders/${detailOrder.id}/status`, {
        status: newStatus,
      });
      setDetailOrder(res.data.data);
      fetchOrders();
    } catch {
      // handle error
    } finally {
      setUpdatingStatus(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">
          Track and manage customer orders.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by customer or order ID…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "bg-violet-600 text-white"
                  : "bg-gray-800 border border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        {error ? (
          <div className="flex items-center gap-2 text-red-400 p-6">
            <AlertCircle size={16} />
            {error}
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm gap-2">
            <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            Loading orders…
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-500">
            <ShoppingBag size={36} className="opacity-30" />
            <p className="text-sm">No orders match your filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-left">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Items</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-5 py-4 text-violet-400 font-medium">
                      #{order.id}
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-white">{order.user?.name ?? "Guest"}</p>
                        <p className="text-gray-500 text-xs">
                          {order.user?.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-300">
                      {order.items_count}{" "}
                      {order.items_count === 1 ? "item" : "items"}
                    </td>
                    <td className="px-5 py-4 text-white font-semibold">
                      ${parseFloat(order.total_price).toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openDetail(order)}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition"
                        title="View order"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && orders.length > 0 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-700">
            <span className="text-gray-500 text-sm">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={pagination.current_page === 1}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setPage((p) => Math.min(p + 1, pagination.last_page))
                }
                disabled={pagination.current_page === pagination.last_page}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {detailOrder && (
        <Modal
          title={`Order #${detailOrder.id}`}
          onClose={() => setDetailOrder(null)}
        >
          {/* Customer info */}
          <div className="bg-gray-700/50 rounded-xl p-4 space-y-1">
            <p className="text-white font-medium">
              {detailOrder.user?.name ?? "Guest"}
            </p>
            <p className="text-gray-400 text-sm">{detailOrder.user?.email}</p>
            {detailOrder.shipping_address && (
              <p className="text-gray-500 text-xs mt-1">
                {detailOrder.shipping_address}
              </p>
            )}
          </div>

          {/* Items */}
          {detailOrder.items?.length > 0 && (
            <div className="space-y-2">
              <p className="text-gray-400 text-sm font-medium">Items</p>
              <div className="space-y-2">
                {detailOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-700/50 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-white text-sm">{item.product?.name}</p>
                      <p className="text-gray-500 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-white text-sm font-medium">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-700">
                <span className="text-gray-400 text-sm">Total</span>
                <span className="text-white font-bold">
                  ${parseFloat(detailOrder.total_price).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Status update */}
          <div className="space-y-2">
            <p className="text-gray-400 text-sm font-medium">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.filter((s) => s !== "all").map((s) => (
                <button
                  key={s}
                  onClick={() => setNewStatus(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors ${
                    newStatus === s
                      ? "bg-violet-600 text-white"
                      : "bg-gray-700 text-gray-400 hover:text-white border border-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDetailOrder(null)}
              className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-sm transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleStatusUpdate}
              disabled={updatingStatus || newStatus === detailOrder.status}
              className="px-5 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white rounded-xl text-sm font-medium transition-colors"
            >
              {updatingStatus ? "Updating…" : "Update Status"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}