import React, { useState } from "react";
import FoodCard from "../components/FoodCard";

const dummyProduct = {
  title: "Nasi Goreng Special",
  image: "/images/nasgor.jpg",
  price: 25000,
  description: "Nasi goreng dengan topping ayam, telur, dan sayur segar.",
  rating: 4.8,
  reviewsCount: 122,
  promo: "PROMO 10%",
  prepTime: 12,
};

const DummyMenuPage = () => {
  const [qty, setQty] = useState(0);

  return (
    <div className="p-5">
      <FoodCard
        {...dummyProduct}
        quantity={qty}
        onAdd={() => setQty(1)}
        onIncrease={() => setQty(qty + 1)}
        onDecrease={() => setQty(qty - 1)}
      />
    </div>
  );
};

export default DummyMenuPage;
