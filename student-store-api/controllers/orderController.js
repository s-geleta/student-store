const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllOrders = async (req, res) => {
    try {
        const { customerId } = req.query
        const orders = await prisma.order.findMany({
            where: {
                customer: Number(customerId),
            },
            include: {
                orderItems: true,
            },
        })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(req.params.id),
            },
            include: {
                orderItems: true,
            },
        })
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        res.json(order)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.createOrder = async (req, res) => {
    try {
        const order = await prisma.order.create({
            data: req.body,
        })
        res.json(order)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const order = await prisma.order.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        })
        res.json(order)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
exports.deleteOrder = async (req, res) => {
    try {
        await prisma.order.delete({
            where: {
                id: Number(req.params.id),
            },
        })
        res.json({ message: 'Order deleted' })
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

exports.getOrderTotal = async (req, res) => {
    try {
        const { id } = req.params
        const order = await prisma.order.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                orderItems: true,
            },
        })
        if (!order) {
            res.status(404).json({ message: 'Order not found' })
        }
        const total = order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        res.json(total)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}   