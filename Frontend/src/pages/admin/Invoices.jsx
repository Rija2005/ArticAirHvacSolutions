
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { getAllInvoices, createInvoice, markInvoicePaid, getAllQuotations } from "../../services/adminService";
import { getErrorMessage, formatCurrency } from "../../utils/helpers";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ quotation: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [invRes, quoteRes] = await Promise.all([getAllInvoices(), getAllQuotations()]);
      setInvoices(invRes.data);
      setQuotations(quoteRes.data.filter((q) => q.approvalStatus === "accepted"));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    const quotation = quotations.find((q) => q._id === form.quotation);
    if (!quotation) return;
    setSaving(true);
    try {
      await createInvoice({
        quotation: quotation._id,
        amount: quotation.laborCost + quotation.equipmentCost + quotation.tax - quotation.discount,
      });
      toast.success("Invoice generated");
      setForm({ quotation: "" });
      setShowNew(false);
      fetchData();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      await markInvoicePaid(id);
      toast.success("Invoice marked as paid");
      fetchData();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (loading) return <Loader fullScreen />;

  const outstanding = invoices.filter((i) => i.paymentStatus !== "paid").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-medium">Invoices</h1>
        <Button variant="primary" onClick={() => setShowNew(true)}>Generate invoice</Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card><p className="text-xs text-gray-500">Total invoices</p><p className="text-xl font-medium mt-1">{invoices.length}</p></Card>
        <Card><p className="text-xs text-gray-500">Outstanding</p><p className="text-xl font-medium mt-1">{formatCurrency(outstanding)}</p></Card>
        <Card><p className="text-xs text-gray-500">Paid</p><p className="text-xl font-medium mt-1">{invoices.filter((i) => i.paymentStatus === "paid").length}</p></Card>
      </div>

      <Card>
        {invoices.length === 0 ? (
          <p className="text-sm text-gray-400">No invoices yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-2">Invoice</th><th className="pb-2">Amount</th><th className="pb-2">Status</th><th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3">{inv._id.slice(-6)}</td>
                    <td className="py-3">{formatCurrency(inv.amount)}</td>
                    <td className="py-3"><Badge status={inv.paymentStatus === "paid" ? "completed" : "pending"}>{inv.paymentStatus}</Badge></td>
                    <td className="py-3">
                      {inv.paymentStatus !== "paid" && (
                        <button onClick={() => handleMarkPaid(inv._id)} className="text-primary-600 text-xs">Mark paid</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={showNew} onClose={() => setShowNew(false)} title="Generate invoice"
        footer={<Button variant="primary" onClick={handleCreate} disabled={saving || !form.quotation}>{saving ? "Generating..." : "Generate"}</Button>}>
        <select value={form.quotation} onChange={(e) => setForm({ quotation: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="">Select an accepted quotation</option>
          {quotations.map((q) => (
            <option key={q._id} value={q._id}>{q.request?.service?.name} — {q.request?.customer?.name}</option>
          ))}
        </select>
      </Modal>
    </div>
  );
}
