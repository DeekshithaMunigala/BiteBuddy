import { useEffect, useState } from "react";
import { meni_api } from "../utils/links";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  // const [menu, setMenu] = useState(null);
  const [showIndex, setShowIndex] = useState(null);
  const { id } = useParams();

  const data = "prop drill";

  // useEffect(() => {
  //   const fetchMenu = async () => {
  //     const response = await fetch(menu_api + id);
  //     const data = await response.json();
  //     setMenu(data);
  //   };
  //   fetchMenu();
  // }, []);

  const menu = useRestaurantMenu(id);

  if (menu === null)
    return (
      <h1 className="flex justify-center items-center h-[70vh] font-medium text-3xl">
        Data Loading....
      </h1>
    );

  const { name, cuisines, costForTwoMessage } =
    menu?.data?.cards[2]?.card?.card?.info;

  const categories =
    menu?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (each) =>
        each.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // const { itemCards } =
  //   menu.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card;

  // console.log(
  //   menu.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
  // );

  return (
    <div className="text-center m-10">
      <h1 className="font-semibold text-3xl tracking-wide">{name}</h1>
      <h2 className="mt-2 font-semibold">{cuisines.join(",")}</h2>
      <p className="font-semibold text-lg my-2">{costForTwoMessage}</p>

      <h3 className="my-3 text-md font-medium uppercase tracking-wide text-gray-700">
        Menu
      </h3>

      {/* 
      {itemCards && itemCards.length > 0 ? (
        itemCards.map((each) => (
          <ul className="shadow-lg rounded-md mx-auto mb-7 py-3 w-[600px]">
            <li className="tracking-wider text-gray-700">
              {each.card.info.name} - 💰
              {each.card.info.price
                ? each.card.info.price / 100
                : each.card.info.defaultPrice / 100}
            </li>
          </ul>
        ))
      ) : (
        <h1 className="font-bold text-xl my-5 ">No items available</h1>
      )} 
      */}

      {categories.map((each, index) => (
        // here restaurantcategeory is controlled by res menu. so rescateogeory is called controlled component
        // rescategeory is uncontrolled component when it maintains their own state

        <RestaurantCategory
          key={each.card.card.title}
          category={each.card.card}
          // showItem={index === 1 ? true : false}
          showItem={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
          data={data}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
