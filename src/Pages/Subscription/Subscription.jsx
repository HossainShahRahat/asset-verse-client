import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Subscription = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/packages")
      .then((res) => setPackages(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-10">
      <h2 className="text-4xl font-bold text-center mb-10">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title text-3xl text-primary">{pkg.name}</h2>
              <p className="text-5xl font-bold my-4">${pkg.price}</p>
              <p className="text-gray-500">
                Up to {pkg.employeeLimit} Employees
              </p>
              <div className="divider"></div>
              <ul className="text-left w-full space-y-2 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <div className="card-actions">
                <Link
                  to="/payment"
                  state={{
                    price: pkg.price,
                    limit: pkg.employeeLimit,
                    type: pkg.name,
                  }}
                  className="btn btn-primary w-full"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
