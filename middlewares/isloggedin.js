const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model.js")
const ownerModel = require("../models/owner-model.js")


module.exports = async (req, res, next)=> {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first")
    res.redirect("/")
  } else {
    try {
      let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
      try{
      if (decoded) {
        let user = await userModel
        .findOne({
          email: decoded.email
        })
        .select("-password")
        if(user==null){
        req.flash("error", "No user found")
        res.redirect("/")
        }
        req.user = user;
        return next()
      } else {
        req.flash("error", "You need to login first")
        res.redirect("/")
      }
      }catch(err){
        console.log("Error is ",err)
        console.log("Error message is",err.message)
      }

    } catch (err) {
      req.flash("error", "Something went wrong")
      console.log(err.message)
      res.redirect("/")
    }
  }
}