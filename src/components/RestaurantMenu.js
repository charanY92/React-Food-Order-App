import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // import useParams for read `resId`
import {
  FOODFIRE_MENU_API_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../utils/constants"; // import constants
import { MenuShimmer } from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams(); // useParams hook to read `resId` from the URL
  const resInfo = useRestaurantMenu(resId); // state variable to store restaurant info

  return !resInfo ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-details"></div>
      <h1>{resInfo?.cards[2]?.card.card.info.name}</h1>
      <h3>{resInfo?.cards[2]?.card.card.info.cuisines.join(", ")}</h3>
      <img
        src={
          IMG_CDN_URL + resInfo?.cards[2]?.card?.card?.info.cloudinaryImageId
        }
        alt="restaurant-logo"
      />
      <p>{resInfo?.cards[2]?.card?.card?.info?.areaName}</p>
      <p>{resInfo?.cards[2]?.card.card.info?.city}</p>
      <p>{resInfo?.cards[2]?.card?.card?.info?.avgRating} stars</p>
      <p>{resInfo?.cards[2]?.card?.card?.info?.costForTwoMessage}</p>
      <h2>Menu</h2>
      <div className="menu-items">
        {resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
          .filter((card) => card.card?.card["@type"] === MENU_ITEM_TYPE_KEY)[0]
          .card?.card?.itemCards.filter((item) => item.card.info.isVeg === 1)
          .map((item) => (
            <div key={item.card.info.id} className="menu-item">
              <img
                src={ITEM_IMG_CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
              />
              <h3>{item.card.info.name}</h3>
              <p>{item.card.info.description}</p>
              <p>₹{item.card.info.price / 100}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
