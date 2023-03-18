const mongodb = require('mongodb');
const {getDB} = require('../config/connectDB');

module.exports = class Post {
    constructor(title, content, createDate) {
        this.title = title;
        this.content = content;
        this.createDate = createDate;
    }

    // Thêm bài viết mới
    save() {
        const db = getDB();
        return db
            .collection("posts")
            .insertOne(this)
            .then(result => {
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    static getAllPost() {
        const db = getDB();
        return db
            .collection("posts")
            .find()
            .toArray()
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static getById(idPost) {
        const db = getDB();
        return db
            .collection("posts")
            .find({_id: new mongodb.ObjectId(idPost)})
            .next()
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    static updatePost(idPost, dataUpdate) {
        const db = getDB();
        return db
            .collection("posts")
            .updateOne({_id: new mongodb.ObjectId(idPost)}, {$set: dataUpdate})
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deletePost(idPost) {
        const db = getDB();
        return db
            .collection("posts")
            .deleteOne({_id: new mongodb.ObjectId(idPost)})
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }
}
