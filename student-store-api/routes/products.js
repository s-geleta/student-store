const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
  const products = await Product.getAll()
  res.json(products)
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.getById(req.params.id)
        if(!product) {
            res.status(404).json({message: 'Product not found'})
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.json(product)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.update(req.params.id, req.body)
        res.json(product)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})
 

router.delete('/:id', async (req, res) => {
    try {
        await Product.delete(req.params.id)
        res.json({message: 'Product deleted'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})
 

module.exports = router 