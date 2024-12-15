const userModel = require("../models/user-model.js")
const bcrypt = require("bcryptjs")
const ownerModel = require("../models/owner-model.js")

const {
  generateToken
} = require("../utils/generateToken.js")

module.exports.register = async (req, res)=> {
  try {
    let {
      fullname,
      email,
      password
    } = req.body;
    if (!fullname && !email && !password) {
      req.flash("error", "Please provide all the required fields.")
      return res.redirect("/register")
    }
    let isUserExisting = await userModel.findOne({
      email
    })
    if (isUserExisting) {
      req.flash("error", "Account with this email is already registered")
      return res.redirect("/")
    } else {
      bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(password, salt, async(err, hash)=> {
          if (err) {
            return res.send(err.message)
          } else {
            let user = await userModel.create({
              fullname,
              email,
              password: hash
            })
            let token = generateToken(user)
            req.flash("success", "Successfully registered")
            res.cookie("token", token)
            return res.redirect("/shop")
          }
        })
      })
    }
  } catch (err) {
    res.send(err.message)
  }
}


module.exports.login = async(req, res)=> {
  let {
    email, password
  } = req.body;
  let user = await userModel.findOne({
    email
  })
  if (user) {
    bcrypt.compare(password, user.password, (err, result)=> {
      if (result) {
        let token = generateToken(user)
        req.flash("success", "Successfully logged in")
        res.cookie("token", token)
        res.redirect("/shop")
      } else {
        req.flash("error", "Wrong password")
        return res.redirect("/")
      }
    })
  } else {
    req.flash("error", "Something went wrong")
    res.redirect("/")
  }
}

module.exports.logout = (req, res)=> {
  res.cookie("token",
    "")
  req.flash("success",
    "Successfully logged out")
  res.redirect("/")
}

module.exports.showAccount = async(req, res)=> {
  let {
    email
  } = req.user
  let user = await userModel.findOne({
    email
  })
  if (user) {
    let success = req.flash("success")
    res.render("profile.ejs",
      {
        user,
        success
      })
  }
}

module.exports.showCart = async(req, res)=> {
  try {
    let user = await userModel.findOne({
      email: req.user.email
    }).populate("cart")
    let success = req.flash("success")
    res.render("cart.ejs",
      {
        user,
        success
      })
  }catch(err) {
    res.send(err.message)
  }
}
module.exports.showEditProfile = async(req, res)=> {
  let user = await userModel.findOne({
    email: req.user.email
  })
  res.render("editProfile.ejs",
    {
      user
    })
}

module.exports.editProfile = async (req, res)=> {
  let {
    fullname,
    email
  } = req.body;
  let profilePic;
  if (req.file && req.file.filename) {
    profilePic = req.file.filename;
  } else {
    profilePic = req.user.picture;
  }
  await userModel.findOneAndUpdate({
    email: req.user.email
  }, {
    fullname, email, picture: profilePic,
  })
  req.flash("success",
    "Successfully edited account details")
  res.redirect("/users/account")
}