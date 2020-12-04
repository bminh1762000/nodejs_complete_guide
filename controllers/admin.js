const Product = require("../models/product");

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
        title,
        imgUrl,
        price,
        description,
        null,
        req.user._id
    );
    product
        .save()
        .then((result) => {
            console.log("Create Product");
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Product",
                path: "/admin/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.editing;
    const productId = req.params.productId;
    if (!editMode) {
        return res.redirect("/");
    }
    Product.findById(productId)
        .then((product) => {
            if (!product) {
                return res.redirect("/");
            }
            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product,
            });
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const { productId, title, imgUrl, price, description } = req.body;
    const product = new Product(title, imgUrl, price, description, productId);
    product
        .save()
        .then((result) => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then((result) => {
            return req.user.deleteCartItem(prodId);
        })
        .then((result) => res.redirect("/admin/products"))
        .catch((err) => {
            console.log(err);
        });
};
