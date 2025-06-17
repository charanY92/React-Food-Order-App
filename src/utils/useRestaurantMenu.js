import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null); // state variable to store restaurant info

  useEffect(() => {
    getRestaurantInfo(); // call getRestaurantInfo function to fetch api data and set data in restaurant state variable
  }, []);

  async function getRestaurantInfo() {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4340684&lng=78.5021299&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER` // use resId to fetch restaurant menu
      );
      const json = await data.json();
      console.log("json", json);
      setResInfo(json?.data); // set the fetched data in resInfo state variable
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  }

  return resInfo;
};

export default useRestaurantMenu;
