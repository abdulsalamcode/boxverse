import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Users,
  X,
  Eye,
  ShieldCheck,
  User,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ROLE_STYLE = {
  admin: "bg-violet-500/20 text-violet-400 border border-violet-500/30",
  user:  "bg-gray-600/50   text-gray-400   border border-gray-600",
};

const RoleBadge = ({ role }) => (
  <span
    className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize flex items-center gap-1 w-fit ${
      ROLE_STYLE[role] ?? "bg-gray-700 text-gray-400"
    }`}
  >
    {role === "admin" ? <ShieldCheck size={11} /> : <User size={11} />}
    {role}
  </span>
);

const Avatar = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";
  return (
    <div className="w-9 h-9 rounded-full bg-violet-600/30 text-violet-400 flex items-center justify-center text-xs font-bold shrink-0">
      {initials}
    </div>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
    <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
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

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [detailUser, setDetailUser] = useState(null);
  const [togglingRole, setTogglingRole] = useState(false);

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/admin/users", {
        params: {
          search,
          role: roleFilter === "all" ? undefined : roleFilter,
          page,
          per_page: 10,
        },
      });
      setUsers(res.data.data);
      setPagination(res.data.meta ?? { current_page: 1, last_page: 1 });
    } catch {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleRoleToggle = async (user) => {
    setTogglingRole(true);
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      const res = await axios.patch(`/api/admin/users/${user.id}/role`, {
        role: newRole,
      });
      setDetailUser(res.data.data);
      fetchUsers();
    } catch {
      // handle error
    } finally {
      setTogglingRole(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage customer accounts and admin roles.
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
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          />
        </div>

        <div className="flex gap-2">
          {["all", "user", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => {
                setRoleFilter(r);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-colors ${
                roleFilter === r
                  ? "bg-violet-600 text-white"
                  : "bg-gray-800 border border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              {r}
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
            Loading users…
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-500">
            <Users size={36} className="opacity-30" />
            <p className="text-sm">No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-left">
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Orders</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} />
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-5 py-4 text-gray-300">
                      {user.orders_count ?? 0}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setDetailUser(user)}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition"
                        title="View user"
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
        {!loading && !error && users.length > 0 && (
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

      {/* User Detail Modal */}
      {detailUser && (
        <Modal
          title="User Details"
          onClose={() => setDetailUser(null)}
        >
          {/* Profile */}
          <div className="flex items-center gap-4">
            <Avatar name={detailUser.name} />
            <div>
              <p className="text-white font-semibold">{detailUser.name}</p>
              <p className="text-gray-400 text-sm">{detailUser.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-700/50 rounded-xl p-4">
              <p className="text-gray-400 text-xs">Total Orders</p>
              <p className="text-white text-xl font-bold mt-0.5">
                {detailUser.orders_count ?? 0}
              </p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4">
              <p className="text-gray-400 text-xs">Total Spent</p>
              <p className="text-white text-xl font-bold mt-0.5">
                ${parseFloat(detailUser.total_spent ?? 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Current role */}
          <div className="flex items-center justify-between bg-gray-700/50 rounded-xl px-4 py-3">
            <div>
              <p className="text-gray-400 text-xs mb-1">Current Role</p>
              <RoleBadge role={detailUser.role} />
            </div>
            <button
              onClick={() => handleRoleToggle(detailUser)}
              disabled={togglingRole}
              className="text-xs px-3 py-1.5 rounded-xl bg-gray-600 hover:bg-gray-500 disabled:opacity-50 text-white transition-colors font-medium"
            >
              {togglingRole
                ? "Updating…"
                : detailUser.role === "admin"
                ? "Remove Admin"
                : "Make Admin"}
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setDetailUser(null)}
              className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}