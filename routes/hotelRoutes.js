const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.get("/checkHealth", (req, res) => {
  res.status(200).json({ message: "Hotel service is running" });
});

router.get("/getHotel", hotelController.getHotel);
router.get("/getHotelById/:id", hotelController.getHotelById);

module.exports = router;
