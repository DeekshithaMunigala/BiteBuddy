import { useEffect, useState } from "react";
import { menu_api } from "./links";

const useRestaurantMenu = (id) => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch(menu_api + id);
      const data = await response.json();
      setMenu(data);
    };
    fetchMenu();
  }, []);

  return menu;
};

export default useRestaurantMenu;
