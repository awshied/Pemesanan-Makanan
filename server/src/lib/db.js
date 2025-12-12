import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error("MONGO_URI belom disetting");

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB TERKONEKSI:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB ga bisa terkoneksi:", error);
    process.exit(1);
  }
};
