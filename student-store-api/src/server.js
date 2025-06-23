require('dotenv').config()

//importing cors and express and morgan
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

//importing routes for products, orders, and orderItems
const productsRouter = require('../routes/products')
const orderRouter = require('../routes/orders')
const orderItemRouter = require('../routes/orderItems')


//setting up the express app
const app = express()

//enabling cors
const corsOptions = {
    origin: 'http://localhost:5173',
};


//enabling cors, json parsing, and logging
app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))


//setting the port
const PORT = process.env.PORT || 3000


//directs which routes to which routers based on the path
app.use('/products', productsRouter)
app.use('/orders', orderRouter)
app.use('/orderItems', orderItemRouter)


//starting the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})



