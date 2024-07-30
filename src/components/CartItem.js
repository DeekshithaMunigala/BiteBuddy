import { useDispatch, useSelector } from "react-redux";
import { VEG_ICON_IMAGE, NON_VEG_ICON_IMAGE } from "../utils/links";
import { CDN_URL } from "../utils/links";
import { increaseItem, decreaseItem } from "../utils/store/CartSlice";

const CartItem = ({ detail }) => {
  const { id: itemId, name, imageId, isVeg, price, defaultPrice } = detail;

  const dispatch = useDispatch();

  const handleIncreaseItem = () => {
    dispatch(increaseItem({ itemId, price, defaultPrice }));
  };

  const currentItem = useSelector((store) =>
    store.cart.items.find(({ id }) => id === itemId)
  );

  const handleDecreaseItem = () => {
    dispatch(decreaseItem({ itemId, price, defaultPrice }));
  };

  return (
    <div
      key={itemId}
      className="flex justify-between items-center p-2 m-2 pb-5 border-gray-100 text-left border-b-2"
    >
      <div className="w-3/12">
        {imageId && <img src={CDN_URL + imageId} className="h-[100%]" />}
      </div>

      <div className="w-6/12 ">
        <div>
          <div className="flex items-center mb-1">
            <p className="mr-2">
              {isVeg === 1 ? (
                <img className="w-3 h-3" src={VEG_ICON_IMAGE} />
              ) : (
                <img className="w-3 h-3" src={NON_VEG_ICON_IMAGE} />
              )}
            </p>
            <span className="font-semibold">{name}</span>
          </div>

          <span className="flex font-semibold">
            <span className="mr-1">&#8377;</span>
            {price ? price / 100 : defaultPrice / 100}
          </span>
        </div>
      </div>

      <div className="w-2/12 ">
        <div className="flex justify-between font-bold bg-white border border-gray-300 py-2 px-5 rounded-lg uppercase text-green-600 shadow-lg hover:bg-gray-50">
          <span className="cursor-pointer" onClick={handleDecreaseItem}>
            -
          </span>
          <span>{currentItem.quantity || 1}</span>
          <span className="cursor-pointer" onClick={handleIncreaseItem}>
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
