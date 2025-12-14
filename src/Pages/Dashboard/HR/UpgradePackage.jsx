import { useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = ({ plan, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      setError("");
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 border rounded-xl bg-white shadow-sm"
    >
      <h3 className="text-lg font-bold mb-4">Pay for {plan.name}</h3>
      <p className="mb-4 text-gray-500">Amount: ${plan.price}</p>

      <div className="border p-4 rounded-lg mb-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary w-full"
      >
        {processing ? "Processing..." : `Pay $${plan.price}`}
      </button>
    </form>
  );
};

const UpgradePackage = () => {
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const plans = [
    { name: "Basic", price: 5, limit: 5 },
    { name: "Standard", price: 8, limit: 10 },
    { name: "Premium", price: 15, limit: 20 },
  ];

  const handleSuccess = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/upgrade`,
        {
          email: user.email,
          limit: selected.limit,
          type: selected.name.toLowerCase(),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      Swal.fire("Success", `Upgraded to ${selected.name}`, "success");
      navigate("/add-asset");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">Upgrade Your Plan</h2>
        <p className="text-gray-500">
          Increase your employee limit and unlock more features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((item, idx) => (
          <div
            key={idx}
            className={`card bg-base-100 shadow-xl border-2 transition-all cursor-pointer hover:shadow-2xl ${
              selected?.name === item.name
                ? "border-primary ring-2 ring-primary ring-offset-2"
                : "border-transparent"
            }`}
            onClick={() => setSelected(item)}
          >
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl">{item.name}</h3>
              <div className="my-4">
                <span className="text-4xl font-extrabold">${item.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>Up to {item.limit} Employees</li>
                <li>Full Asset Tracking</li>
                <li>24/7 Support</li>
              </ul>
              <button className="btn btn-primary w-full">
                {selected?.name === item.name ? "Selected" : "Choose Plan"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="max-w-md mx-auto animate-fade-in-up">
          <Elements stripe={stripePromise}>
            <CheckoutForm plan={selected} onSuccess={handleSuccess} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default UpgradePackage;
