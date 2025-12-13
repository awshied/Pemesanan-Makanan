import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Gada izin - Token ga tersedia, maaf yaa :(" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ message: "Gada izin - Tokennya ga valid, maaf ya :(" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user)
      return res.status(404).json({ message: "Yaaahh, penggunanya gada!" });

    const adminEmail = process.env.ADMIN_EMAIL;
    const newRole = adminEmail && user.email === adminEmail ? "admin" : "user";

    if (user.role !== newRole) {
      user = await User.findByIdAndUpdate(
        decoded.userId,
        { role: newRole },
        { new: true }
      );
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Ada kesalahan di middleware protectRoute:", error);
    res.status(500).json({ message: "Servernya lagi error 🗿" });
  }
};
