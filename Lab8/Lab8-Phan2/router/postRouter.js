const express = require('express');
const postController = require('../controller/postController');

const router = express.Router();

router.get('/blogs', postController.getAllPost);
router.post('/blog', postController.createPost);
router.get('/blogs/:idPost', postController.getById);
router.put('/blogs/:idPost', postController.updatePost);
router.delete('/blogs/:idPost', postController.deletePost);

module.exports = router;