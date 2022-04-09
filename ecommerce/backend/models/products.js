const { mongoose } = require("../config/db")

const { Schema } = mongoose

const product = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  categories: String,
})

const Product = mongoose.model("Product", product)

module.exports = Product
