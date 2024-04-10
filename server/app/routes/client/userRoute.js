const express = require("express");
const router = express.Router();
const userController = require("../../controllers/client/userController.js");

// Route POST /register
router.post("/register", userController.register);

module.exports = router;
