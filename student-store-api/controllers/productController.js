const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.getAllProducts = async (req, res) => {
    try {
        const { category, sortBy } = req.query
        const where = {}
        const orderBy = []

        if (category) {
            where.category = {
                contains: category,
                mode: 'insensitive'
            }
        }

        if (sortBy === 'price' || sortBy === 'name') {
            orderBy.push({ [sortBy]: 'asc' })
        } else if (sortBy === '-price') {
            orderBy.push({ price: 'desc' })
        } else if (sortBy === '-name') {
            orderBy.push({ name: 'desc' })
        }

        const products = await prisma.product.findMany({
            where,
            orderBy,

        })
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

    exports.getProductById = async (req, res) => {
        try {
            const product = await prisma.product.findUnique({
                where: {
                    id: Number(req.params.id),
                },
            })
            if (!product) {
                res.status(404).json({ message: 'Product not found' })
            }
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    }
    exports.createProduct = async (req, res) => {
        try {
            const product = await prisma.product.create({
                data: req.body,
            })
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    }

    exports.updateProduct = async (req, res) => {
        try {
            const product = await prisma.product.update({
                where: {
                    id: Number(req.params.id),
                },
                data: req.body,
            })
            res.json(product)
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    }    
    exports.deleteProduct = async (req, res) => {
        try {
            await prisma.product.delete({
                where: {
                    id: Number(req.params.id),
                },
            })
            res.json({ message: 'Product deleted' })
        } catch (error) {
            res.status(500).json({ message: 'Server error' })
        }
    } 