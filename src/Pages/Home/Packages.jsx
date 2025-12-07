import { useEffect, useState } from "react";
import axios from "axios";

const Packages = () => {
  // Default data is kept as initial state so the UI doesn't break before the server is ready
  const [packages, setPackages] = useState([
    {
      name: "Basic",
      price: 5,
      employeeLimit: 5,
      features: ["Asset Tracking", "Employee Management", "Basic Support"],
    },
    {
      name: "Standard",
      price: 8,
      employeeLimit: 10,
      features: [
        "All Basic features",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Premium",
      price: 15,
      employeeLimit: 20,
      features: ["All Standard features", "Custom Branding", "24/7 Support"],
    },
  ]);

  useEffect(() => {
    // Will fetch from backend once running
    axios
      .get("http://localhost:5000/packages")
      .then((res) => {
        setPackages(res.data);
      })
      .catch((error) => {
        console.log("Server not running yet, using default packages");
      });
  }, []);

  return (
    <div className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-base-content/60">
            Choose the package that fits your company size
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                index === 1 ? "border-2 border-primary" : ""
              }`}
            >
              <div className="card-body">
                <h3 className="text-2xl font-bold text-center">{pkg.name}</h3>
                <div className="text-center my-6">
                  <span className="text-4xl font-extrabold">${pkg.price}</span>
                  <span className="text-base-content/60">/month</span>
                </div>
                <div className="divider"></div>
                <p className="text-center font-semibold mb-4">
                  Up to {pkg.employeeLimit} Employees
                </p>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
