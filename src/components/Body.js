import { useContext, useEffect, useState } from "react";
import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import { api } from "../utils/links";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import Banner from "./Banner";

const Body = () => {
  const isOnline = useOnlineStatus();

  const [resList, setResList] = useState([]);
  const [search, setSearch] = useState("");

  const [dummy, setDummy] = useState([]);

  const { loggedInUser, setUserInfo } = useContext(UserContext);

  const RestaurantCardVeg = withVegLabel(RestaurantCard);

  // const handleRestaurant = () => {
  //   const data = resList.filter((each) => each.info.avgRating > 4.5);
  //   // console.log(data);
  //   setResList(data);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api);
      const data = await response.json();

      setResList(
        data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      );
      setDummy(
        data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      );
    };

    fetchData();
  }, []);

  if (isOnline === false)
    return (
      <h1 className="flex justify-center items-center h-[70vh] font-medium text-3xl">
        Please check your internet connection.....
      </h1>
    );

  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="flex flex-col justify-center sm:px-0 px-[1%]">
      <div className="flex sm:flex-row justify-between items-center flex-wrap h-16 mb-5 lg:mx-40 sm:mx-3 md:mx-20">
        <div className="flex">
          <input
            className="shadow-lg lg:mr-3 px-2 py-1 rounded border-black border-solid border outline-none sm:mr-1"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="cursor-pointer shadow-lg rounded border-black border-solid border outline-none px-3 py-1 hover:bg-orange-200 lg:text-base sm:text-xs"
            onClick={() => {
              const data = dummy.filter((each) =>
                each.info.name.toUpperCase().includes(search.toUpperCase())
              );
              setResList(data);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="cursor-pointer shadow-lg rounded border-black border-solid border outline-none px-5 lg:py-1 hover:bg-orange-200 lg:text-base sm:text-xs sm:py-2"
          onClick={() => {
            const data = dummy.filter((each) => each.info.avgRating > 4.5);
            setResList(data);
          }}
        >
          Top Rated Restaurants
        </button>

        <div className="sm:visible invisible">
          <label className="mr-2 lg:text-base sm:text-sm">Username</label>
          <input
            className="shadow-lg lg:text-base rounded border-black border-solid border outline-none px-2 lg:py-1 sm:text-xs sm:py-2"
            type="text"
            value={loggedInUser}
            onChange={(e) => {
              setUserInfo(e.target.value);
            }}
          />
        </div>
      </div>

      <Banner />

      <h2 className="font-bold text-xl lg:mx-40 md:mx-32 sm:mx-10 mt-8 mb-3">
        Restaurants with online food delivery in Hyderabad
      </h2>

      <div className="flex flex-wrap justify-center items-center mx-auto mb-10">
        {resList.map((each) => (
          <Link to={"/restaurant/" + each.info.id}>
            {each.info.veg ? (
              <RestaurantCardVeg key={each.info.id} card={each} />
            ) : (
              <RestaurantCard key={each.info.id} card={each} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
