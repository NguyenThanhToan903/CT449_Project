const express = require("express");
require("dotenv").config();
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/:id", controller.getProduct);
router.get("/", controller.getAll);
router.post("/:id/borrow", controller.borrowBook);
router.post("/:id/check", controller.checkBorrowBook);
router.get("/borrowed/:id", controller.borrowed);
router.put("/cancel/:id", controller.cancelBook);
module.exports = router;
