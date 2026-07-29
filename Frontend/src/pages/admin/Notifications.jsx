// src/pages/admin/Notifications.jsx
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import { getAllNotifications } from "../../services/adminService";
import { getErrorMessage, formatStatusLabel } from "../../utils/helpers";

export default function Notifications() {
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllNotifications();
        setLog(res.data);
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
      <h1 className="text-xl md:text-2xl font-medium">Notification log</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Card>
        {log.length === 0 ? (
          <p className="text-sm text-gray-400">No notifications sent yet.</p>
        ) : (
          <div className="space-y-1">
            {log.map((n) => (
              <div key={n._id} className="flex justify-between px-2 py-3 border-b border-gray-100 last:border-0 text-sm">
                <div>
                  <p className="font-medium">{formatStatusLabel(n.type)}</p>
                  <p className="text-gray-500">Sent to {n.user?.name}</p>
                </div>
                <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
