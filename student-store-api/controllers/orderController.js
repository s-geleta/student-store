const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllOrders = async (req, res) => {
    try {

       
        const { customerId } = req.query
        //fetching orders from database with the given filters
        const orders = await prisma.order.findMany({
            //filters by customerId
            where: {
                customer: Number(customerId),
            },
            //fetches the orderItems
            include: {
                orderItems: true,
            },
        })
        //sending the orders to the client
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.getOrderById = async (req, res) => {
    try {
        //fetching order from database by id
        const order = await prisma.order.findUnique({
            where: {
                id: Number(req.params.id),
            },
            include: {
                orderItems: true,
            },
        })
        //if order is not found, send a 404 error to the client
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
        //creating a new order in the database
        const order = await prisma.order.create({
            data: req.body,
        })
        //sending the order to the client
        res.json(order)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        //updating an order in the database
        const order = await prisma.order.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        })
        //sending the order to the client
        res.json(order)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
exports.deleteOrder = async (req, res) => {
    try {
        //deleting an order from the database
        await prisma.order.delete({
            where: {
                id: Number(req.params.id),
            },
        })
        //sending a message to the client
        res.json({ message: 'Order deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}   

exports.addOrderItem = async (req, res) => {
    try {
        //adding an orderItem to an order in the database
        const orderItem = await prisma.orderItem.create({
            data: req.body,
        })
        //sending the orderItem to the client
        res.json(orderItem)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.getOrderTotal = async (req, res) => {
    try {
        //gets id from the parms of the request
        const { id } = req.params
        //fetching order from database by id
        const order = await prisma.order.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                orderItems: true,
            },
        })
        //if order is not found, send a 404 error to the client
        if (!order) {
            res.status(404).json({ message: 'Order not found' })
        }
        //calculates the total price of the order
        const total = order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        res.json(total)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}   