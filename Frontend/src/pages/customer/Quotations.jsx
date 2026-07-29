// src/pages/customer/Quotations.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { getMyQuotations, respondToQuotation } from "../../services/customerService";
import { getErrorMessage, calculateQuotationTotal } from "../../utils/helpers";

export default function Quotations() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuotes = async () => {
    try {
      const res = await getMyQuotations();
      setQuotes(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuotes(); }, []);

  const respond = async (id, status) => {
    try {
      await respondToQuotation(id, status);
      toast.success(status === "accepted" ? "Quotation accepted" : "Quotation rejected");
      fetchQuotes();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">My quotations</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {quotes.length === 0 ? (
        <Card><p className="text-sm text-gray-400">No quotations yet.</p></Card>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <Card key={q._id}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{q.request?.service?.name}</p>
                  <p className="text-xs text-gray-500">{q._id.slice(-6)}</p>
                </div>
                <Badge status={q.approvalStatus}>{q.approvalStatus}</Badge>
              </div>

              <div className="mt-4 text-sm space-y-1 text-gray-600">
                <div className="flex justify-between"><span>Labor</span><span>${q.laborCost}</span></div>
                <div className="flex justify-between"><span>Equipment</span><span>${q.equipmentCost}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>${q.tax}</span></div>
                <div className="flex justify-between"><span>Discount</span><span>-${q.discount}</span></div>
                <div className="flex justify-between font-medium text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span><span>${calculateQuotationTotal(q)}</span>
                </div>
              </div>

              {q.approvalStatus === "pending" && (
                <div className="flex gap-3 mt-4">
                  <Button variant="primary" onClick={() => respond(q._id, "accepted")}>Accept</Button>
                  <Button variant="secondary" onClick={() => respond(q._id, "rejected")}>Reject</Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}