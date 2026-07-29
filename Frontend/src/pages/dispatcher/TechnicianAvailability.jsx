// src/pages/dispatcher/TechnicianAvailability.jsx
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import { getAllTechnicians } from "../../services/dispatcherService";
import { getErrorMessage } from "../../utils/helpers";

const statusMap = { available: "completed", busy: "pending", off_duty: "rejected" };
const statusLabel = { available: "Available", busy: "Busy", off_duty: "Off duty" };

export default function TechnicianAvailability() {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const res = await getAllTechnicians();
        setTechs(res.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchTechs();
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">Technician availability</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {techs.length === 0 ? (
        <Card><p className="text-sm text-gray-400">No technicians found.</p></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techs.map((t) => (
            <Card key={t._id}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.area || "No area set"}</p>
                </div>
                <Badge status={statusMap[t.availabilityStatus] || "pending"}>
                  {statusLabel[t.availabilityStatus] || "Unknown"}
                </Badge>
              </div>
              <p className="text-xs text-gray-400 mt-3">{t.email}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
