const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.get("/:id", controller.editPrint);
router.post("/create", controller.create);
router.put("/:id", controller.delete);
router.put("/update/:id", controller.update);

module.exports = router;
