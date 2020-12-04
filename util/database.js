const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://MinhVu:aIRj3TWe2EQG6nzU@cluster0.jw0yt.mongodb.net/shop?retryWrites=true&w=majority"
    )
        .then((client) => {
            console.log("Connected");
            _db = client.db();
            callback();
        })
        .catch((err) => {
            console.log(err);
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    console.log("No database found!");
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
