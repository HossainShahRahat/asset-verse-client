import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const useHRStats = (email) => {
  const [stats, setStats] = useState(null);
  const [topRequests, setTopRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const [statsRes, topRes] = await Promise.all([
          axios.get(`http://localhost:5000/hr-stats/${email}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }),
          axios.get(`http://localhost:5000/top-requests/${email}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }),
        ]);
        setStats(statsRes.data);
        setTopRequests(
          topRes.data.map((item) => ({ name: item._id, Requests: item.count }))
        );
      } catch (error) {
        console.error("Failed to fetch HR stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [email]);

  return { stats, topRequests, loading };
};

const HRDashboard = () => {
  const { user } = useContext(AuthContext);
  const { stats, topRequests, loading } = useHRStats(user?.email);

  const PIE_COLORS = ["#38BDF8", "#F87171"];

  const pieData = stats
    ? [
        { name: "Returnable", value: stats.returnable },
        { name: "Non-returnable", value: stats.nonReturnable },
      ].filter((item) => item.value > 0)
    : [];

  return (
    <div className="p-10 bg-base-200 min-h-screen text-base-content">
      <h2 className="text-3xl font-bold mb-8">HR Analytics Dashboard</h2>

      {loading ? (
        <div className="flex justify-center p-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="card bg-base-100 shadow-lg p-6 text-center border-b-4 border-warning">
              <p className="text-xl font-semibold">Pending Requests</p>
              <p className="text-4xl font-extrabold text-warning mt-2">
                {stats.pending || 0}
              </p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6 text-center border-b-4 border-success">
              <p className="text-xl font-semibold">Approved Requests</p>
              <p className="text-4xl font-extrabold text-success mt-2">
                {stats.approved || 0}
              </p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6 text-center border-b-4 border-info">
              <p className="text-xl font-semibold">Returnable Assets</p>
              <p className="text-4xl font-extrabold text-info mt-2">
                {stats.returnable || 0}
              </p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6 text-center border-b-4 border-error">
              <p className="text-xl font-semibold">Non-returnable Assets</p>
              <p className="text-4xl font-extrabold text-error mt-2">
                {stats.nonReturnable || 0}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Asset Type Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--b1))",
                      border: "none",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Top 5 Most Requested Assets
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={topRequests}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--bc)/0.1)"
                  />
                  <XAxis dataKey="name" stroke="hsl(var(--bc))" />
                  <YAxis stroke="hsl(var(--bc))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--b1))",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Requests" fill="#22C55E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HRDashboard;
