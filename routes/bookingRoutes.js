const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/checkHealth", (req, res) => {
  res.status(200).json({ message: "Booking service is running" });
});

router.get("/getBookingHotel/:id", bookingController.getBookingHotel);
router.get("/getBookingRestaurant/:id", bookingController.getBookingRestaurant);
router.get("/getStatus/:type", bookingController.getStatus);

module.exports = router;
