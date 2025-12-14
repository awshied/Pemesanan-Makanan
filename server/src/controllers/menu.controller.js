import { v2 as cloudinary } from "cloudinary";
import Menu from "../models/Menu.js";

export const createMenu = async (req, res) => {
  try {
    const menuData = JSON.parse(req.body.menuData);
    const images = req.files;

    const imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Menu.create({ ...menuData, images: imageUrl });

    res.json({ success: true, message: "Menu telah dibuat" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const listMenu = async (req, res) => {
  try {
    const menus = await Menu.find({});

    res.json({ success: true, menus });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const singleMenu = async (req, res) => {
  try {
    const { menuId } = await req.body;
    const menu = await Menu.findById(menuId);

    res.json({ success: true, menu });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const toggleStock = async (req, res) => {
  try {
    const { menuId, inStock } = await req.body;
    await Menu.findByIdAndUpdate(menuId, { inStock });
    res.json({ success: true, message: "Stok baru saja diperbarui" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
