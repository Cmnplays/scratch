const express = require("express")
const router = express.Router()
const isloggedin = require("../middlewares/isloggedin.js")
const productModel = require("../models/product-model.js")
const userModel = require("../models/user-model.js")
const ownerModel=require("../models/owner-model.js")
const {login} = require("../controllers/authController.js")

router.get("/",(req,res)=>{
  let error = req.flash("error")
  let success = req.flash("success")
  res.render("index.ejs",{error,success})
})

router.get("/shop",isloggedin,async(req,res)=>{
  let success = req.flash("success")
  let error = req.flash("error")
  let products = await productModel.find()
  res.render("shop.ejs",{success,error,products})
})

module.exports = router;