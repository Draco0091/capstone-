import React, { useContext, useEffect, useState } from "react";
import "./RestaurantList.css";
import Restaurant from "../Restaurant/Restaurant";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_BASE_URL}/restaurants`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        setRestaurants(data.data); // Store foods array in context
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="food-display" id="food-display">
      <h2>Restaurants</h2>
      <div className="grid  grid-cols-3 gap-4">
        {restaurants.map((item, index) => {
          return (
            <Restaurant
              key={index}
              id={item.id}
              name={item.name}
              description={item.about}
              total_reviews={item.total_reviews}
              rating={item.average_rating}
              image={`data:image/png;base64,${item.image_data}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantList;
