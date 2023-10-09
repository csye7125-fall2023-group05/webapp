import express from 'express'
import { health } from '../controllers/health.controller'

const router = express.Router()

router.get('/healthz', health)

export { router as healthRoute }
