import { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import Link from "next/link";
const Cart = (setOpenCart) => {
  const { cart, setCart } = useContext(CartContext);

  return (
    <div className="h-[300px] w-[250px] bg-white z-10 rounded-lg border border-gray-200 shadow-lg absolute mx-10 right-10 top-12 p-5 overflow-auto">
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.documentId} className="flex items-center gap-4">
              <img
                src={item.product.banner.url}
                alt={item.product.title}
                className="w-12 h-12 rounded object-cover"
              />

              <div>
                <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                  {item?.product?.title}
                </h3>

                <dl className="mt-1 space-y-1 text-xs text-gray-600">
                  <div>
                    <dt className="inline font-medium">Category: </dt>
                    <dd className="inline">{item?.product?.category}</dd>
                  </div>

                  <div>
                    <dt className="inline font-medium">Price: </dt>
                    <dd className="inline text-gray-900 font-bold">{item?.product?.price} $</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4 text-center mt-6">
        <Link
          href="/cart"
          className="block rounded-lg bg-blue-600 px-5 py-2.5 text-sm text-white font-semibold shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          View my cart ({cart?.length})
        </Link>

        <Link
          href="/"
          className="inline-block text-sm text-blue-500 underline underline-offset-4 hover:text-blue-600 transition"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
  