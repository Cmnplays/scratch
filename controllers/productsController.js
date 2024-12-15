const productModel = require("../models/product-model.js")
const upload = require("../middlewares/multer-config.js")
const userModel = require("../models/user-model.js")

module.exports.createProduct = async(req, res)=> {
  try {
    let {
      productName,
      productPrice,
      discountPrice,
      bgColor,
      panelColor,
      textColor
    } = req.body;

    let productImage = req.file.filename;

    let product = await productModel.create({
      image: productImage,
      name: productName,
      price: productPrice,
      discount: discountPrice,
      bgColor: bgColor.toLowerCase(),
      panelColor: panelColor.toLowerCase(),
      textColor: textColor.toLowerCase()
    })
    req.flash("success", "Successfully created product")
    res.redirect("/owners/adminPanel")
  } catch (err) {
    console.log(err.message)
  }
}

module.exports.addtocart = async(req, res)=> {
  let productId = req.params.productId
  let user = await userModel.findOne({
    email: req.user.email
  })
  if (user.cart.includes(productId)) {
    req.flash("error","Already added this to cart")
    return res.redirect('/shop')
  }
  user.cart.push(productId)
  await user.save()
  req.flash("success", "Successfully added to cart")
  res.redirect("/shop")
}

module.exports.removeFromCart = async(req,res)=>{
  let productId = req.params.productId
  let user = await userModel.findOne({
    email: req.user.email
  })
  user.cart.pop(productId)
  await user.save()
  req.flash("success", "Successfully removed from cart")
  res.redirect("/users/cart")
}