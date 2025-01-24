const Post = require('../models/Post')
const User = require('../models/User')
const catchAsyncError = require('../utils/catchAsyncError')
const AppError = require("../utils/appError")




const createPost = catchAsyncError(async(req,res) => {

    const {title,content} = req.body
    const userId = req.user.id

    const newPost = new Post({
        title,
        content,
        author:userId
    })
        await newPost.save()
    
        
        res.status(201).json({
            satatus:'success',
        })
})


const getAllPosts = catchAsyncError( async (req,res) => {
    const allPosts = await Post.find().sort({ createdAt: -1 })
    res.status(200).json({
        status:'success',
        data:allPosts
    })
})


const getPostById = catchAsyncError(async (req,res) => {
    const {id} = req.params

    const post = await Post.findById(id)

    if(!post){
        return res.status(404).json({
            message:"Post not find"
        })
    }

    res.status(200).json({
        status:"success",
        data:{
            post
        }
    })
})


const updatePost = catchAsyncError(async (req,res,next) => {
    
    const {id} = req.params


    const postUpdated = await Post.findByIdAndUpdate(id,req.body,{
        new:true
    })

    if(!postUpdated){
        return next(new AppError('No tour found with that ID', 404))
    }

    const allposts = await Post.find()

    return res.status(200).json({
        success:"success",
        data:{
            posts:allposts
        }
    })

})


const deletePost = catchAsyncError(async (req,res,next) => {
    const {id} = req.params


    const post = await Post.findById(id)

    if (!post) {
        return next(new AppError("No post found with that id", 404));
      }

      if(post.author.id !== req.user.id){
        return next(new AppError("You do not have permission to delete this post", 403));
      }

    const deletedPost = await Post.findByIdAndDelete(id)

    if(!deletedPost){
        return next(new AppError(" no post found with that id",404))
    }

    res.status(204).json({
        status: "Success",
        data: null,
      });
})


const likePost = catchAsyncError(async(req,res) => {
    const {id} = req.params

    // get user from authmiddleware
    const userId = req.user.id

    const post = await Post.findById(id)

    if(!post){
        return res.status(404).json({
            message:"Post not find"
        })
    }

    
    // check the if user like the post 
    const likeIndex = post.likes.findIndex(like => like._id.toString() === userId);
    
    if(likeIndex !== -1){
        
        post.likes.splice(likeIndex,1)
        
        await post.save()
        
        return res.status(200).json({
            message:"likes removed"
        })
    }
    
    post.likes.push({
        _id:userId
    })
    
    await post.save()
    
    return res.status(200).json()
})


const savePost = catchAsyncError(async (req,res) => {
    const {id} = req.params
    
    const userId = req.user.id
    
    const post = await Post.findById(id)
    
    if(!post){
        return res.status(404).json({
            message:"Post not find"
        })
    }

    // check the user saved the post before

    const savedIndex = post.savedBy.findIndex(saved => saved._id.toString() === userId)

    if(savedIndex !== -1) {
        post.savedBy.splice(savedIndex,1)

        await post.save()

        return res.status(200).json({
            message:"Saved successfully remove",
            post
        })
    }


    post.savedBy.push(userId)

    await post.save()


    res.status(200).json({
        message:"post save success"
    })
})






module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    likePost,
    savePost,
    updatePost,
    deletePost
}