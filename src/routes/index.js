const express = require('express');
const router = express.Router();
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

// product
router.use("/product", productRoutes);

// cart
router.use("/cart", cartRoutes);

// user
router.use("/user", userRoutes);

// cart
router.use("/auth", authRoutes);

module.exports = router;