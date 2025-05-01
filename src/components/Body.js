import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";

const Body = () => {
  return (
    <div className="body">
      <div className="search">
        search
        {/* <input type="text" placeholder="Search" /> */}
      </div>
      <div className="res-container">
        {restaurantList.map((restaurant) => {
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
