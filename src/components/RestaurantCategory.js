import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ItemList from "./ItemList";

const RestaurantCategory = ({ category, showItem, setShowIndex, data }) => {
  // const [showItem, setShowItem] = useState(false);
  // const handleClick = () => {
  //   setShowItem(!showItem);
  // };

  const handleItem = () => {
    setShowIndex();
  };

  // const { title, itemCards } = props.category.card.card;

  return (
    <div className=" mx-auto mb-2 p-5 lg:w-6/12 rounded shadow-lg sm:w-full">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleItem}
      >
        <span className="font-bold text-lg">
          {category.title} ({category.itemCards.length})
        </span>

        <span>{showItem ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </div>

      {/* {showItem && <ItemList items={category.itemCards} data={data} />} */}
      {showItem &&
        category.itemCards.map(({ card: { info } }, index) => (
          <ItemList detail={info} key={info.id || index}></ItemList>
        ))}
    </div>
  );
};

export default RestaurantCategory;
