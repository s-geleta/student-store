const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllOrderItems = async (req, res) => {
    try {
        const { orderId } = req.query
        const orderItems = await prisma.orderItem.findMany({
            where: {
                orderId: Number(orderId),
            },
        })
        res.json(orderItems)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.getOrderItemById = async (req, res) => {
    try {
        const orderItem = await prisma.orderItem.findUnique({
            where: {
                id: Number(req.params.id),
            },
        })
        if (!orderItem) {
            res.status(404).json({ message: 'Order item not found' })
        }
        res.json(orderItem)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}


exports.createOrderItem = async (req, res) => {
    try {
        const orderItem = await prisma.orderItem.create({
            data: req.body,
        })
        res.json(orderItem)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.updateOrderItem = async (req, res) => {
    try {
        const orderItem = await prisma.orderItem.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        })
        res.json(orderItem)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
exports.deleteOrderItem = async (req, res) => {
    try {
        await prisma.orderItem.delete({
            where: {
                id: Number(req.params.id),
            },
        })
        res.json({ message: 'Order item deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}   

exports.addOrderItem = async (req, res) => {
    try {
        const orderItem = await prisma.orderItem.create({
            data: req.body,
        })
        res.json(orderItem)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}   