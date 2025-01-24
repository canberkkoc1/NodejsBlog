const Comment = require("../models/Comments");
const AppError = require("../utils/appError");

const protectCommentOwner = async (req,res,next) => {
    const {commentId} = req.params

    const comment = await Comment.findById(commentId)

    if (!comment) {
        return next(new AppError("Comment not found", 404)); // Yorum bulunamazsa 404 hatası
      }

      if (comment.user.toString() !== req.user.id) {
        return next(new AppError("You are not authorized to perform this action", 403)); // Yetkisiz işlem
      }

      next();
}


module.exports = {
    protectCommentOwner,
  };