import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import { errorHandler } from './middlewares'
import { productsRouter, userRouter } from './modules'
import app from './server'
import EV from './constants/ev'

// global middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())
app.use(cors({ origin: '*' }))

// routes
app.get('/', (req, res) => res.send('Hello World'))
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', userRouter)

// error handler
app.use(errorHandler)

app.listen(EV.PORT, () => {
  console.log(`Server is running on http://localhost:${EV.PORT}`)
})
