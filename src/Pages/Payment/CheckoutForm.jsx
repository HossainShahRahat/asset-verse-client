import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, limit, type }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [cardColor, setCardColor] = useState("#000000");

  useEffect(() => {
    const updateThemeColor = () => {
      const computedStyle = getComputedStyle(document.body);
      setCardColor(computedStyle.color);
    };

    updateThemeColor();

    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => observer.disconnect();
  }, []);

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
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

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
        const updateInfo = { email: user.email, limit, type };
        axios
          .patch("http://localhost:5000/users/upgrade", updateInfo, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/profile");
            }
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-gray-600 rounded-md p-4 bg-base-100">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: cardColor,
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
      <p className="text-red-600 mt-2">{error}</p>
      <button
        className="btn btn-primary w-full mt-6"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
