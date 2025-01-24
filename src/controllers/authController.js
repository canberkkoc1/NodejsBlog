const User = require("../models/User")
const jwt =require("jsonwebtoken")
const dotenv =require("dotenv")
const AppError = require("../utils/appError")

dotenv.config()


const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


const createSendToken = (user,statusCode,res) => {
    const token = signToken(user._id)

    const cookieOptions = {
        httpOnly: true, // Client-side JavaScript'e erişilemez
        secure: process.env.NODE_ENV === 'production', // HTTPS ortamında kullanılması için
        maxAge: process.env.COOKIE_EXPIRES_IN * 1000, // Cookie süresi (milisaniye cinsinden)

    }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

    res.cookie(process.env.COOKIE_NAME, token, cookieOptions)

    res.status(statusCode).json({
        status:"success",
    })
}


const singup = async (req,res) => {
    const newUser = await User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
    })

    createSendToken(newUser,201,res)
}


const login = async (req,res,next) => {
    const {email,password} = req.body

    if(!email || !password){
        return next(new AppError('Please provide email and password', 400))
    }


    const user = await User.findOne({email}).select('+password')

    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password', 401))
    }

    createSendToken(user,200,res)
}


const logout = async(req,res) => {
    res.clearCookie(process.env.COOKIE_NAME)

    res.status(200).json({
        status:"success",

    })
}


module.exports={
    login,
    logout,
    singup
}