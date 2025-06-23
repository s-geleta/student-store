require('dotenv').config()
const cors = require('cors')

const express = require('express')


const productsRouter = require('../routes/products')
const orderRouter = require('../routes/orders')
const orderItemRouter = require('../routes/orderItems')
const app = express()

/*const corsOption = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOption))*/
app.use(express.json())



const PORT = process.env.PORT || 3000



app.use('/products', productsRouter)
app.use('/orders', orderRouter)
app.use('/orderItems', orderItemRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})



