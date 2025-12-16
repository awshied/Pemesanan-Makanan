import Pesanan from "../models/Pesanan.js";
import Menu from "../models/Menu.js";
import User from "../models/User.js";
import stripe from "stripe";

const currency = "Rp";
const ongkir = 5;
const persentasePajak = 0.06;

// User - Pembayaran COD
export const pesananCOD = async (req, res) => {
  try {
    const { items, alamat } = req.body;
    const userId = req.user;

    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "Keranjang Kosong, silahkan pilih menunya dulu",
      });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const menu = await Menu.findById(item.menu);
      if (!menu || !menu.inStock) {
        return res.json({ success: false, message: "Menu tidak tersedia" });
      }

      const unitPrice = menu.price[item.size];
      if (!unitPrice) {
        return res.json({
          success: false,
          message: "Ukuran yang Kamu Pilih tuh Invalid",
        });
      }

      subtotal += unitPrice + item.quantity;

      orderItems.push({
        menu: menu._id,
        quantity: item.quantity,
        size: item.size,
        price,
      });
    }

    const taxAmount = subtotal * persentasePajak;
    const totalAmount = subtotal + taxAmount + ongkir;

    await Pesanan.create({
      user: userId,
      items: orderItems,
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

// User - Pembayaran Stripe (Kosongin Dulu untuk Sekarang)
export const pesananStripe = async (req, res) => {
  try {
    res.json({ success: true, message: "Pesanan Diterima" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// User - Tinjau Riwayat Pesanan
export const pesananPelanggan = async (req, res) => {
  try {
    const { userId } = req.auth();
    const pesanan = await Pesanan.find({ user: userId })
      .populate("items.menu alamat")
      .sort({ createdAt: -1 });
    res.json({ success: true, pesanan });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Tinjau Semua Pesanan Pelanggan
export const semuaPesanan = async (req, res) => {
  try {
    const pesanan = await Pesanan.find({ user: userId })
      .populate("items.menu alamat")
      .sort({ createdAt: -1 });

    const totalPesanan = orders.length;
    const totalPendapatan = orders.reduce(
      (acc, o) => acc + (o.isPaid ? o.amount : 0),
      0
    );

    res.json({
      success: true,
      dashboardData: { totalPesanan, totalPendapatan, pesanan },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Memperbarui Status
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
