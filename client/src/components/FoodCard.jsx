import React from "react";

const FoodCard = ({
  title,
  image,
  price,
  description,
  rating,
  reviewsCount,
  promo,
  prepTime,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-3 border border-gray-100">
      {/* Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-lg"
        />

        {/* Promo Badge */}
        {promo && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-md shadow">
            {promo}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="mt-3 space-y-1">
        {/* Title */}
        <h3 className="text-lg font-semibold">{title}</h3>

        {/* Ratings + Prep Time */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            ⭐ {rating} ({reviewsCount})
          </span>
          <span className="flex items-center gap-1">⏱️ {prepTime} min</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

        {/* Price */}
        <p className="text-lg font-bold text-primary mt-2">Rp {price}</p>

        {/* Add to Cart Button */}
        {quantity === 0 ? (
          <button
            onClick={onAdd}
            className="w-full mt-3 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90"
          >
            Tambah
          </button>
        ) : (
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={onDecrease}
              className="w-10 h-10 bg-gray-200 text-xl rounded-lg"
            >
              -
            </button>

            <span className="font-semibold">{quantity}</span>

            <button
              onClick={onIncrease}
              className="w-10 h-10 bg-primary text-white text-xl rounded-lg"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
