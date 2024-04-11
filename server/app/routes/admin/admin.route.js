const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/admin.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/admin-management", controller.accountManagement);
router.get("/welcome", controller.getAdmin);
router.post("/logout", controller.logout);

module.exports = router;
