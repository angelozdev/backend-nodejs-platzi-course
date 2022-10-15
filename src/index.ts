import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { errorsHandler } from './middlewares/errors-handler'
import { productsRouter } from './modules/products'
import app from './server'

const PORT = process.env.PORT || 3000

// global middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())

// routes
app.get('/', (req, res) => res.send('Hello World'))
app.use('/api/v1/products', productsRouter)

// error handler
app.use(errorsHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
