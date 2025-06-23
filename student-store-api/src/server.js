const express = require('express')
const morgan = require('morgan')


const app = express()


app.use(morgan('dev'))
app.use(express.json())


const PORT = process.env.PORT || 3000

const productsRouter = require('../routes/products')


app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})

