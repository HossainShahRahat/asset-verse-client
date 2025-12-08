import {
  FaBoxes,
  FaUserTie,
  FaChartPie,
  FaMobileAlt,
  FaShieldAlt,
  FaSync,
} from "react-icons/fa";

const Features = () => {
  const featureList = [
    {
      icon: <FaBoxes className="text-4xl text-primary" />,
      title: "Asset Tracking",
      desc: "Keep a precise record of all company equipment with real-time status updates.",
    },
    {
      icon: <FaUserTie className="text-4xl text-primary" />,
      title: "Employee Management",
      desc: "Organize your workforce and handle asset requests seamlessly.",
    },
    {
      icon: <FaChartPie className="text-4xl text-primary" />,
      title: "Visual Reports",
      desc: "Gain insights with intuitive charts showing inventory distribution.",
    },
    {
      icon: <FaMobileAlt className="text-4xl text-primary" />,
      title: "Mobile Friendly",
      desc: "Access your dashboard from any device, anywhere, at any time.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: "Secure Data",
      desc: "Enterprise-grade security ensures your sensitive data stays private.",
    },
    {
      icon: <FaSync className="text-4xl text-primary" />,
      title: "Real-time Sync",
      desc: "Changes made by HR or Employees are updated instantly across the system.",
    },
  ];

  return (
    <div className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-500">
            Everything you need to manage your corporate assets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((item, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-lg border hover:border-primary transition-colors duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4">{item.icon}</div>
                <h3 className="card-title mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
