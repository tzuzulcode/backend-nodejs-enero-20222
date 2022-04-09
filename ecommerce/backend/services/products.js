const ProductModel = require('../models/products')


class Product {
  async getAll(limit = 10, page = 1) {
    const count = await ProductModel.count()

    console.log(limit, page)

    const pageNumbers = count / limit

    const totalPages = Math.round(pageNumbers) < pageNumbers ? Math.round(pageNumbers) + 1 : Math.round(pageNumbers);

    console.log(totalPages)

    if (page > totalPages) {
      return {
        success: false,
        message: "No existe la página especificada"
      }
    }

    const skip = (page - 1) * limit

    const products = await ProductModel.find().skip(skip).limit(limit)


    const nextPage = page === totalPages ? null : "/api/products?page=" + (page + 1)
    const prevPage = page === 1 ? null : "/api/products?page=" + (page - 1)
    return {
      success: true,
      data: products,
      total: count,
      page,
      nextPage,
      prevPage,
      totalPages
    }
  }

  async create(data) {
    const product = await ProductModel.create(data)
    return {
      success: true,
      data: product
    }
  }
}

module.exports = Product