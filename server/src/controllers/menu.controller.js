import { v2 as cloudinary } from "cloudinary";
import Menu from "../models/Menu.js";

// Admin - Tambah Menu Baru
export const createMenu = async (req, res) => {
  try {
    const menuData = JSON.parse(req.body.menuData);

    const images = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "menus",
        });
        return result.secure_url;
      })
    );

    await Menu.create({ ...menuData, images });

    res.json({ success: true, message: "Menu telah dibuat" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Tinjau List Menu Saat Ini
export const getAdminMenu = async (_, res) => {
  try {
    const menus = await Menu.find().sort({ createdAt: -1 });

    res.json({ success: true, menus });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Mengatur Ketersediaan Stok Menu
export const toggleStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;

    await Menu.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stok baru saja diperbarui" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Edit dan Memperbarui Menu
export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menuData = JSON.parse(req.body.menuData);

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    // Update Gambar Menu Baru
    if (req.files?.length) {
      const images = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: "menus" })
        )
      );
      menu.images = images.map((img) => img.secure_url);
    }

    Object.assign(menu, menuData);
    await menu.save();

    res.json({ success: true, message: "Menu diperbarui" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin - Hapus Menu
export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);
    if (!menu) return res.status(404).json({ message: "Menu tidak ditemukan" });

    await Menu.findByIdAndDelete(id);

    res.json({ success: true, message: "Menu telah dihapus" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// User - Mencari dan Melihat-Lihat Menu
export const getUserMenu = async (_, res) => {
  try {
    const menus = await Menu.find({ inStock: true });
    res.json({ success: true, menus });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// User - Meninjau Detail Menu
export const getMenuDetail = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    // Umpetin Menu yang Stoknya Habis
    if (!menu || !menu.inStock) {
      return res.status(404).json({ message: "Menu tidak tersedia" });
    }

    res.json({
      success: true,
      menu,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
