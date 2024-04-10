const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/userController");

router.post("/register", () => {
  resizeBy.json({ message: "hello" });
});
// router.post("/login", controller.login);

// router.get("/welcome", controller.getAdmin);

// router.get("/account-management", controller.accountManagement);

// router.post("/logout", controller.logout);

// router.post("/register", controller.create);

module.exports = router;
