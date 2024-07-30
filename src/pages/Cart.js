import { useDispatch, useSelector } from "react-redux";
import { clearItem, removeItem } from "../utils/store/CartSlice";
import CartItem from "../components/CartItem";
import { FaList } from "react-icons/fa6";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const totalAmount = useSelector((store) => store.cart.totalAmount);
  console.log(totalAmount);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearItem());
  };

  return (
    <div className="m-5 p-5 mb-8">
      <h1 className="font-bold uppercase text-2xl tracking-wider text-center">
        My Cart
      </h1>

      <div className="lg:w-6/12 sm:w-full mx-auto m-2 p-2 relative">
        {(cartItems || []).map((detail) => (
          <CartItem detail={detail} key={detail.id} />
        ))}

        {cartItems.length === 0 ? (
          <h1 className="text-xl tracking-wider text-center">
            Your cart is empty. Add items to your cart :)
          </h1>
        ) : (
          <div className="px-4 mt-16">
            <h1 className="left-0 font-bold tracking-wide border-b-2 border-gray-100 pb-2">
              Bill Details
            </h1>

            <div className="flex justify-between items-center font-semibold my-1">
              <p className="flex items-center">
                <FaList className="mr-2 text-sm" />
                Total Items :{" "}
              </p>
              <p>
                {cartItems.length} {cartItems.length === 1 ? `Item` : `Items`}
              </p>
            </div>

            <div>
              <p className="flex justify-between items-center font-semibold my-1">
                Total Amount :
                <div>
                  <span className="mr-1">&#8377;</span>
                  {totalAmount}
                </div>
              </p>
            </div>

            <button
              className="rounded tracking-wide bg-red-500 text-white py-1 px-3 mt-4 mr-5 hover:bg-red-600 absolute right-0"
              onClick={handleClearCart}
            >
              {cartItems.length === 1 ? `Clear Item` : `Clear Items`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
