const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require("bcryptjs")



const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique:true,
        trim:true,
        minlenght:3,
        maxlength:15,
    },
    email:{
        type:String,
        required: [true, 'Please provide your email'],
        unique:true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [8, 'A password must have more or equal then 8 characters'],
        select: false //! This will not show the password in the output , this is for the security purpose
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
})


userSchema.pre('save',async function (next){
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password,12)

    // Delete password adter confirm
    
    /* 
    TODO 
    */
   next()
    
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}


const User = mongoose.model('User', userSchema)

module.exports = User;