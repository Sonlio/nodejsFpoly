const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

MongoClient.connect("mongodb://127.0.0.1:27017/lab8")
  .then((client) => {
    _db = client.db();
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found";
};

module.exports = { getDB }