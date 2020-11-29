const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(data);
            }
            const existingProduct = cart.products.find((p) => p.id === id);
            let updateProducts;
            if (existingProduct) {
                updateProducts = cart.products.map((product) =>
                    product.id === id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                );
                cart.products = [...updateProducts];
            } else {
                cart.products = [...cart.products, { id: id, quantity: 1 }];
            }
            cart.totalPrice = cart.totalPrice + + productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err.message);
            });
        });
    }

    static fetchCart(cb) {
        fs.readFile(p, (err, data) => {
            if(err){
                cb([]);
            }else{
                cb(JSON.parse(data));
            }
        })
    }
};
