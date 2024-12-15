const express = require("express")
const router = express.Router()
const {
  register,login,logout,showAccount,showCart,showEditProfile,editProfile
}=require("../controllers/authController.js")
const isloggedin = require("../middlewares/isloggedin.js")
const upload = require("../middlewares/multer-config.js")

router.post("/register",register)
router.post("/login",login)
router.get("/logout",isloggedin,logout)
router.get("/account",isloggedin,showAccount)
router.get("/cart",isloggedin,showCart)
router.get("/editProfile",isloggedin,showEditProfile)
router.post("/editProfile",upload.single("profilePic"),isloggedin,editProfile)

module.exports = router;