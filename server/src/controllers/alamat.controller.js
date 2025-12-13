import Alamat from "../models/Alamat.js";

export const tambahAlamat = async (req, res) => {
  try {
    const { alamat } = req.body;
    const { userId } = req.auth();
    await Alamat.create({ ...alamat, userId });

    res.json({ success: true, message: "Alamat baru saja dibuat" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getAlamat = async (req, res) => {
  try {
    const { userId } = req.auth();
    const addresses = await Alamat.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
