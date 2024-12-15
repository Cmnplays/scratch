const jwt = require("jsonwebtoken")
const ownerModel = require("../models/owner-model.js")


module.exports = async (req, res, next)=> {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first")
    return res.redirect("/owners/login")
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
    let owner = await ownerModel.findOne({
      email: decoded.email
    })
    if (owner) {
      req.owner = owner;
      return next()
    }
    req.flash('error', 'Invalid or expired token,please relogin');
    return res.redirect('/owners/login');
  }catch(err) {
    console.error('JWT Verification Error:', err.message);
    req.flash('error', 'Invalid or expired token');
    return res.redirect('/owners/login');
  }
}