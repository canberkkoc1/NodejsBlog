const express =require("express")
const dotenv =require("dotenv")
const { singup,login,logout } = require("../controllers/authController")
const { protect } = require('../middlewares/authMiddleware');

dotenv.config()


const router = express.Router()


router.post("/signup",singup)
router.post("/signin",login)
router.post("/logout",protect,logout)


module.exports = router