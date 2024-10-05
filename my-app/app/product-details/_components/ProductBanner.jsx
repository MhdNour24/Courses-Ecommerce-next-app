import Image from "next/image";
import React from "react";

const ProductBanner = ({ product }) => {
  return (
    <div>
      {product?.banner?.url ? (
        <Image
          src={product?.banner?.url}
          alt={product?.banner?.name || "product-details-banner"}
          width={400}
          height={400}
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default ProductBanner;
