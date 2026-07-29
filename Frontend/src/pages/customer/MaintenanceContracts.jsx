// src/pages/customer/MaintenanceContracts.jsx
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { getMyContracts, renewContract } from "../../services/customerService";
import { getErrorMessage, formatDate } from "../../utils/helpers";

export default function MaintenanceContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContracts = async () => {
    try {
      const res = await getMyContracts();
      setContracts(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContracts(); }, []);

  const handleRenew = async (id) => {
    try {
      await renewContract(id);
      fetchContracts();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">Maintenance contracts</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {contracts.length === 0 ? (
        <Card><p className="text-sm text-gray-400">No maintenance contracts yet.</p></Card>
      ) : (
        <div className="space-y-4">
          {contracts.map((c) => (
            <Card key={c._id}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium capitalize">{c.planType} plan</p>
                  <p className="text-xs text-gray-500">{c._id.slice(-6)}</p>
                </div>
                <Badge status={c.status === "active" ? "completed" : "rejected"}>
                  {c.status === "active" ? "Active" : "Expired"}
                </Badge>
              </div>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>Started: {formatDate(c.startDate)}</p>
                <p>Renewal date: {formatDate(c.renewalDate)}</p>
              </div>
              <Button
                variant={c.status === "active" ? "secondary" : "primary"}
                className="mt-4"
                onClick={() => handleRenew(c._id)}
              >
                {c.status === "active" ? "View details" : "Renew now"}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}