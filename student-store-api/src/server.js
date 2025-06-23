require('dotenv').config()
const cors = require('cors')

const express = require('express')


const productsRouter = require('../routes/products')
const app = express()

/*const corsOption = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOption))*/
app.use(express.json())



const PORT = process.env.PORT || 3000



app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost: ${PORT}`)
})



