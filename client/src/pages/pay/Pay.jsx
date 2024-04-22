import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51P52w8SBNPGsIMEIv4ie7KUKYcks2x2aMBkBFccm6cUIDBPlQ7NcdkF5lGKGEZLWPM9Vie6q1WPHXvUr5mCb6b2Q00EJFEaOs5")

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {

      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'flat',
    variables: { colorPrimaryText: '#262626' }
  };
  const options = {
    clientSecret,
    appearance,
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
    }
  };

  return <div className="pay">

 {!clientSecret ? (
      <p>Loading payment details...</p>
    ) :(
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;
