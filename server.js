const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const database = require("./Config/connection");
require("dotenv").config();
const AuthRoutes = require("./Routes/Auth");
const InventoryRoutes = require("./Routes/Inventory");
const AnalyticsRoutes = require("./Routes/Analytics");
const AdminRoutes = require("./Routes/Admin");
const cookieParser = require("cookie-parser");
const path = require("path");

//creating Server
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "https://bloodband-dep.vercel.app",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./build")));
// ROUTEs
app.use("/auth", AuthRoutes);
app.use("/inventory", InventoryRoutes);
app.use("/analytics", AnalyticsRoutes);
app.use("/admin", AdminRoutes);

// static roudts

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./build/index.html"));
// });

//db connection
database().catch((error) => console.log(error));

//port
app.listen(process.env.PORT, (req, res) => {
  console.log(`server is runnig on port ${process.env.PORT}`);
});
