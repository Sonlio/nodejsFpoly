const Post = require('../model/post');

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    const post = new Post(title, content, new Date().toISOString());
    post
        .save()
        .then(result => {
            res.status(200).json({
                message: "Thêm bài viết thành công!",
                posts: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getAllPost = (req, res, next) => {
    Post
        .getAllPost()
        .then(result => {
            res.status(200).json({
                message: "Đã tìm thấy tất cả bài viết!",
                posts: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getById = (req, res, next) => {
    const idPost = req.params.idPost;

    Post
        .getById(idPost)
        .then(result => {
            res.status(200).json({
                message: "Đã tìm thấy bài viết!",
                post: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updatePost = (req, res, next) => {
    const idPost = req.params.idPost;
    const title = req.body.title;
    const content = req.body.content;

    Post
        .updatePost(idPost, {title: title, content: content})
        .then(result => {
            res.status(200).json({
                message: "Cập nhật bài viết thành công!"
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deletePost = (req, res, next) => {
    const idPost = req.params.idPost;

    Post
        .deletePost(idPost)
        .then(result => {
            res.status(200).json({
                message: "Xóa thành công bài viết!"
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}