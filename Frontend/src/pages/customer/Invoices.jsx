// src/pages/customer/Invoices.jsx
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { getMyInvoices } from "../../services/customerService";
import { getErrorMessage, formatCurrency, formatDate } from "../../utils/helpers";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyInvoices();
        setInvoices(res.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">My invoices</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Card>
        {invoices.length === 0 ? (
          <p className="text-sm text-gray-400">No invoices yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-2">Invoice</th><th className="pb-2">Date</th>
                  <th className="pb-2">Amount</th><th className="pb-2">Status</th><th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3">{inv._id.slice(-6)}</td>
                    <td className="py-3">{formatDate(inv.createdAt)}</td>
                    <td className="py-3">{formatCurrency(inv.amount)}</td>
                    <td className="py-3"><Badge status={inv.paymentStatus === "paid" ? "completed" : "pending"}>{inv.paymentStatus}</Badge></td>
                    <td className="py-3"><button onClick={() => setSelected(inv)} className="text-primary-600 text-xs">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={!!selected} onClose={() => setSelected(null)} title={selected?._id.slice(-6)}
        footer={<Button variant="primary" onClick={() => window.print()}>Print invoice</Button>}
      >
        {selected && (
          <div className="text-sm space-y-2">
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span>{formatDate(selected.createdAt)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Status</span><Badge status={selected.paymentStatus === "paid" ? "completed" : "pending"}>{selected.paymentStatus}</Badge></div>
            <div className="flex justify-between font-medium pt-2 border-t border-gray-100">
              <span>Total</span><span>{formatCurrency(selected.amount)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}