const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product => GET
router.get("/products", adminController.getAdminProducts);

// /admin/product => POST
router.post("/add-product", adminController.postProduct);

// /admin/edit-product/:productId => GET
router.get("/edit-product/:productId", adminController.getEditProduct);

// /admin/edit-product/ => POST
router.post("/edit-product", adminController.postEditProduct);

// /admin/delete-product => POST
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
