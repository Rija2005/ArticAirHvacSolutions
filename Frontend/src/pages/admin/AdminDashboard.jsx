
import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import WelcomeHeader from "../../components/WelcomeHeader";
import useAuth from "../../hooks/useAuth";
import { getOverview, getRevenueByMonth, getMostRequestedServices, getAllInvoices } from "../../services/adminService";
import { getErrorMessage, formatCurrency } from "../../utils/helpers";

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ov, rev, svc, inv] = await Promise.all([
          getOverview(), getRevenueByMonth(), getMostRequestedServices(), getAllInvoices(),
        ]);
        setOverview(ov.data);
        setRevenueData(rev.data.map((r) => ({ month: monthNames[r._id - 1], revenue: r.total })));
        setServicesData(svc.data.map((s) => ({ service: s.name, jobs: s.count })));
        setInvoices(inv.data.slice(0, 5));
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <Loader fullScreen />;

  const stats = [
    { label: "Monthly revenue", value: formatCurrency(overview?.monthlyRevenue) },
    { label: "Active customers", value: overview?.activeCustomers ?? 0 },
    { label: "Pending jobs", value: overview?.pendingJobs ?? 0 },
    { label: "Active contracts", value: overview?.activeTechs ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <WelcomeHeader
        name={user?.name}
        roleLabel="Administrator"
        subtitle="Here's how the business is performing right now."
      />

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-500 dark:text-slate-400">{s.label}</p>
            <p className="text-xl md:text-2xl font-medium mt-1">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-medium mb-4 text-sm">Monthly revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#185FA5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="font-medium mb-4 text-sm">Most requested services</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={servicesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="service" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="jobs" fill="#EF9F27" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h2 className="font-medium mb-4 text-sm">Recent invoices</h2>
        {invoices.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-slate-500">No invoices yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-800">
                  <th className="pb-2">Invoice</th><th className="pb-2">Amount</th><th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv._id} className="border-b border-gray-50 dark:border-slate-800/60 last:border-0">
                    <td className="py-3">{inv._id.slice(-6)}</td>
                    <td className="py-3">{formatCurrency(inv.amount)}</td>
                    <td className="py-3"><Badge status={inv.paymentStatus === "paid" ? "completed" : "pending"}>{inv.paymentStatus}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
