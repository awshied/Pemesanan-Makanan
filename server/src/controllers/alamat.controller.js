import Alamat from "../models/Alamat.js";

// User - Tambah Alamat
export const tambahAlamat = async (req, res) => {
  try {
    const alamatData = req.body;
    const userId = req.user;
    await Alamat.create({ ...alamatData, user: userId });

    res.json({ success: true, message: "Alamat baru saja dibuat" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// User - Meninjau Alamat
export const getAlamat = async (req, res) => {
  try {
    const userId = req.user;
    const addresses = await Alamat.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// User - Menghapus Alamat
export const hapusAlamat = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const alamat = await Alamat.findOne({
      _id: id,
      user: userId,
    });

    if (!alamat) {
      return res.json({ success: false, message: "Alamat tidak ditemukan" });
    }

    await alamat.deleteOne();

    res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
