// ProductSection.jsx
"use client";
import ProductsList from "./ProductList";
import { useEffect, useState } from "react";
import ProductApis from "../_utils/ProductApis";

const ProductSection = () => {
  const [productList, setProductList] = useState([]);

  const getLatestProducts_ = () => {
    ProductApis.getLatestProducts().then((res) => {
      setProductList(res.data.data);
    });
  };
  useEffect(() => {
    getLatestProducts_();
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 bg-gray-100">
      <h1 className="font-bold text-center text-4xl mb-7 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600  transition-transform duration-300 hover:scale-105">
        Our Latest Products
      </h1>{" "}
      <ProductsList productList={productList}></ProductsList>
    </div>
  );
};

export default ProductSection;
