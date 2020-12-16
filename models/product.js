const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});


module.exports = mongoose.model('Product', productSchema);

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// module.exports = class Product {
//     constructor(title, imgUrl, price, description, id, userId ) {
//         this.title = title;
//         this.imgUrl = imgUrl;
//         this.price = price;
//         this.description = description;
//         this._id = id ? new mongodb.ObjectId(id) : null ;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let dbOb;
//         if (this._id) {
//             dbOb = db
//                 .collection("products")
//                 .updateOne({ _id: this._id }, { $set: this });
//         } else {
//             dbOb = db.collection("products").insertOne(this);
//         }
//         return dbOb;
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection("products").find().toArray();
//     }

//     static findById(productId) {
//         const db = getDb();
//         return db
//             .collection("products")
//             .find({ _id: new mongodb.ObjectId(productId) })
//             .next();
//     }

//     static deleteById(productId) {
//         const db = getDb();
//         return db
//             .collection("products")
//             .deleteOne({ _id: new mongodb.ObjectId(productId) });
//     }
// };
