import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { useEffect, useState } from "react";
import { SWIGGY_API_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onLineStatus = useOnlineStatus();
  console.log("onLineStatus", onLineStatus);

  console.log("body render");
  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    // handle the error using try... catch
    try {
      const response = await fetch(SWIGGY_API_URL);
      const json = await response.json();
      console.log(
        "json",
        json?.data?.cards[4]?.card.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      // initialize checkJsonData() function to check Swiggy Restaurant data

      // call the checkJsonData() function which return Swiggy Restaurant data

      // update the state variable restaurants with Swiggy API data

      setListOfRestaurants(
        json?.data?.cards[4]?.card.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredRestaurants(
        json?.data?.cards[4]?.card.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.log(error);
    }
  }
  const filterTopRated = () => {
    const filteredList = listOfRestaurants.filter((restaurant) => {
      return restaurant.info.avgRating > 4.0;
    });

    setFilteredRestaurants(filteredList);
  };
  if (!onLineStatus) {
    return (
      <h1>
        Looks like you are offline, please check your internet connection.
      </h1>
    );
  }
  console.log("listOfRestaurants", listOfRestaurants);
  console.log("filteredRestaurants", filteredRestaurants);
  return filteredRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="p-4 m-4">
          <input
            type="text"
            placeholder="Search for restaurants..."
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="bg-green-100 m-4 px-4 py-2 rounded-lg"
            onClick={() => {
              if (searchText === "") {
                setFilteredRestaurants(listOfRestaurants);
                return;
              }
              const filteredList = listOfRestaurants.filter((restaurant) =>
                restaurant.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );

              setFilteredRestaurants(filteredList);
            }}
          >
            Search
          </button>
        </div>
        <div className="p-4 m-4 flex items-center ">
          <button
            className="bg-gray-200 m-4 px-4 py-2 rounded-lg"
            onClick={filterTopRated}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="outer-container">
        <div className="flex flex-wrap justify-center">
          {filteredRestaurants?.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard
                  cloudinaryImageId={restaurant.info.cloudinaryImageId}
                  name={restaurant.info.name}
                  cuisines={restaurant.info.cuisines}
                  area={restaurant.info.areaName}
                  lastMileTravelString={restaurant.info.sla.slaString}
                  costForTwoString={restaurant.info.costForTwo}
                  avgRating={restaurant.info.avgRating}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Body;
