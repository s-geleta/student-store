
const express = require('express')
const router = express.Router()
const Order = require('../models/order')

router.get('/', async (req, res) => {
    try{
        const {customerId} = req.query
        let orders = await Order.getAll(customerId)
        res.json(orders)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.getById(req.params.id)
        if(!order) {
            res.status(404).json({message: 'Order not found'})
        }
        
        res.json(order)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/', async (req, res) => {
    try {
        const order = await Order.create(req.body)
        res.json(order)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const order = await Order.update(req.params.id, req.body)
        res.json(order)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
})
 

router.delete('/:id', async (req, res) => {
    try {
        await Order.delete(req.params.id)
        res.json({message: 'Order deleted'})
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
})
 

module.exports = router