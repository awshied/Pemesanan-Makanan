import User from "../models/User.js";
import Pesanan from "../models/Pesanan.js";
import Expense from "../models/Expense.js";

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
    const totalPesanan = await Pesanan.countDocuments({ status: "selesai" });
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
export const getRevenueAndExpense = async (req, res) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const revenueData = await Pesanan.aggregate([
      {
        $match: {
          isPaid: true,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$amount" },
        },
      },
    ]);

    const expenseData = await Expense.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          expense: { $sum: "$amount" },
        },
      },
    ]);

    const months = [
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
    ];

    const data = months.map((month, index) => {
      const revenueItem = revenueData.find((r) => r._id === index + 1);
      const expenseItem = expenseData.find((e) => e._id === index + 1);

      return {
        month,
        revenue: revenueItem ? revenueItem.revenue : 0,
        expense: expenseItem ? expenseItem.expense : 0,
      };
    });

    res.json({
      success: true,
      year,
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin - Melihat Menu Apa Saja yang Paling Banyak Terjual pada Masing-Masing Kategori
export const getTopMenu = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.json({
        success: false,
        message: "Kategori wajib dipilih",
      });
    }

    const data = await Pesanan.aggregate([
      { $unwind: "$items" },

      // join ke menu
      {
        $lookup: {
          from: "menus",
          localField: "items.menu",
          foreignField: "_id",
          as: "menu",
        },
      },
      { $unwind: "$menu" },

      // filter kategori
      {
        $match: {
          "menu.category": category,
        },
      },

      // hitung total terjual
      {
        $group: {
          _id: {
            menuId: "$menu._id",
            name: "$menu.name",
            image: "$menu.image",
          },
          totalTerjual: { $sum: "$items.quantity" },
        },
      },

      { $sort: { totalTerjual: -1 } },
      { $limit: 5 },
    ]);

    const result = data.map((item) => ({
      menuId: item._id.menuId,
      name: item._id.name,
      image: item._id.image,
      totalTerjual: item.totalTerjual,
    }));

    res.json({
      success: true,
      category,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Melihat Persentase Kategori Menu Apa Saja yang Paling Laris Menggunakan Pie Chart serta Dapat Dikelompokkan Menjadi Penjualan Harian, Penjualan Mingguan, Penjualan Bulanan, dan Penjualan Tahunan
export const getTopCategorySales = async (req, res) => {
  try {
    const { range = "harian" } = req.query;

    const now = new Date();
    let startDate;

    switch (range) {
      case "harian":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "mingguan":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "bulanan":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "tahunan":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(0);
    }

    const rawData = await Pesanan.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          $or: [{ metodePembayaran: "COD" }, { isPaid: true }],
        },
      },
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

    const totalAll = rawData.reduce((acc, d) => acc + d.total, 0);

    const result = rawData.map((item) => ({
      category: item._id,
      total: item.total,
      percentage: ((item.total / totalAll) * 100).toFixed(1),
    }));

    res.json({
      success: true,
      range,
      data: result,
    });
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

    const currentYear = new Date().getFullYear();
    const years = [currentYear - 2, currentYear - 1, currentYear];
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
