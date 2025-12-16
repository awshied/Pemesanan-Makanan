import User from "../models/User.js";

export const tambahKeranjang = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const { userId } = req.user;

    const user = await User.findById(userId);
    const cartData = user.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = cartData[itemId] || {};
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    }

    user.cartData = cartData;
    await user.save();
    res.json({
      success: true,
      message: "Telah Ditambahkan ke Dalam Keranjang",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, messege: error.message });
  }
};

export const updateKeranjang = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const { userId } = req.user;

    const user = await User.findById(userId);
    const cartData = user.cartData || {};

    if (!cartData[itemId]) {
      return res.status(400).json({ message: "Item tidak ada di keranjang" });
    }

    if (quantity <= 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId] = cartData[itemId] || {};
      cartData[itemId][size] = quantity;
    }

    user.cartData = cartData;
    await user.save();

    await User.findByIdAndUpdate(userId, { cartData });
    res.json({
      success: true,
      messege: "Keranjang Baru Saja Diperbarui",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
