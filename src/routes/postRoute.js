const express = require('express');
const { protect ,restrictTo} = require('../middlewares/authMiddleware');

const { 
    createPost ,
    getPostById,
     getAllPosts, 
     likePost,
    savePost ,
    updatePost,
    deletePost} = require('../controllers/postController')


const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id',protect, updatePost);
router.delete('/:id',protect, deletePost);
router.post('/:id/like',protect,likePost );
router.post('/:id/save', protect,savePost);


module.exports = router