"use client";
import { useContext, useEffect, useState } from "react";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react"; // استيراد أيقونة سلة الشراء
import { getDescription } from "../../_utils/getDescription";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CardApis from "../../_utils/CardApis";
import { CartContext } from "../../_context/CartContext";
import { ToastContext } from "../../_context/ToastContet";
import { Button } from "@mui/material";

const ProductInfo = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { showToastMessage } = useContext(ToastContext);
  const { user } = useUser();
  const router = useRouter();

  const [isProductInCart, setIsProductInCart] = useState(false);



  const checkIfProductInCard = () => {
    const documentId = product.documentId;
    const productInCart = cart.some(item => item.product.documentId === documentId);
    
    if (productInCart) {
      setIsProductInCart(true);
    } else {
      setIsProductInCart(false);
    }
  };
  
  useEffect(() => {
    console.log("useEffect called");
    checkIfProductInCard();
  }, [product,cart]);

  const handleAddToCard = async () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      try {
        const data = {
          data: {
            userName: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
            products: [product?.documentId],
          },
        };
        const response = await CardApis.addToCard(data);
        if (response.data) {
          setCart((oldCart) => [
            ...oldCart,
            {
              documentId: response?.data?.data?.documentId,
              product,
            },
          ]);
          setIsProductInCart(true);
          showToastMessage("Product added successfully", "add");
        } else {
          showToastMessage("Unexpected error occurred", "delete");
        }
      } catch (error) {
        showToastMessage(error.message, "delete");
      }
    }
  };

  return (
    <div>
      {product?.documentId ? (
        <div className="text-left space-y-4">
          <h2 className="text-2xl font-semibold">{product?.title}</h2>
          <h3 className="text-lg text-gray-400">{product?.category}</h3>
          <h3 className="text-lg text-gray-800">
            {getDescription(product?.description)}
          </h3>
          <h2 className="text-[15px] text-gray-500 flex gap-2 items-center">
            {product?.instantDelivery ? (
              <BadgeCheck className="text-green-500 h-5 w-5"></BadgeCheck>
            ) : (
              <AlertOctagon className="text-red-500 h-5 w-5"></AlertOctagon>
            )}{" "}
            {!product?.instantDelivery ? "Not" : ""} Eligible for instant
            delivery
          </h2>
          <h3 className="text-xl font-bold text-blue-600">
            {product?.price ? `$${product?.price}` : "N/A"}
          </h3>

          {isProductInCart ? (
            <h2 className="text-red-800 text-[20px] capitalize font-semibold">
              This product is already added to the cart
            </h2>
          ) : (
            <Button
              onClick={handleAddToCard}
              variant="contained"
              className="flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </Button>
          )}
        </div>
      ) : (
        <SkeletonProductInfo></SkeletonProductInfo>
      )}
    </div>
  );
};

export default ProductInfo;
