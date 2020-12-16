const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    resetToken : String,
    resetTokenExpiration : Date,
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
});

userSchema.methods.addToCart = function (product) {
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
            productId: product._id,
            quantity: newQuantity,
        });
    }
    const updatedCart = {
        items: updatedCartItem,
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.deleteCartItem = function (productId) {
    const updatedCartItems = this.cart.items.filter(
        (item) => item.productId.toString() !== productId.toString()
    );
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};

module.exports = mongoose.model("User", userSchema);
