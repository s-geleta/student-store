const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllOrderItems = async (req, res) => {
    //fetching orderItems from database
    try {
        const { orderId } = req.query
        const orderItems = await prisma.orderItem.findMany({
            //filters by orderId
            where: {
                orderId: Number(orderId),
            },
        })
        //sending the orderItems to the client
        res.json(orderItems)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.getOrderItemById = async (req, res) => {
    try {
        //fetching orderItem from database by id
        const orderItem = await prisma.orderItem.findUnique({
            //filters by id
            where: {
                id: Number(req.params.id),
            },
        })
        //if orderItem is not found, send a 404 error to the client
        if (!orderItem) {
            res.status(404).json({ message: 'Order item not found' })
        }
        //sending the orderItem to the client
        res.json(orderItem)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

//creating an orderItem in the database
exports.createOrderItem = async (req, res) => {
    try {
        //data from the request body
        const orderItem = await prisma.orderItem.create({
            data: req.body,
        })
        //sending the orderItem to the client
        res.json(orderItem)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

exports.updateOrderItem = async (req, res) => {
    try {
        //updating an orderItem in the database
        const orderItem = await prisma.orderItem.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        })
        //sending the orderItem to the client
        res.json(orderItem)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
exports.deleteOrderItem = async (req, res) => {
    try {
        //deleting an orderItem from the database
        await prisma.orderItem.delete({
           //filters by id
            where: {
                id: Number(req.params.id),
            },
        })
        //sending a message to the client stating that the orderItem was deleted
        res.json({ message: 'Order item deleted' })
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