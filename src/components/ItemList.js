import { CDN_URL } from "../utils/links";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/store/CartSlice";
import { VEG_ICON_IMAGE, NON_VEG_ICON_IMAGE } from "../utils/links";

const ItemList = ({ detail }) => {
  // const { items, data } = props;

  const {
    id: itemId,
    name,
    description,
    imageId,
    isVeg,
    price,
    defaultPrice,
  } = detail;

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    const validPrice = price !== undefined ? price : defaultPrice;

    if (validPrice === 0) {
      console.error("Item price is not valid", detail);
      return;
    }

    dispatch(
      addItem({
        id: itemId,
        name,
        description,
        imageId,
        isVeg,
        price: validPrice,
        defaultPrice,
      })
    );
  };

  return (
    <div>
      <div
        key={itemId}
        className="flex justify-between p-2 m-2 border-gray-200 text-left border-b-2"
      >
        <div className="w-9/12">
          <p>
            {isVeg === 1 ? (
              <img className="w-3 h-3" src={VEG_ICON_IMAGE} />
            ) : (
              <img className="w-3 h-3" src={NON_VEG_ICON_IMAGE} />
            )}
          </p>
          <div className="py-2">
            <span className="font-semibold">{name}</span>

            {/* <div>{data}</div> PROP DRILL */}

            <span className="flex">
              <span className="mr-1">&#8377;</span>{" "}
              {price ? price / 100 : defaultPrice / 100}
            </span>
          </div>

          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="w-3/12 ml-4 relative mb-2">
          {imageId && <img src={CDN_URL + imageId} className=" h-[100%]" />}

          <div>
            <button
              className="font-bold absolute bg-white -bottom-3 py-1 px-7 mx-8 rounded-lg uppercase text-green-600 shadow-md hover:bg-gray-200"
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
