import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Object,
      required: true,
      min: 0,
    },
    sizes: {
      type: [String],
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
    ingredients: [
      {
        type: String,
      },
    ],
    popular: {
      type: Boolean,
      required: false,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    salesCount: {
      type: Number,
      default: 0,
    },
    sizeMeans: {
      type: Object,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    starsTotal: {
      type: Number,
      default: 0,
    },
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    estimatedTime: {
      type: String,
      required: true,
      enum: [
        "1 - 4 Menit",
        "5 - 8 Menit",
        "9 - 12 Menit",
        "13 - 16 Menit",
        "17 - 20 Menit",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
