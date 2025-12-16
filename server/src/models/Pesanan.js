import mongoose from "mongoose";

const pesananSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        menu: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Menu",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Alamat",
    },
    status: {
      type: String,
      enum: [
        "Pesanan Diterima",
        "Diproses",
        "Dikirim",
        "Selesai",
        "Dibatalkan",
      ],
      default: "Pesanan Diterima",
    },
    metodePembayaran: {
      type: String,
      required: true,
      enum: ["Transfer", "COD"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Pesanan = mongoose.model("Pesanan", pesananSchema);

export default Pesanan;
