"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
const Checkout = () => {
  console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
  const searchParams = useSearchParams();
  const amount=Number(searchParams.get("amount"))*100
  
  const options = {
    mode: "payment",
    currency: "usd",
    amount: amount,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default Checkout;
