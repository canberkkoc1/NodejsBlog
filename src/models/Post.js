const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide your title"],
    minLength: [8, "A title must have more or equal then 8 characters"],
    maxLength: [50, "A title must have more or equal then 50 characters"],
  },
  content: {
    type: String,
    required: [true, "Please provide your content"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  savedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

postSchema.virtual('comments', {
  ref: 'Comment',  // 'Comment' modeline referans
  localField: '_id',  // Post'un _id'si
  foreignField: 'post',  // Comment modelindeki 'post' alanıyla ilişkili
});

postSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "author",
      select: "username",
    },
    {
      path: "likes",
      select: "username",
    },
    {
      path: "savedBy",
      select: "username",
    },
    {
      path: "comments",
      select: "text",
      populate: {
        path: "user",
        select: "username",
      },
    }, 
  ]);

  next()
});


const Post = mongoose.model("Post", postSchema);

module.exports = Post;
