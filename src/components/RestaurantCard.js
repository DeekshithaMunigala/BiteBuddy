import { useContext } from "react";
import { imgUrl } from "../utils/links";
import UserContext from "../utils/UserContext";
import { FaStar } from "react-icons/fa";

const RestaurantCard = (props) => {
  // const { name, rating } = props;
  // console.log(props);

  const { loggedInUser } = useContext(UserContext);

  const {
    name,
    avgRating,
    cloudinaryImageId,
    sla,
    costForTwo,
    cuisines,
    deliveryTime,
    areaName,
  } = props.card.info;

  return (
    <div className="rounded-md m-4 w-[275px] h-[340px] transform transition-transform duration-500 hover:scale-95">
      <img
        className="size-full h-[182px] rounded-2xl"
        src={imgUrl + cloudinaryImageId}
        alt={name}
      />
      <div className="p-2">
        <h4 className="mt-1 font-semibold text-lg">{name}</h4>

        <div className="flex font-semibold">
          <p className="mr-2">⭐{avgRating} </p>
          <p>• {sla.deliveryTime} mins</p>
        </div>
        <p className=" text-gray-600">{cuisines[0]}</p>
        <p className=" text-gray-600">{areaName}</p>
        <p className=" text-gray-600">{loggedInUser}</p>
      </div>
    </div>
  );
};

export const withVegLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-1 -left-2 bg-green-400 p-2 m-2 rounded-md font-medium z-10">
          Veg
        </label>

        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
