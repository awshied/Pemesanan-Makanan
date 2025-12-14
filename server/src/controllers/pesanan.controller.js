import Pesanan from "../models/Pesanan.js";
import Menu from "../models/Menu.js";
import User from "../models/User.js";
import stripe from "stripe";

const currency = "Rp";
const ongkir = 5;
const persentasePajak = 0.06;

export const pesananCOD = async (req, res) => {
  try {
    const { items, alamat } = req.body;
    const { userId } = req.auth();

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Pilih Menunya Dulu" });
    }

    let subtotal = 0;
    for (const item in items) {
      const menu = await Menu.findById(item.menu);
      if (!menu) {
        return res.json({ success: false, message: "Menu tidak ditemukan" });
      }

      const unitPrice = menu.price[item.size];
      if (!unitPrice) {
        return res.json({
          success: false,
          message: "Ukuran yang Kamu Pilih tuh Invalid",
        });
      }

      subtotal += unitPrice + item.quantity;
    }

    const taxAmount = subtotal * persentasePajak;
    const totalAmount = subtotal + taxAmount + ongkir;

    const pesanan = await Pesanan.create({
      userId,
      items,
      amount: totalAmount,
      alamat,
      metodePembayaran: COD,
    });

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Pesanan Diterima" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const pesananStripe = async (req, res) => {
  try {
    res.json({ success: true, message: "Pesanan Diterima" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const pesananPelanggan = async (req, res) => {
  try {
    const { userId } = req.auth();
    const pesanan = await Pesanan.find({
      userId,
      $or: [{ metodePembayaran: COD }, { isPaid: true }],
    })
      .populate("items.menu alamat")
      .sort({ createdAt: -1 });
    res.json({ success: true, pesanan });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const semuaPesanan = async (req, res) => {
  try {
    const orders = await Pesanan.find({
      $or: [{ metodePembayaran: COD }, { isPaid: true }],
    })
      .populate("items.menu alamat")
      .sort({ createdAt: -1 });

    const totalPesanan = orders.length;
    const totalPendapatan = orders.reduce(
      (acc, o) => acc + (o.isPaid ? o.amount : 0),
      0
    );

    res.json({
      success: true,
      dashboardData: { totalPesanan, totalPendapatan, orders },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Pesanan.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Pesanan Diperbarui" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
