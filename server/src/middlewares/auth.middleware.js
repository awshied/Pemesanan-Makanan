import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
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
      return res.status(401).json({ message: "Yaaahh, penggunanya gada!" });

    req.user = user;
    next();
  } catch (error) {
    console.error("protectRoute error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Unauthorized - Token tidak valid",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Unauthorized - Token kadaluarsa",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized - User tidak terautentikasi",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Forbidden - Akses khusus admin",
    });
  }

  next();
};
