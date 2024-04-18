const express = require("express");
const router = express.Router();
const userController = require("../../controllers/client/user.controller.js");

// Route POST /register
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/user", userController.getUser);
router.get("/find-by-email/:email", userController.findByEmail);
router.get("/find-by-id/:id", userController.getUser);
router.get("/check-authentication", userController.checkAuthentication);
module.exports = router;
