"use client";
import {  useUser, useClerk } from "@clerk/nextjs";

import { ShoppingCart } from "lucide-react";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import CardApis from "../_utils/CardApis";
import Cart from "./Cart";
import Link from "next/link";

const Header = () => {
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const getCartItems = async () => {
    try {
      const response = await CardApis.getUserCartItems(
        user.primaryEmailAddress.emailAddress
      );
      if (response && response.data) {
        response.data.data.forEach((item) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              documentId: item.documentId,
              product: item.products[0],
            },
          ]);
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const path = window.location.href.toString();
    setIsLoggedIn(path.includes("sign-in"));
    user && getCartItems();
  }, [user]);
  return (
    !isLoggedIn && (
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-md min-w-full">
          <Image src="/logo.svg" alt="logo" width={50} height={50}></Image>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    
                  >
                    {" "}
                    Explore{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    
                  >
                    {" "}
                    About Us{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    
                  >
                    {" "}
                    Contact Us{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
                    href="/sign-in"
                  >
                    Login
                  </a>

                  <a
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-500 transition hover:text-teal-600/75 sm:block"
                    
                  >
                    Register
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <h2 className="flex gap-1 cursor-pointer">
                    {" "}
                    <ShoppingCart
                      onClick={() => {
                        setOpenCart(!openCart);
                      }}
                    ></ShoppingCart>
                    ({cart?.length})
                  </h2>
                  {/* <UserButton></UserButton> */}
                  <button
                    className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-teal-500 transition duration-200"
                    onClick={() => {
                      signOut({ redirectUrl: "/" });
                    }}
                  >
                    Sign out
                  </button>
                  {openCart && <Cart setOpenCart={setOpenCart}></Cart>}
                </div>
              )}

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
