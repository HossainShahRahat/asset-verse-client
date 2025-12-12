import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const CheckoutForm = ({ price, limit, type }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      axios
        .post(
          "http://localhost:5000/create-payment-intent",
          { price },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        )
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    // Temporarily simplified confirmation to resolve 400 Bad Request error
    // The Payment Element is passed directly for confirmation.
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        const upgradeInfo = {
          email: user.email,
          limit: limit,
          type: type,
        };

        axios
          .patch("http://localhost:5000/users/upgrade", upgradeInfo, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              setPaymentSuccessful(true);
              Swal.fire(
                "Payment Successful",
                `You are now on the ${type} plan!`,
                "success"
              );

              setTimeout(() => {
                navigate("/asset-list");
              }, 1000);
            }
          });
      }
    }
  };

  if (paymentSuccessful) {
    return (
      <div className="w-full max-w-md mx-auto p-12 bg-base-100 rounded-xl shadow-2xl text-base-content text-center">
        <FaCheckCircle className="text-success text-6xl mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2 text-success">
          Purchase Complete!
        </h3>
        <p className="text-lg">Welcome to the **{type}** Plan.</p>
        <p className="text-sm mt-4">Redirecting you to the Dashboard...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-8 bg-base-100 rounded-xl shadow-2xl text-base-content"
    >
      <h3 className="text-xl font-bold mb-6 text-center">
        Pay ${price} for {type} Plan
      </h3>
      <div className="border p-4 rounded-md mb-6 bg-base-200">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#1F2937",
                "::placeholder": {
                  color: "#9CA3AF",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <p className="text-red-600 text-sm mb-4">{error}</p>
      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
