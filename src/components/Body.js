import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(restaurantList);
  const filterTopRated = () => {
    const filteredList = listOfRestaurants.filter((restaurant) => {
      console.log(restaurant.data.avgRating);
      return restaurant.data.avgRating > 4.0;
    });

    setListOfRestaurants(filteredList);
  };
  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={filterTopRated}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant.data.id}
              cloudinaryImageId={restaurant.data.cloudinaryImageId}
              name={restaurant.data.name}
              cuisines={restaurant.data.cuisines}
              area={restaurant.data.area}
              lastMileTravelString={restaurant.data.lastMileTravelString}
              costForTwoString={restaurant.data.costForTwoString}
              avgRating={restaurant.data.avgRating}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
