import { logo } from "../utils/links";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const isOnline = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between h-20 px-[18] shadow-lg mb-5">
      <div className="flex items-center justify-between w-52">
        <img className="h-16 rounded-full mix-blend-multiply" src={logo} />
        <h3 className=" font-medium text-xl uppercase text-gray-700 tracking-wider">
          Bite Buddy
        </h3>
      </div>

      <ul className="flex justify-center items-center ">
        <li className="px-4 font-medium sm:visible invisible">
          {isOnline ? "🟢" : "🔴"}
        </li>
        <li className="px-4 sm:ml-0 ml-10 font-medium lg:text-lg md:text-base  sm:text-xs text-gray-700 tracking-wide">
          <Link to="/">Home</Link>
        </li>
        <li className="px-4 font-medium lg:text-lg md:text-base  sm:text-xs text-gray-700 tracking-wide sm:visible invisible">
          <Link to="/about">About Us</Link>
        </li>
        <li className="px-4 font-medium lg:text-lg md:text-base  sm:text-xs text-gray-700 tracking-wide">
          <Link to="/cart">
            <div className=" flex sm:items-center">
              <FaShoppingCart className="mr-1 relative text-xl" />
              <span className="absolute top-3 text-sm px-[6px] mb-1">
                {cartItems.length === 0 ? "" : cartItems.length}
              </span>
            </div>
          </Link>
        </li>
        <li className="px-4 font-medium lg:text-lg md:text-base sm:text-xs text-gray-700 tracking-wide sm:visible invisible">
          <Link to="/contact">Contact Us</Link>
        </li>
        <li className="px-4 font-medium lg:text-lg md:text-base  sm:text-xs text-gray-700 tracking-wide sm:visible invisible">
          <Link to="/login">Login</Link>
        </li>
        <li className="px-4 font-medium lg:text-lg md:text-base  sm:text-xs text-gray-700 tracking-wide sm:visible invisible">
          {loggedInUser}
        </li>
      </ul>
    </div>
  );
};

export default Header;
