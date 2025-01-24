const express =require('express')
const cookieParser =require('cookie-parser');
const authRoute = require("./src/routes/authRoute")
const postRoute = require("./src/routes/postRoute")
const globalErrorHandler = require('./src/controllers/errorController')
const AppError = require("./src/utils/appError")
const commentRoute = require("./src/routes/commentsRoute")


const app = express()

// Middlewares
app.use(express.json()); // JSON verisini işleme
app.use(cookieParser()); // Cookie'leri işleme


app.use("/api/v1/users",authRoute)
app.use("/api/v1/post",postRoute)
app.use("/api/v1/comments",commentRoute)


app.all("*", (req, res, next) => {
    /* const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.status = "fail";
    err.statusCode = 404; */
    
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


app.use(globalErrorHandler)

module.exports = app