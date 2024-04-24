const express = require("express");
const router = express.Router();
require("dotenv").config();
const controller = require("../../controllers/admin/product.controller");

router.post("/create-product", controller.create);
router.get("/:id", controller.editPrint);
router.put("/:id", controller.editProduct);
router.post("/getBorrow", controller.getBorrow);
router.get("/", controller.getAll);
router.post("/setTimeBorrow", controller.createDayBorrow);
router.post("/confirm-borrow", controller.confirm);
router.post("/delete", controller.delete);
module.exports = router;
