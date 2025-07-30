const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.get("/checkHealth", (req, res) => {
  res.status(200).json({ message: "Restaurant service is running" });
});

router.get("/getRestaurant", restaurantController.getRestaurant);
router.get("/getRestaurantById/:id", restaurantController.getRestaurantById);

module.exports = router;
