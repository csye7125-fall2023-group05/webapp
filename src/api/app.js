import express from 'express'
import { errorHandler } from './middlewares/errorHandler'
import { healthRoute } from './routes/index.routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('etag', 'strong')
app.use('/', healthRoute)
app.use(errorHandler)

export default app
