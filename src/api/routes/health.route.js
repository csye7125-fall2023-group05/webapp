import express from 'express'
import { health } from '../controllers/health.controller'

const router = express.Router()

router.get('/healthz', health)
router.all('/healthz', (req, res) => {
  res.sendStatus(405).json()
})

export { router as healthRoute }
