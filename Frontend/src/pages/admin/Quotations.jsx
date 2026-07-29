// src/pages/admin/Quotations.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { getAllQuotations, createQuotation, getAllRequests } from "../../services/adminService";
import { getErrorMessage, calculateQuotationTotal } from "../../utils/helpers";

export default function Quotations() {
  const [quotes, setQuotes] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ request: "", laborCost: "", equipmentCost: "", tax: "", discount: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [quoteRes, reqRes] = await Promise.all([getAllQuotations(), getAllRequests()]);
      setQuotes(quoteRes.data);
      // Only requests without an existing quotation should be selectable
      const quotedRequestIds = quoteRes.data.map((q) => q.request?._id);
      setRequests(reqRes.data.filter((r) => !quotedRequestIds.includes(r._id)));
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
      await createQuotation(form);
      toast.success("Quotation sent to customer");
      setForm({ request: "", laborCost: "", equipmentCost: "", tax: "", discount: "" });
      setShowNew(false);
      fetchData();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-medium">Quotations</h1>
        <Button variant="primary" onClick={() => setShowNew(true)}>Generate quotation</Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Card>
        {quotes.length === 0 ? (
          <p className="text-sm text-gray-400">No quotations yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-2">Quote</th><th className="pb-2">Customer</th><th className="pb-2">Service</th>
                  <th className="pb-2">Total</th><th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3">{q._id.slice(-6)}</td>
                    <td className="py-3">{q.request?.customer?.name}</td>
                    <td className="py-3">{q.request?.service?.name}</td>
                    <td className="py-3">${calculateQuotationTotal(q)}</td>
                    <td className="py-3"><Badge status={q.approvalStatus}>{q.approvalStatus}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={showNew} onClose={() => setShowNew(false)} title="Generate quotation"
        footer={<Button variant="primary" onClick={handleCreate} disabled={saving || !form.request}>{saving ? "Sending..." : "Send quotation"}</Button>}>
        <div className="space-y-3">
          <select value={form.request} onChange={(e) => setForm({ ...form, request: e.target.value })} className={inputClass}>
            <option value="">Select a request</option>
            {requests.map((r) => (
              <option key={r._id} value={r._id}>{r.service?.name} — {r.customer?.name}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Labor cost" type="number" value={form.laborCost} onChange={(e) => setForm({ ...form, laborCost: e.target.value })} className={inputClass} />
            <input placeholder="Equipment cost" type="number" value={form.equipmentCost} onChange={(e) => setForm({ ...form, equipmentCost: e.target.value })} className={inputClass} />
            <input placeholder="Tax" type="number" value={form.tax} onChange={(e) => setForm({ ...form, tax: e.target.value })} className={inputClass} />
            <input placeholder="Discount" type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className={inputClass} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
