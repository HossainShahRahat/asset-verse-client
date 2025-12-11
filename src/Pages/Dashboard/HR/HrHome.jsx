import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HrHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/hr-stats/${user.email}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          );
          setStats(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getStats();
  }, [user]);

  if (!stats) return <div className="p-10 text-center">Loading stats...</div>;

  const pieData1 = [
    { name: "Returnable", value: stats.returnable },
    { name: "Non-Returnable", value: stats.nonReturnable },
  ];

  const pieData2 = [
    { name: "Pending Requests", value: stats.pending },
    { name: "Approved Requests", value: stats.approved },
  ];

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart 1: Asset Types */}
        <div className="card bg-base-100 shadow-xl p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">Asset Type Distribution</h3>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData1}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData1.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Request Status */}
        <div className="card bg-base-100 shadow-xl p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">Request Status</h3>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData2}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData2.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index + (2 % COLORS.length)]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Returnable Items</div>
          <div className="stat-value text-primary">{stats.returnable}</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Non-Returnable</div>
          <div className="stat-value text-secondary">{stats.nonReturnable}</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Pending Requests</div>
          <div className="stat-value text-warning">{stats.pending}</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Approved Requests</div>
          <div className="stat-value text-success">{stats.approved}</div>
        </div>
      </div>
    </div>
  );
};

export default HrHome;
