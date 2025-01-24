const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AppError = require("../utils/appError")

dotenv.config();


const protect = (req, res, next) => {
    const token = req.cookies[process.env.COOKIE_NAME];
  
    if (!token) {
      return res.status(401).json({ message: 'Please confrim your Auth' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid Token' });
    }
  };

  const restrictTo = (...roles) => {
      return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
          return next(new AppError('You do not have permission to perform this action', 403))
        }
        next();
      }
  }
  
  module.exports = { protect,restrictTo };