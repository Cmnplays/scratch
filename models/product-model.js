const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0
    },
    bgColor: {
      type: String,
      default: "red"
    },
    panelColor: {
      type: String,
      default: "blue"
    },
    textColor: {
      type: String,
      default: "green"
    }
  })
  module.exports = mongoose.model("product", productSchema)