import express from 'express'
import { errorHandler } from './middlewares/errorHandler'
import { healthRoute } from './routes/index.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', healthRoute)
app.all('*', (req, res) => {
  res.sendStatus(405).json()
})
app.use(errorHandler)

export default app
