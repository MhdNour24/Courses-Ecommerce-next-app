const { default: axiosInstance } = require("./axiosInstant");

const getLatestProducts = () => axiosInstance.get("/products?populate=*");
const getProductById=(id)=>axiosInstance.get(`/products/${id}?populate=*`)
const getProductByCategory=(category)=>axiosInstance.get(`products?filters[category][$eq]=${category}&populate=*`)

export default {
  getProductById,
  getLatestProducts,
  getProductByCategory
};
