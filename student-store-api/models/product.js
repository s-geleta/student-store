const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class Product {
  constructor(product) {
    this.id = product.id
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.image_url = product.image_url
    this.category = product.category
  }

  static async getAll() {
    const products = await prisma.product.findMany()
    return products.map(product => new Product(product))
  }

  static async getById(id) {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    })
    return new Product(product)
  }

  static async create(product) {
    const newProduct = await prisma.product.create({
      data: product,
    })
    return new Product(newProduct)
  }

  static async update(id, product) {
    const updatedProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: product,
    })
    return new Product(updatedProduct)
  }

  static async delete(id) {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    })
    return deletedProduct
  }
}

module.exports = Product;