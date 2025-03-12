// imports
import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";

import authRoutes from './routes/authRoute.js'
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js"
import couponRoutes from "./routes/couponRoute.js"
import paymentRoutes from "./routes/paymentRoute.js"
import analyticsRoutes from "./routes/analyticsRoute.js"

// middleware
dotenv.config();
const app = express();
app.use(express.json()); // allows you to parse JSON data / body of request
app.use(cookieParser());

const PORT = process.env.PORT || 5001;

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// server starter
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is live on http://localhost:${PORT}`)
})