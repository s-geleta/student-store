const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
  const products = await Product.getAll()
  res.json(products)
})

router.get('/:id', async (req, res) => {
  const product = await Product.getById(req.params.id)
  res.json(product)
})

router.post('/', async (req, res) => {
  const product = await Product.create(req.body)
  res.json(product)
})

router.put('/:id', async (req, res) => {
  const product = await Product.update(req.params.id, req.body)
  res.json(product)
})

router.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.delete(req.params.id)
  res.json(deletedProduct)
})

module.exports = router 