require('dotenv').config()
const cors = require('cors')

const express = require('express')
const morgan = require('morgan')


const productsRouter = require('../routes/products')
const orderRouter = require('../routes/orders')
const orderItemRouter = require('../routes/orderItems')
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))



const PORT = process.env.PORT || 3000



app.use('/products', productsRouter)
app.use('/orders', orderRouter)
app.use('/orderItems', orderItemRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})



