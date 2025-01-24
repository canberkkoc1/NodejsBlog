const express  = require('express');
const {createComment,updateComment,deleteComment} = require("../controllers/commentController")
const { protect ,restrictTo} = require('../middlewares/authMiddleware');
const { protectCommentOwner } = require('../middlewares/validationMiddleware');



const router = express.Router()


router.post("/:postId",protect,createComment)
router.put("/:commentId",protect,protectCommentOwner,updateComment)
router.delete("/:commentId",protect,protectCommentOwner,deleteComment)





module.exports = router