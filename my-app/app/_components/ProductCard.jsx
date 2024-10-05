// ProductCard.jsx
import Image from "next/image";
import React from "react";
import { Tag } from "lucide-react"; 
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product-details/${product.documentId}`} className="hover:cursor-pointer bg-white shadow-lg rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-5 hover:rotate-x-3d hover:rotateY-3 perspective-1500 relative overflow-hidden hover:shadow-2xl min-h-[350px]">
      {" "}
      <div className="overflow-hidden rounded-t-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-30 transition-opacity duration-500 ease-in-out"></div>

        <Image
          src={product?.banner?.url}
          width={400}
          height={350}
          alt={product?.banner?.name || "product"}
          className="object-cover h-[250px] w-full transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[15px] font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-500 line-clamp-1">
              {product?.title}
            </h2>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Tag className="h-5 w-5 text-gray-400 mr-1" />{" "}
              {product?.category}
            </div>
          </div>

          <h2 className="text-xl font-bold text-blue-600">
            {product?.price ? `$${product?.price}` : "N/A"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
