// src/pages/admin/Dispatchers.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { getDispatchers, createEmployee, updateEmployee, deleteUser } from "../../services/adminService";
import { getErrorMessage, formatDate } from "../../utils/helpers";

const emptyForm = { name: "", email: "", phone: "", area: "" };

export default function Dispatchers() {
  const [dispatchers, setDispatchers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = add mode, else edit mode
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [tempPassword, setTempPassword] = useState(null); // shown once after creating

  const [selected, setSelected] = useState(null); // for view-details modal
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchDispatchers = async () => {
    try {
      const res = await getDispatchers();
      setDispatchers(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDispatchers(); }, []);

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setTempPassword(null);
    setShowForm(true);
  };

  const openEditForm = (d) => {
    setEditingId(d._id);
    setForm({ name: d.name, email: d.email, phone: d.phone || "", area: d.area || "" });
    setTempPassword(null);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      toast.error("Name and email are required");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateEmployee(editingId, form);
        toast.success("Dispatcher updated");
        setShowForm(false);
        fetchDispatchers();
      } else {
        const res = await createEmployee({ ...form, role: "dispatcher" });
        setTempPassword(res.data.tempPassword);
        toast.success("Dispatcher created");
        fetchDispatchers();
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("Dispatcher removed");
      setConfirmDeleteId(null);
      fetchDispatchers();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (loading) return <Loader fullScreen />;

  const filtered = dispatchers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-medium">Dispatchers</h1>
        <Button variant="primary" onClick={openAddForm}>Add dispatcher</Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-80 border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />

      <Card>
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400">No dispatchers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Phone</th>
                  <th className="pb-2">Requests assigned</th>
                  <th className="pb-2">Jobs scheduled</th>
                  <th className="pb-2">Created</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3">
                      <button onClick={() => setSelected(d)} className="font-medium text-gray-900 hover:text-primary-600 text-left">
                        {d.name}
                      </button>
                    </td>
                    <td className="py-3">{d.email}</td>
                    <td className="py-3">{d.phone || "—"}</td>
                    <td className="py-3">{d.requestsAssigned}</td>
                    <td className="py-3">{d.jobsScheduled}</td>
                    <td className="py-3">{formatDate(d.createdAt)}</td>
                    <td className="py-3">
                      <div className="flex gap-3">
                        <button onClick={() => openEditForm(d)} className="text-primary-600 text-xs">Edit</button>
                        <button onClick={() => setConfirmDeleteId(d._id)} className="text-red-600 text-xs">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add / Edit form */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? "Edit dispatcher" : "Add dispatcher"}
        footer={
          !tempPassword && (
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Save changes" : "Create dispatcher"}
            </Button>
          )
        }
      >
        {tempPassword ? (
          <div className="space-y-3">
            <p className="text-sm text-primary-700 font-medium">Dispatcher account created</p>
            <p className="text-sm p-2 bg-gray-50 rounded-lg">
              <span className="text-gray-500">Temporary password:</span>{" "}
              <span className="font-mono font-medium">{tempPassword}</span>
            </p>
            <p className="text-xs text-gray-500">Share this with the dispatcher — they'll be required to change it on first login.</p>
            <Button variant="secondary" onClick={() => setShowForm(false)} className="w-full">Done</Button>
          </div>
        ) : (
          <div className="space-y-3">
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} disabled={!!editingId} />
            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            <input placeholder="Area / region" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={inputClass} />
          </div>
        )}
      </Modal>

      {/* View details modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="text-sm space-y-2">
            <p><span className="text-gray-500">Email:</span> {selected.email}</p>
            <p><span className="text-gray-500">Phone:</span> {selected.phone || "Not provided"}</p>
            <p><span className="text-gray-500">Area:</span> {selected.area || "Not set"}</p>
            <p><span className="text-gray-500">Requests assigned:</span> {selected.requestsAssigned}</p>
            <p><span className="text-gray-500">Jobs scheduled:</span> {selected.jobsScheduled}</p>
            <p><span className="text-gray-500">Created:</span> {formatDate(selected.createdAt)}</p>
          </div>
        )}
      </Modal>

      {/* Delete confirmation */}
      <Modal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Remove dispatcher?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
            <Button variant="primary" onClick={() => handleDelete(confirmDeleteId)}>Remove</Button>
          </>
        }
      >
        <p className="text-sm text-gray-600">This will permanently remove this dispatcher's account. This can't be undone.</p>
      </Modal>
    </div>
  );
}
