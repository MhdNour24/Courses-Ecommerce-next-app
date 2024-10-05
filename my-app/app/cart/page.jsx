"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import CardApis from "../_utils/CardApis";
import { ToastContext } from "../_context/ToastContet";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router= useRouter()
  const { cart, setCart } = useContext(CartContext);
  const [amountMoney,setAmountMoney] =useState(0)
  const { showToastMessage } = useContext(ToastContext);
  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      const price = item?.product?.price;
      totalAmount += Number(price);
    });
    setAmountMoney(totalAmount)
  };
  const DeleteCartItemFormList = async (documentId) => {
    try {
      const response = await CardApis.deleteCartItem(documentId);
      if (response) {
        setCart((oldCart) =>
          oldCart.filter((item) => {
            return item.documentId !== documentId;
          })
        );
        showToastMessage("Product deleted successfully", "delete");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(()=>{
    getTotalAmount()
  },[cart])
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li className="flex items-center gap-4">
                  <img
                    src={item?.product?.banner?.url}
                    alt=""
                    className="size-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">
                      {item?.product?.title}
                    </h3>

                    <dl className="mt-1 space-y-1 text-xs text-gray-600">
                      <div>
                        <dt className="inline font-medium">Category: </dt>
                        <dd className="inline">{item?.product?.category}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    ${item?.product?.price}
                    <div
                      className="px-6 py-2 rounded-lg cursor-pointer transition hover:bg-red-100 text-gray-600 hover:text-red-600"
                      style={{
                        background:
                          "linear-gradient(135deg, #f0f0f0 0%, #d9d9d9 100%)",
                      }}
                      onClick={() => {
                        DeleteCartItemFormList(item?.documentId);
                      }}
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>${amountMoney}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <button
                    onClick={()=>router.push(`/checkout?amount=${amountMoney}`)}
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            <h2 className="mt-8 text-center text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse">
              Note: All Items will be sent via email
            </h2>{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
