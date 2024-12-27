const express = require("express");
const cors = require("cors");
const { databaseConnect } = require("./config/datatbase");
const authRoutes = require("./routes/auth.routes.js");
const productRoutes = require("./routes/product.routes.js");
const flippy = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN_URI,
  credentials: true,
};

//Middleware
flippy.use(cors(corsOptions));
flippy.use(express.json());
flippy.use(express.urlencoded({ extended: true }));

//Routes
flippy.use("/flippy", authRoutes);
flippy.use("/flippy", productRoutes);

//database
databaseConnect();

flippy.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

flippy.get("/", (req, res) => {
  res.send("Crud Operations");
});
