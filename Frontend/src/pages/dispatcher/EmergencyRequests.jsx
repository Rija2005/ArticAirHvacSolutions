// src/pages/dispatcher/EmergencyRequests.jsx
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { getErrorMessage } from "../../utils/helpers";
import { getAllRequests, updateRequestStatus } from "../../services/dispatcherService";

export default function EmergencyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dispatchingId, setDispatchingId] = useState(null);

  const fetchEmergencyRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllRequests();
      const emergencies = res.data.filter(
        (request) => request.priority === "emergency" && request.status !== "completed"
      );
      setRequests(emergencies);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencyRequests();
  }, []);

  const dispatch = async (id) => {
    setDispatchingId(id);
    try {
      await updateRequestStatus(id, "scheduled");
      toast.success("Technician dispatched");
      await fetchEmergencyRequests();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setDispatchingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">Emergency requests</h1>

      <div className="space-y-4">
        {requests.map((r) => (
          <Card key={r.id} className="border-l-4 border-l-red-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{r.customer}</p>
                <p className="text-sm text-gray-500">{r.address}</p>
                <p className="text-sm text-gray-600 mt-1">{r.issue}</p>
                <p className="text-xs text-gray-400 mt-1">{r.id}</p>
              </div>
              <Badge status={r.status === "pending" ? "rejected" : "scheduled"}>
                {r.status === "pending" ? "Urgent" : "Dispatched"}
              </Badge>
            </div>
            {r.status === "pending" && (
              <Button variant="primary" className="mt-4" onClick={() => dispatch(r.id)}>
                Dispatch nearest technician
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}