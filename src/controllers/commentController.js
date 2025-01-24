const Comment = require("../models/Comments");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");
const Post = require("../models/Post");

const createComment = catchAsyncError(async (req, res) => {
  const { text } = req.body;

  const userId = req.user.id;
  const { postId } = req.params;

  const newComment = new Comment({
    text,
    user: userId,
    post: postId,
  });

  await newComment.save();
  
  res.status(201).json({
    status: "success",
  });
});

const updateComment = catchAsyncError(async (req,res,next) => {
  const {text} = req.body
  const {commentId} = req.params


  const comment = await Comment.findById(commentId)

  if(!comment){
    return next(new AppError("Comment not found",404))
  }


  comment.text = text


  await comment.save()

  res.status(200).json({
    status: "success",
  });


})


const deleteComment = catchAsyncError(async (req,res,next) => {
  const {commentId} = req.params

  const deletedComment = await Comment.findByIdAndDelete(commentId)

  if(!deletedComment){
    return next(new AppError(" no comment found with that id",404))
  }

  return res.status(204).json({
    success:"success"
  })


})



module.exports = {
  createComment,
  updateComment,
  deleteComment
};


/*   const post = await Post.findById(postId);
  post.comments.push(newComment._id); 
  await post.save(); */