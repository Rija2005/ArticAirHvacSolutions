
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { getUsersByRole, deleteUser as apiDeleteUser } from "../../services/adminService";

export default function Customers() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await getUsersByRole("customer");
        if (!mounted) return;
        setCustomers(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load customers");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const filtered = customers.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer? This action cannot be undone.")) return;
    try {
      await apiDeleteUser(id);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="relative min-h-screen p-2 md:p-6 space-y-6 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-sky-50/30 to-orange-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Dynamic Animated Background Blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-accent-500/10 dark:bg-accent-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Header & Interactive Search Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
            Customer Management
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 mt-1">
            View, search, and manage your active customer base.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <i className="ti ti-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 text-base" aria-hidden="true" />
          <input
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-800 dark:text-slate-100 transition-all duration-200 shadow-sm placeholder:text-gray-400 dark:placeholder:text-slate-500 hover:border-accent-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-50/50 dark:focus:ring-primary-900/30 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Glassmorphism Data Card */}
      <Card className="relative z-10 border border-white/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-400 border-b border-gray-100 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-800/50">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Requests</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400 dark:text-slate-400 text-sm">Loading customers...</td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr 
                    key={c._id} 
                    className="group hover:bg-sky-50/40 dark:hover:bg-slate-700/40 transition-all duration-200"
                  >
                    {/* Name + Custom Initial Avatar */}
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-600 to-primary-500 text-white font-semibold flex items-center justify-center text-xs shadow-md shadow-primary-500/20 group-hover:scale-110 transition-transform duration-200">
                        {c.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-slate-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                          {c.name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-slate-500">{c.id || c._id}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-600 dark:text-slate-300">{c.email}</td>
                    
                    <td className="py-3.5 px-4 font-medium text-gray-700 dark:text-slate-200">
                      <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-slate-700/60 px-2.5 py-0.5 rounded-full text-xs font-semibold text-gray-700 dark:text-slate-200 border border-transparent dark:border-slate-600">
                        <i className="ti ti-file-text text-gray-400 dark:text-slate-400" aria-hidden="true" />
                        {c.requests || 0}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge status={c.status}>{c.status === "completed" ? "Active" : "New"}</Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => setSelected(c)}
                          variant="secondary"
                          className="text-xs px-3 py-1 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:bg-accent-500 hover:text-white dark:hover:bg-accent-500 dark:hover:text-white border border-gray-200 dark:border-slate-600 shadow-sm transition-all duration-200"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleDelete(c._id)}
                          variant="outline"
                          className="text-xs px-3 py-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400 dark:text-slate-400 text-sm">
                    {error ? error : `No customers found matching "${search}"`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upgraded Pop-out Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name || "Customer Details"}>
        {selected && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-orange-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-primary-100/50 dark:border-slate-700">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-lg shadow-md shadow-primary-500/30">
                {selected.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-base">{selected.name}</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">ID: {selected.id || selected._id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-gray-50 dark:bg-slate-800/80 rounded-lg border border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium uppercase">Email</p>
                <p className="font-medium text-gray-700 dark:text-slate-200 mt-0.5 truncate">{selected.email}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-slate-800/80 rounded-lg border border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium uppercase">Phone</p>
                <p className="font-medium text-gray-700 dark:text-slate-200 mt-0.5">{selected.phone || "N/A"}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-slate-800/80 rounded-lg border border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium uppercase">Total Requests</p>
                <p className="font-medium text-gray-700 dark:text-slate-200 mt-0.5">{selected.requests || 0}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-slate-800/80 rounded-lg border border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium uppercase">Region</p>
                <p className="font-medium text-gray-700 dark:text-slate-200 mt-0.5">{selected.location || "N/A"}</p>
              </div>
            </div>

            <div className="pt-2">
              <Button 
                onClick={() => setSelected(null)} 
                variant="primary" 
                className="w-full bg-primary-500 hover:bg-primary-600 text-white"
              >
                Close Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}