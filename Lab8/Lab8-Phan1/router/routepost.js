const express = require('express');
const router = express.Router();
const controllerPost = require('../controller/postController');

router.get('/posts', controllerPost.getAllPost);
router.post('/post', controllerPost.createPost);
router.get('/posts/:idPost', controllerPost.getById);
router.put('/posts/:idPost', controllerPost.updatePost);
router.delete('/posts/:idPost', controllerPost.deletePost);

module.exports = router;