// src/pages/customer/Notifications.jsx
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import { getMyNotifications, markNotificationRead } from "../../services/customerService";
import { getErrorMessage, formatStatusLabel } from "../../utils/helpers";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyNotifications();
        setNotifications(res.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const markRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">Notifications</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      <Card>
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-400">No notifications yet.</p>
        ) : (
          <div className="space-y-1">
            {notifications.map((n) => (
              <button
                key={n._id}
                onClick={() => markRead(n._id)}
                className={`w-full text-left flex gap-3 px-2 py-3 rounded-lg border-b border-gray-100 last:border-0 ${
                  !n.isRead ? "bg-primary-50/50" : ""
                }`}
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.isRead ? "bg-primary-600" : "bg-transparent"}`} />
                <div>
                  <p className="text-sm font-medium">{formatStatusLabel(n.type)}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                 

{n.type === "review_request" && (
  <Link to="/customer/requests">
    <Button variant="primary" className="mt-3">
      Leave Review
    </Button>
  </Link>
)}
                </div>
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}