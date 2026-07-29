// src/pages/admin/Payments.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { getAllPayments, createPayment, getAllInvoices } from "../../services/adminService";
import { getErrorMessage, formatCurrency, formatDate } from "../../utils/helpers";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ invoice: "", amount: "", method: "cash" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [payRes, invRes] = await Promise.all([getAllPayments(), getAllInvoices()]);
      setPayments(payRes.data);
      setInvoices(invRes.data.filter((i) => i.paymentStatus !== "paid"));
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
      await createPayment({ ...form, amount: Number(form.amount) });
      toast.success("Payment recorded");
      setForm({ invoice: "", amount: "", method: "cash" });
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
        <h1 className="text-xl md:text-2xl font-medium">Payment history</h1>
        <Button variant="primary" onClick={() => setShowNew(true)}>Record payment</Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Card>
        {payments.length === 0 ? (
          <p className="text-sm text-gray-400">No payments recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-2">Payment</th><th className="pb-2">Invoice</th>
                  <th className="pb-2">Amount</th><th className="pb-2">Method</th><th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3">{p._id.slice(-6)}</td>
                    <td className="py-3">{p.invoice?._id?.slice(-6)}</td>
                    <td className="py-3">{formatCurrency(p.amount)}</td>
                    <td className="py-3 capitalize">{p.method}</td>
                    <td className="py-3">{formatDate(p.paidAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={showNew} onClose={() => setShowNew(false)} title="Record payment"
        footer={<Button variant="primary" onClick={handleCreate} disabled={saving || !form.invoice || !form.amount}>{saving ? "Saving..." : "Save"}</Button>}>
        <div className="space-y-3">
          <select value={form.invoice} onChange={(e) => setForm({ ...form, invoice: e.target.value })} className={inputClass}>
            <option value="">Select an unpaid invoice</option>
            {invoices.map((inv) => (
              <option key={inv._id} value={inv._id}>{inv._id.slice(-6)} — {formatCurrency(inv.amount)}</option>
            ))}
          </select>
          <input placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={inputClass} />
          <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className={inputClass}>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="bank_transfer">Bank transfer</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}
