const Post = require('../model/postModel');

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    const post = new Post({title: title, content: content, createDate: new Date().toISOString()});

    post
        .save()
        .then(result => {
            res.status(201).json({
                message: "Thêm thành công bài viết mới rùi nè <3!",
                post: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })
}

exports.getAllPost = (req, res, next) => {
    Post
        .find()
        .then(result => {
            res.status(200).json({
                message: "Lấy thành công tất cả bài viết rùi nè <3!",
                posts: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })
}

exports.getById = (req, res, next) => {
    const idPost = req.params.idPost;

    Post
        .findById(idPost)
        .then(result => {
            if (!result) {
                const error = new Error('Không tìm thấy bài viết!');
                error.statusCode = 404;
                throw error;
            }
                
            res.status(200).json({
                message: "Lấy thành công bài viết rùi đó <3!",
                post: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })
}   

exports.updatePost = (req, res, next) => {
    const idPost = req.params.idPost;
    const titleUpdate = req.body.title;
    const contentUpdate = req.body.content;

    Post
        .findById(idPost)
        .then(post => {
            if(!post) {
                const error = new Error("Không tìm thấy bài viết rùi :((!")
                error.statusCode = 404;
                throw error;
            }

            post.title = titleUpdate;
            post.content = contentUpdate;
            return post.save();
        })
        .then(result => {
            res.status(200).json({
                message: "Cập nhật bài viết thành công rùi nè <3!",
                post: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })
}

exports.deletePost = (req, res, next) => {
    const idPost = req.params.idPost;

    Post
        .findById(idPost)
        .then(post => {
            if(!post) {
                const error = new Error("Không tìm thấy bài viết rùi :((!")
                error.statusCode = 404;
                throw error;
            }

            return Post.findByIdAndRemove(idPost);
        })
        .then(result => {
            res.status(200).json({
                message: "Đã xóa thành công bài viết rùi đó bé :)!"
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })
}