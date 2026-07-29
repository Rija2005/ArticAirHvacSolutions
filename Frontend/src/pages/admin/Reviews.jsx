 
// src/pages/admin/Reviews.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import { getAllReviews, toggleReviewVisibility } from "../../services/adminService";
import { getErrorMessage, formatDate } from "../../utils/helpers";

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5 text-accent-500 text-sm">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rating ? "" : "text-gray-200"}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await getAllReviews();
      setReviews(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleToggle = async (id, currentValue) => {
    setUpdatingId(id);
    try {
      await toggleReviewVisibility(id, !currentValue);
      toast.success(!currentValue ? "Review published to Testimonials page" : "Review hidden");
      fetchReviews();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">Customer reviews</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {reviews.length === 0 ? (
        <Card><p className="text-sm text-gray-400">No reviews submitted yet.</p></Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <Card key={r._id}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Stars rating={r.rating} />
                    <Badge status={r.isPublic ? "completed" : "pending"}>
                      {r.isPublic ? "Published" : "Hidden"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">"{r.comment}"</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {r.customer?.name} · {r.request?.service?.name} · {formatDate(r.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => handleToggle(r._id, r.isPublic)}
                  disabled={updatingId === r._id}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg shrink-0 ${
                    r.isPublic ? "bg-gray-100 text-gray-600" : "bg-primary-600 text-white"
                  }`}
                >
                  {updatingId === r._id ? "..." : r.isPublic ? "Hide" : "Publish"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}