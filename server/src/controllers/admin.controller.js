import User from "../models/User.js";
import Menu from "../models/Menu.js";
import Pesanan from "../models/Pesanan.js";

// Admin - Melihat Semua Pelanggan Baik yang Online maupun yang Offline
export const getSemuaPelanggan = async (_, res) => {
  try {
    const pelanggan = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json({ success: true, pelanggan });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Meninjau Waktu Terakhir Online
export const getLatestOnline = async (_, res) => {
  try {
    const users = await User.find()
      .sort({ lastActive: -1 })
      .limit(10)
      .select("fullName email lastActive");

    res.json({ success: true, users });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Menghapus Pelanggan
export const deletePelanggan = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "Pelanggan berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Meninjau Berapa Banyak Pesanan yang Sudah Terkirim, Total Pendapatan yang Terkumpul, dan Total Pelanggan yang Dimiliki Saat Ini
export const getDashboardData = async (req, res) => {
  try {
    const totalPelanggan = await User.countDocuments({ role: "user" });
    const totalPesanan = await Pesanan.countDocuments();
    const totalPendapatan = await Pesanan.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      success: true,
      data: {
        totalPelanggan,
        totalPesanan,
        totalPendapatan: totalPendapatan[0]?.total || 0,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Mengetahui Pendapatan dan Pengeluaran Bulanan dalam Satu Tahun Menggunakan BarChart
export const getRevenueAndExpense = async (_, res) => {
  try {
    const data = await Pesanan.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json({ success: true, data });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Melihat Menu Apa Saja yang Paling Banyak Terjual pada Masing-Masing Kategori
export const getTopMenu = async (_, res) => {
  try {
    const data = await Pesanan.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.menu",
          totalTerjual: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalTerjual: -1 } },
      { $limit: 5 },
    ]);
    res.json({ success: true, data });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Melihat Persentase Kategori Menu Apa Saja yang Paling Laris Menggunakan Pie Chart serta Dapat Dikelompokkan Menjadi Penjualan Harian, Penjualan Mingguan, Penjualan Bulanan, dan Penjualan Tahunan
export const getTopCategorySales = async (_, res) => {
  try {
    const data = await Pesanan.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "menus",
          localField: "items.menu",
          foreignField: "_id",
          as: "menu",
        },
      },
      { $unwind: "$menu" },
      {
        $group: {
          _id: "$menu.category",
          total: { $sum: "$items.quantity" },
        },
      },
    ]);
    res.json({ success: true, data });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Meninjau Pertumbuhan Pelanggan dalam Tiga Tahun Terakhir Menggunakan Line Chart (2023, 2024, 2025)
export const getCustomerGrowth = async (req, res) => {
  try {
    const rawData = await User.aggregate([
      {
        $match: { role: "user" },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const years = [2023, 2024, 2025];
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const result = years.map((year) => {
      return {
        year,
        data: months.map((month) => {
          const found = rawData.find(
            (d) => d._id.year === year && d._id.month === month
          );
          return found ? found.total : 0;
        }),
      };
    });

    res.json({
      success: true,
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      datasets: result,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
