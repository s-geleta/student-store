
const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')


router.get('/', orderController.getAllOrders)
router.get('/:id', orderController.getOrderById)
router.get('/:id/total', orderController.getOrderTotal)
router.post('/', orderController.createOrder)
router.post('/:id/items', orderController.addOrderItem)
router.put('/:id', orderController.updateOrder)
router.delete('/:id', orderController.deleteOrder)

module.exports = router



