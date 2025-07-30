const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.get("/checkHealth", (req, res) => {
  res.status(200).json({ message: "Location service is running" });
});

router.get("/getLocation", locationController.getLocation);
router.get("/getLocationById/:id", locationController.getLocationById);

module.exports = router;
