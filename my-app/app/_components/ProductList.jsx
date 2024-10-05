// ProductsList.jsx
import ProductCard from "./ProductCard";

const ProductsList = ({ productList }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productList.map((product) => (
        <div key={product.documentId}>
          <ProductCard product={product}></ProductCard>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
