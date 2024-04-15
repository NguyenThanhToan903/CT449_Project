const express = require("express");
const router = express.Router();
require("dotenv").config();
const controller = require("../../controllers/admin/product.controller");

router.post("/create-product", controller.create);
router.get("/:id", controller.editPrint);
router.get("/", controller.getAll);
module.exports = router;
