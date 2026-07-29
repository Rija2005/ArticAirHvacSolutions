// src/pages/admin/Technicians.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { getUsersByRole } from "../../services/adminService";
import { getErrorMessage } from "../../utils/helpers";

export default function Technicians() {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const res = await getUsersByRole("technician");
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
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-medium">Technicians</h1>
        <Link to="/admin/add-employee"><Button variant="primary">Add technician</Button></Link>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {techs.length === 0 ? (
        <Card><p className="text-sm text-gray-400">No technicians yet.</p></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {techs.map((t) => (
            <Card key={t._id}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.area || "No area set"}</p>
                </div>
                <Badge status={t.availabilityStatus === "available" ? "completed" : "pending"}>
                  {t.availabilityStatus}
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
