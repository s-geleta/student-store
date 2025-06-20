
const express = require('express')



const app = express()


app.use(express.json())
PORT = process.env.PORT || 3000

const productsRouter = require('./student-store-api/routes/products')
app.use('/products', productsRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})