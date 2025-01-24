const mongoose = require('mongoose');
const Post = require('./Post');




const commentsSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
    text:{
            type:String,
            required: [true, 'Please provide your comment'],
            minLength: [5, 'A title must have more or equal then 5 characters'],
            maxLength: [2500, 'A title must have more or equal then 250 characters'],
        },

},{
    timestamps: true // Yorumlar için oluşturulma ve güncellenme zamanlarını saklamak için
})


/* commentsSchema.post('save', async function (doc, next) {
    try {
        await Post.findByIdAndUpdate(doc.post, {
            $push: { comments: doc._id }, 
        });
        next();
    } catch (err) {
        next(err);
    }
}); */


const Comment = mongoose.model("Comment",commentsSchema)

module.exports = Comment