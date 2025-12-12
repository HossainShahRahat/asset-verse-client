import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const { price, limit, type } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-10">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-base-content">
          Complete Your Payment
        </h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} limit={limit} type={type} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
