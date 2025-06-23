const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//fetching products form database
exports.getAllProducts = async (req, res) => {
    try {
        const { category, sortBy } = req.query
        const where = {}
        const orderBy = []

        //filtering by category if category is not null
        if (category) {
            where.category = {
                contains: category,
                mode: 'insensitive'
            }
        }

        //sorts by price or name if sortBy is price or name
        if (sortBy === 'price' || sortBy === 'name') {
            orderBy.push({ [sortBy]: 'asc' })
        } else if (sortBy === '-price') {
            orderBy.push({ price: 'desc' })
        } else if (sortBy === '-name') {
            orderBy.push({ name: 'desc' })
        }
        
        //fetching products from database with the given filters
        const products = await prisma.product.findMany({
            where,
            orderBy,
        })

        //sending the products to the client
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}


    exports.getProductById = async (req, res) => {
        //finds product from database by id
        try {
            const product = await prisma.product.findUnique({
                where: {
                    id: Number(req.params.id),
                },
            })
            //if product is not found, send a 404 error to the client
            if (!product) {
                res.status(404).json({ message: 'Product not found' })
            }
            //sending the product to the client
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    }
    exports.createProduct = async (req, res) => {
        try {
            //creating a new product in the database
            const product = await prisma.product.create({
                data: req.body,
            })
            //sending the product to the client
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    }

    exports.updateProduct = async (req, res) => {
        try {
            //updating a product in the database
            const product = await prisma.product.update({
                where: {
                    id: Number(req.params.id),
                },
                data: req.body,
            })
            //sending the product to the client
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    }    
    exports.deleteProduct = async (req, res) => {
        try {
            //deleting a product from the database
            await prisma.product.delete({
                where: {
                    id: Number(req.params.id),
                },
            })
            //sending a message to the client
            res.json({ message: 'Product deleted' })
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    } 