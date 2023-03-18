const Post = require('../model/blog');

exports.getPosts = (req, res, next) => {
    Post.findAll()
    .then(posts => {
        res.status(200).json({
            message: "Get data successfully!",
            posts: posts
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    })
}

exports.getPostId = (req, res, next) => {
    const id = req.params.id;
    Post.findByPk(id)
    .then(post => {
        if(!post) {
            const error = new Error('Không tìm thấy bài post!');
            error.statuscode = 404;
            throw error;
        }
        res.status(200).json({
            message: "Bài post đã được tìm thấy!",
            post: post
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    })
} 

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        createDate: new Date().toISOString()
    })
    post.save()
        .then(result => {
            res.status(200).json({
                message: "Thêm thành công bài post!",
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
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;

    Post.findByPk(id)
        .then(post => {
            if(!post) {
                const error = new Error("Không tìm thấy bài post!");
                error.statusCode = 404;
                throw error;
            }
            post.title = title;
            post.content = content;
            return post.save();
        })
        .then(result => {
            res.status(200).json({
                message: "Cập nhật bài post thành công!",
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
    const id = req.params.id;
    Post.findByPk(id)
        .then(post => {
            if(!post) {
                const error = new Error("Không tìm thấy bài post!");
                error.statusCode = 404;
                throw error;
            }
            return post.destroy();
        })
        .then(result => {
            res.status(200).json({
                message: "Xóa bài post thành công!"
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}