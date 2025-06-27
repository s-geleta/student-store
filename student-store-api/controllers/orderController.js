const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllOrders = async (req, res) => {
    try {

       
        const { customer } = req.query
        //fetching orders from database with the given filters
       
        const orders = await prisma.order.findMany({
            include: {
                orderItems: true,
            },
        });
        //sending the orders to the client
        console.log(orders)
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
        const { customer, totalPrice, status, orderItems } = req.body;


        //creating a new order in the database
        const order = await prisma.order.create({
            data: {
                customer: Number(customer),
                totalPrice: Number(totalPrice),
                status: status,
                orderItems: {
                    create: orderItems.map((item) => ({
                        productId: Number(item.productId),
                        quantity: Number(item.quantity),
                        price: Number(item.price),
                    })),
                },
            },
            include: {
                orderItems: true,
            },
        })
        //sending the order to the client
        return res.json(order)
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
        return res.status(500).json({ message: 'Server error' })
    }
}

exports.updateOrder = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        customer: Number(req.body.customer),
        totalPrice: Number(req.body.totalPrice),
        status: req.body.status,
      },
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Optional: check if the order exists
    const existing = await prisma.order.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete any related orderItems first if cascading is not set
    await prisma.orderItem.deleteMany({ where: { orderId: id } });

    // Then delete the order
    await prisma.order.delete({ where: { id } });

    res.json({ message: 'Order deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


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