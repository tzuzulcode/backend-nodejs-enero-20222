const express = require('express')
const Product = require('../services/products')

function products(app) {

  const router = express.Router()
  const productServ = new Product()

  app.use("/api/products", router)

  router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || undefined
    const limit = parseInt(req.query.limit) || undefined

    const products = await productServ.getAll(limit, page)
    return res.status(products.success ? 200 : 404).json(products)
  })

  router.post("/", async (req, res) => {
    const product = await productServ.create(req.body)

    return res.json(product)
  })

}

module.exports = products