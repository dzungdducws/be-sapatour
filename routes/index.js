const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const locationRoutes = require("./locationRoutes");
const hotelRoutes = require("./hotelRoutes");
const restaurantRoutes = require("./restaurantRoutes");
const bookingRoutes = require("./bookingRoutes");

router.use("/auth", authRoutes);
router.use("/location", locationRoutes);
router.use("/hotel", hotelRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/booking", bookingRoutes);

module.exports = router;
