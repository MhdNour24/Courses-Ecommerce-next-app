import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import OrderApis from "../../_utils/OrderApis"
import CardApis from "../../_utils/CardApis"

const CheckoutForm = ({ amount }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState();
  const handleSubmit = async () => {


    if (!stripe || !elements) {
      return;
    }
    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };
    createOrder()
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "https://courses-ecommerce-next-app.vercel.app/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  const createOrder = async ()=>{
    try {
        let productIds= [];
        cart.forEach(el=>{
            productIds.push(el?.product?.documentId);
        })
        const data= {
            data: {
                email:user.primaryEmailAddress.emailAddress,
                userName:user.fullName,
                amount,
                products:productIds
            }
        }
        const response = await OrderApis.createOrder(data)
        if(response) {
             cart.forEach(el=>{
                CardApis.deleteCartItem(el?.documentId).then(result=>{
                })
            })
        }
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <dev
      className="h-screen flex items-center justify-center flex-wrap bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-8 shadow-lg px-3 sm:px-15 md:px25 lg:px-40"
    >
      <div className="w-5/6 h-1/2 bg-white p-6 rounded-lg shadow-xl ">
        <PaymentElement />
      </div>
      <button onClick={handleSubmit} className="duration-300  w-full py-3 px-6 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
        Submit
      </button>
    </dev>
  );
};

export default CheckoutForm;
