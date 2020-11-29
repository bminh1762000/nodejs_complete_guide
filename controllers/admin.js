const Product = require("../models/product");

const create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
};

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: "",
    });
};

exports.postProduct = (req, res, next) => {
    const { title, description, price, imgUrl } = req.body;
    const product = new Product(
        create_UUID(),
        title,
        imgUrl,
        price,
        description
    );
    product.save();
    res.redirect("/");
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Product",
            path: "/admin/products",
        });
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.editing;
    const productId = req.params.productId;
    if (!editMode) {
        return res.redirect("/");
    }

    Product.findById(productId, (product) => {
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product,
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const { productId, title, imgUrl, price, description } = req.body;
    const product = new Product(productId, title, imgUrl, price, description);
    product.save();
    res.redirect("/admin/products");
};
