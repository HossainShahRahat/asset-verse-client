import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStatus from "../../Hooks/useUserStatus";
import Swal from "sweetalert2";

const Subscription = () => {
  const [packages, setPackages] = useState([]);
  const [role, loading, status] = useUserStatus();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && role === "hr" && status.limit >= 20) {
      Swal.fire(
        "Already Subscribed",
        "You are already on the Premium plan.",
        "info"
      );
      navigate("/asset-list");
    }
  }, [loading, role, status.limit, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/packages")
      .then((res) => setPackages(res.data));
  }, []);

  return (
    <div className="p-10 bg-base-200 min-h-screen text-base-content">
      <h2 className="text-4xl font-bold text-center mb-12">
        Choose Your Subscription Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="card bg-base-100 shadow-xl border-t-8 border-primary transition-transform transform hover:scale-[1.03]"
          >
            <div className="card-body text-center">
              <h3 className="text-3xl font-extrabold mb-2">{pkg.name}</h3>
              <p className="text-5xl font-black text-primary">
                ${pkg.price}
                <span className="text-xl font-normal">/mo</span>
              </p>
              <div className="divider"></div>
              <p className="text-lg font-semibold mb-4">
                Up to {pkg.employeeLimit} Employees
              </p>
              <ul className="text-left space-y-2 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-success"
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

              {status.limit >= pkg.employeeLimit ? (
                <button className="btn btn-disabled btn-block">
                  Current Plan
                </button>
              ) : (
                <Link
                  to="/payment"
                  state={{
                    price: pkg.price,
                    limit: pkg.employeeLimit,
                    type: pkg.name,
                  }}
                  className="btn btn-primary btn-block"
                >
                  Purchase
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
