import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { use, useEffect, useState } from "react";
import { FOODFIRE_API_URL } from "../utils/constants";
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
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4340684&lng=78.5021299&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
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
      <div className="filter">
        <div className="serch">
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
            className="search-btn"
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
        <button className="filter-btn" onClick={filterTopRated}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="outer-container">
        <div className="res-container">
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
