"use client";
import { useEffect, useState } from "react";
import ProductApis from "../../_utils/ProductApis";
import { useParams, usePathname } from "next/navigation"; // استخدام useParams لجلب params
import Breadcrumb from "../../_components/Breadcrumb"
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductsList from "../../_components/ProductList";
const ProductDetails = () => {
  const pathname=usePathname()
  const { productId } = useParams(); // استخدام useParams لجلب productId
  const [product, setProduct] = useState({}); // لتخزين بيانات المنتج
  const [productList, setProductList] = useState([]); //
  const getProductListByCategory = async (product) => {
    try {
      const response = await ProductApis.getProductByCategory(
        product?.category
      );
      if (response.data.data) {
        setProductList(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getProductById_ = async () => {
    try {
      const response = await ProductApis.getProductById(productId);
      if (response.data.data) {
        setProduct(response.data.data);
        getProductListByCategory(response.data.data);
      } else {
        console.log("the product was not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProductById_();
  }, [productId]);

  return (
    <div className="px-10 md:px-28 py-8  flex flex-col justify-start">
      <Breadcrumb path={pathname}></Breadcrumb>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 justify-around">
        <ProductBanner product={product}></ProductBanner>
        <ProductInfo product={product}></ProductInfo>
      </div>
      <div className="mt-32">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Similar Products
        </h2>
        <ProductsList productList={productList}></ProductsList>
      </div>
    </div>
  );
};

export default ProductDetails;
