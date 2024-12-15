const ownerModel = require("../models/owner-model.js")
const bcrypt = require("bcryptjs")
const {
  generateToken
} = require("../utils/generateToken.js")


module.exports.createAdmin = async function(req, res) {
  let owner = await ownerModel.find()
  if (owner.length > 0) {
    return res.status(503).send("You don't have permission to create owner")
  }
  let {
    fullname,
    email,
    password
  } = req.body;

  bcrypt.genSalt(10, (err, salt)=> {
    bcrypt.hash(password, salt, async(err, hash)=> {
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password: hash
     })
      let token = generateToken(createdOwner)
      res.cookie("token", token)
      res.redirect("/owners/adminPanel")
    })
  })
}


module.exports.loginAdmin = async function(req, res) {
  let {
    email,
    password
  } = req.body;
  let owner = await ownerModel.findOne({
    email
  })
  if (!owner) {
    req.flash("error", "Unauthorized")
    return res.redirect("/owners/login")
  }
  bcrypt.compare(password, owner.password, (err, result)=> {
    if (result) {
      let token = generateToken(owner)
      res.cookie("token", token) 
      req.flash("success", "Successfully logged in")
      return res.redirect("/owners/adminPanel")
    }
    req.flash("error", "Wrong password")
    return res.redirect("/owners/login")
  })
}