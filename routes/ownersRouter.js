const express = require("express")
const router = express.Router()
const {createAdmin,loginAdmin}=require("../controllers/adminController.js")
const isAdmin = require("../middlewares/isAdmin.js")
const ownerModel = require("../models/owner-model.js")

router.get("/adminPanel",isAdmin,(req,res)=>{
  let success = req.flash("success")
  res.render("adminPanel.ejs",{success})
})


//Code for admim creation
if (process.env.NODE_ENV==="development") {
  router.get("/create",(req,res)=>{
    const owner = ownerModel.findOne({})
    if(owner){
      req.flash("error","Owner has already been created")
      return res.redirect("/")
    }
    return res.render("createAdmin.ejs")
  })
  router.post("/create",createAdmin)
}


// Code For Admin Login
router.get("/login",(req,res)=>{
  let error = req.flash("error")
  res.render("loginAdmin.ejs",{error})
})
router.post("/login",loginAdmin)

module.exports = router;