// src/pages/admin/MaintenancePlans.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { getAllContracts, createContract, getUsersByRole } from "../../services/adminService";
import { getErrorMessage, formatDate } from "../../utils/helpers";

const planPrices = { basic: 99, standard: 179, premium: 299 };

export default function MaintenancePlans() {
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ customer: "", planType: "basic", startDate: "", renewalDate: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [contractRes, customerRes] = await Promise.all([getAllContracts(), getUsersByRole("customer")]);
      setContracts(contractRes.data);
      setCustomers(customerRes.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    setSaving(true);
    try {
      await createContract(form);
      toast.success("Maintenance contract created");
      setForm({ customer: "", planType: "basic", startDate: "", renewalDate: "" });
      setShowNew(false);
      fetchData();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  const planStats = ["basic", "standard", "premium"].map((type) => ({
    id: type,
    name: type.charAt(0).toUpperCase() + type.slice(1),
    price: planPrices[type],
    activeContracts: contracts.filter((c) => c.planType === type && c.status === "active").length,
  }));

  const renewalsDue = contracts
    .filter((c) => c.status === "active" && new Date(c.renewalDate) - new Date() < 30 * 24 * 60 * 60 * 1000)
    .slice(0, 5);

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-medium">Maintenance plans</h1>
        <Button variant="primary" onClick={() => setShowNew(true)}>New contract</Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {planStats.map((p) => (
          <Card key={p.id}>
            <p className="font-medium">{p.name}</p>
            <p className="text-2xl font-medium mt-1 text-primary-600">${p.price}/yr</p>
            <p className="text-xs text-gray-500 mt-2">{p.activeContracts} active</p>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="font-medium mb-4 text-sm">Renewals due soon</h2>
        {renewalsDue.length === 0 ? (
          <p className="text-sm text-gray-400">No renewals due in the next 30 days.</p>
        ) : (
          <div className="space-y-3">
            {renewalsDue.map((r) => (
              <div key={r._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-3 last:border-0 gap-2">
                <div>
                  <p className="text-sm font-medium">{r.customer?.name} — {r.planType}</p>
                  <p className="text-xs text-gray-500">Due {formatDate(r.renewalDate)}</p>
                </div>
                <Badge status="pending">Renewal due</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={showNew} onClose={() => setShowNew(false)} title="New maintenance contract"
        footer={<Button variant="primary" onClick={handleCreate} disabled={saving}>{saving ? "Saving..." : "Create"}</Button>}>
        <div className="space-y-3">
          <select value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} className={inputClass}>
            <option value="">Select customer</option>
            {customers.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select value={form.planType} onChange={(e) => setForm({ ...form, planType: e.target.value })} className={inputClass}>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className={inputClass} />
          <input type="date" value={form.renewalDate} onChange={(e) => setForm({ ...form, renewalDate: e.target.value })} className={inputClass} />
        </div>
      </Modal>
    </div>
  );
}
