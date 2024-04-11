const express = require("express");
require("dotenv").config();
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

// router.get("/", controller.index);
router.get("/:id", controller.getProduct);

module.exports = router;
