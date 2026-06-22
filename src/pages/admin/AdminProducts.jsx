import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  image_url: "",
  is_active: true,
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const InputField = ({ label, error, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm text-gray-400">{label}</label>
    <input
      className={`w-full bg-gray-700 border rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ${
        error ? "border-red-500" : "border-gray-600"
      }`}
      {...props}
    />
    {error && <p className="text-red-400 text-xs">{error}</p>}
  </div>
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
      <div className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = create mode
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch ────────────────────────────────────────────────────────────────

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/admin/products", {
        params: { search, page, per_page: 10 },
      });
      setProducts(res.data.data);
      setPagination(res.data.meta ?? { current_page: 1, last_page: 1 });
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditTarget(product);
    setForm({
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      category: product.category ?? "",
      image_url: product.image_url ?? "",
      is_active: product.is_active ?? true,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setFormErrors({});
    try {
      if (editTarget) {
        await axios.put(`/api/admin/products/${editTarget.id}`, form);
      } else {
        await axios.post("/api/admin/products", form);
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      if (err.response?.status === 422) {
        setFormErrors(err.response.data.errors ?? {});
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await axios.delete(`/api/admin/products/${deleteTarget.id}`);
      setDeleteTarget(null);
      fetchProducts();
    } catch {
      // silently retry or show toast
    } finally {
      setDeleting(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your product catalogue.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />
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
            Loading products…
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-500">
            <Package size={36} className="opacity-30" />
            <p className="text-sm">No products found.</p>
            <button
              onClick={openCreate}
              className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-left">
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Stock</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-9 h-9 rounded-lg object-cover bg-gray-700"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-gray-700 flex items-center justify-center">
                            <Package size={16} className="text-gray-500" />
                          </div>
                        )}
                        <span className="text-white font-medium">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-400">
                      {product.category ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-white">
                      ${parseFloat(product.price).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-white">{product.stock}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          product.is_active
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-600/50 text-gray-400"
                        }`}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && products.length > 0 && (
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

      {/* Create / Edit Modal */}
      {modalOpen && (
        <Modal
          title={editTarget ? "Edit Product" : "Add Product"}
          onClose={() => setModalOpen(false)}
        >
          <InputField
            label="Name"
            placeholder="Wireless Headphones"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={formErrors.name?.[0]}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Price ($)"
              type="number"
              min="0"
              step="0.01"
              placeholder="29.99"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              error={formErrors.price?.[0]}
            />
            <InputField
              label="Stock"
              type="number"
              min="0"
              placeholder="100"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              error={formErrors.stock?.[0]}
            />
          </div>
          <InputField
            label="Category"
            placeholder="Electronics"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            error={formErrors.category?.[0]}
          />
          <InputField
            label="Image URL"
            placeholder="https://..."
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            error={formErrors.image_url?.[0]}
          />
          <div className="space-y-1">
            <label className="block text-sm text-gray-400">Description</label>
            <textarea
              rows={3}
              placeholder="Short product description…"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition resize-none"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() =>
                setForm({ ...form, is_active: !form.is_active })
              }
              className={`w-10 h-6 rounded-full relative transition-colors ${
                form.is_active ? "bg-violet-600" : "bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  form.is_active ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </div>
            <span className="text-sm text-gray-300">Active</span>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
            >
              {saving ? "Saving…" : editTarget ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <Modal title="Delete Product" onClose={() => setDeleteTarget(null)}>
          <p className="text-gray-300 text-sm">
            Are you sure you want to delete{" "}
            <span className="text-white font-semibold">{deleteTarget.name}</span>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}