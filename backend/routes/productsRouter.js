const express = require("express")
const router = express.Router()
const upload=require("../middlewares/multer-config.js")
const {
  createProduct,addtocart,removeFromCart
}=require("../controllers/productsController.js")
const isloggedin = require("../middlewares/isloggedin.js")

router.post("/create",upload.single("productImage"),createProduct)
router.get("/addtocart/:productId",isloggedin,addtocart)
router.get("/removeFromCart/:productId",isloggedin,removeFromCart)


module.exports = router; 