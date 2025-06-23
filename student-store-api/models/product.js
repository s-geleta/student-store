/*const { PrismaClient } = require('@prisma/client')
const e = require('express')

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

  static async getAll(category, sortBy) {
    const where = {}
    const orderBy = []

    if (category) {
      where.category = {
        contains: category,
        mode: 'insensitive'
      }}
    

    if (sortBy === 'price' || sortBy === 'name') {
      orderBy.push({[sortBy]: 'asc'})
    } else if (sortBy === '-price') {
      orderBy.push({price: 'desc'})
    }else if (sortBy === '-name') {
      orderBy.push({name: 'desc'})
    }
    
    const products = await prisma.product.findMany({
        where,
        orderBy,

    }  
    )
    return products.map(product => new Product(product))

  }

  static async getById(id) {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    })
    return product ? new Product(product) : null
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
        id: Number(id),
      },
      data: product,
    })
    return updatedProduct ? new Product(updatedProduct) : null
  }

  static async delete(id) {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    })
    return deletedProduct ? new Product(deletedProduct) : null
  }
}

module.exports = Product; */