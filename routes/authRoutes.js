const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/checkHealth", (req, res) => {
  res.status(200).json({ message: "Location service is running" });
});

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
