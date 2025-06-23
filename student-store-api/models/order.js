
/*
const { PrismaClient } = require('@prisma/client')
const e = require('express')

const prisma = new PrismaClient()

class Order {
  constructor(order) {
    this.id = order.id
    this.customer = order.customer
    this.total_price = order.total_price
    this.status = order.status
    this.created_at = order.created_at
  }

  static async getAll(customerId) {
    const orders = await prisma.order.findMany({
      where: {
        customer: Number(customerId),
      },
      include: {
        orderItems: true,
      },
    })

    return orders.map(order => new Order(order))
  }

  static async getById(id) {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        orderItems: true,
      },
    })

    return order ? new Order(order) : null
  }

  static async create(order) {
    const newOrder = await prisma.order.create({
      data: order,
    })
    return new Order(newOrder)
  }

  static async update(id, order) {
    const updatedOrder = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: order,
    })
    return updatedOrder ? new Order(updatedOrder) : null
  }

  static async delete(id) {
    const deletedOrder = await prisma.order.delete({
      where: {
        id: Number(id),
      },
    })
    return deletedOrder ? new Order(deletedOrder) : null
  }
}

module.exports = Order; */