import mongoose from "mongoose";

const pesananSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    items: [
      {
        menu: {
          type: String,
          required: true,
          ref: "Menu",
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
      ref: "Alamat",
    },
    status: {
      type: String,
      default: "Pesanan Diterima",
    },
    metodePembayaran: {
      type: String,
      required: true,
    },
    idPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Pesanan = mongoose.model("Pesanan", pesananSchema);

export default Pesanan;
