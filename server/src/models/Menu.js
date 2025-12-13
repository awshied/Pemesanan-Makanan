import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    sizes: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    popular: {
      type: Boolean,
      required: false,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    sizeMeans: {
      type: Object,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    starsTotal: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
