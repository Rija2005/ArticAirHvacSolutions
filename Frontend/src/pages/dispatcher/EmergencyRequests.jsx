// src/pages/dispatcher/EmergencyRequests.jsx

import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { getErrorMessage } from "../../utils/helpers";
import { 
  getAllRequests, 
  createJob, 
  getAllTechnicians // ya getAvailableTechnicians
} from "../../services/dispatcherService"; 

import toast from "react-hot-toast";
export default function EmergencyRequests() {
  const [requests, setRequests] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReqId, setSelectedReqId] = useState(null);
  const [selectedTech, setSelectedTech] = useState("");
  const [dispatching, setDispatching] = useState(false);

 const fetchEmergencyRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const [reqRes, techRes] = await Promise.all([
        getAllRequests(),
        getAllTechnicians() 
      ]);

      const emergencies = reqRes.data.filter(
        (request) => request.priority === "emergency" && request.status !== "completed"
      );
      
      setRequests(emergencies);
      setTechnicians(techRes.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencyRequests();
  }, []);

  const handleOpenModal = (reqId) => {
    setSelectedReqId(reqId);
    setSelectedTech("");
    setModalOpen(true);
  };

  const handleDispatchSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTech) {
      toast.error("Please select a technician first!");
      return;
    }

    setDispatching(true);
    try {
      // 💡 1. Real Job Document Create hoga
      // 💡 2. Customer & Tech dono ko notifications chali jayengi (jobController logic)
      await createJob({
        request: selectedReqId,
        technician: selectedTech,
        scheduledDate: new Date(),
      });

      toast.success("Technician assigned & dispatched successfully!");
      setModalOpen(false);
      await fetchEmergencyRequests();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDispatching(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">Emergency requests</h1>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {requests.length === 0 ? (
        <p className="text-sm text-gray-500">No active emergency requests.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <Card key={r._id || r.id} className="border-l-4 border-l-red-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {typeof r.customer === "object" ? r.customer?.name : r.customer || "Unknown Customer"}
                  </p>
                  
                  {typeof r.customer === "object" && r.customer?.phone && (
                    <p className="text-xs text-gray-500">Phone: {r.customer.phone}</p>
                  )}

                  <p className="text-sm text-gray-500">{r.address}</p>
                  <p className="text-sm text-gray-600 mt-1">{r.issue || r.service?.name}</p>
                  <p className="text-xs text-gray-400 mt-1">ID: {r._id}</p>
                </div>

                <Badge status={r.status === "pending" ? "rejected" : "scheduled"}>
                  {r.status === "pending" ? "Urgent" : "Dispatched"}
                </Badge>
              </div>

              {r.status === "pending" && (
                <Button 
                  variant="primary" 
                  className="mt-4" 
                  onClick={() => handleOpenModal(r._id)}
                >
                  Dispatch Technician
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* 💡 Technician Assignment Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Assign Technician for Emergency"
      >
        <form onSubmit={handleDispatchSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Available Technician:
            </label>
            <select
              className="w-full border rounded-lg p-2 dark:bg-slate-800 dark:border-slate-700"
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              required
            >
              <option value="">-- Choose Technician --</option>
              {technicians.map((tech) => (
                <option key={tech._id} value={tech._id}>
                  {tech.name} ({tech.email})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={dispatching}>
              {dispatching ? "Dispatching..." : "Confirm & Dispatch"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}