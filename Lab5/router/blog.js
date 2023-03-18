const express = require('express');
const controllerPost = require('../controller/blog');

const router = express.Router();

router.get('/blogs', controllerPost.getPosts);
router.get('/blogs/:id', controllerPost.getPostId);
router.post('/blog', controllerPost.createPost);
router.put('/blogs/:id', controllerPost.updatePost);
router.delete('/blogs/:id', controllerPost.deletePost);

module.exports = router;