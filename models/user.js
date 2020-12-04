const getDb = require("../util/database").getDb;

const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart; // {items : []}
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection("users").insertOne(this);
    }

    addToCart(product) {
        console.log(product._id);
        const existingProductIndex = this.cart.items.findIndex(
            (p) => p.productId.toString() === product._id.toString()
        );
        let newQuantity = 1;
        const updatedCartItem = [...this.cart.items];
        if (existingProductIndex >= 0) {
            newQuantity = this.cart.items[existingProductIndex].quantity + 1;
            updatedCartItem[existingProductIndex].quantity = newQuantity;
        } else {
            updatedCartItem.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity,
            });
        }
        const updatedCart = {
            items: updatedCartItem,
        };
        const db = getDb();
        return db
            .collection("users")
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );
    }

    getCart() {
        const db = getDb();
        const prodId = this.cart.items.map((i) => i.productId);
        return db
            .collection("products")
            .find({ _id: { $in: prodId } })
            .toArray()
            .then((products) => {
                return products.map((p) => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(
                            (i) => i.productId.toString() === p._id.toString()
                        ).quantity,
                    };
                });
            })
            .catch((err) => console.log(err));
    }

    deleteCartItem(productId) {
        const updatedCartItems = this.cart.items.filter(
            (cp) => cp.productId.toString() !== productId.toString()
        );

        const db = getDb();
        return db
            .collection("users")
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } }
            );
    }
    static findById(userId) {
        const db = getDb();
        return db.collection("users").findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;
