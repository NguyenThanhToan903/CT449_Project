const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/admin.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/admin-management", controller.accountManagement);
router.get("/welcome", controller.getAdmin);
router.post("/logout", controller.logout);
router.post("/check-email", controller.checkEmailExists);
router.get("/find-by-email/:email", controller.findByEmail);
router.get("/check-authentication", controller.checkAuthentication);
module.exports = router;
