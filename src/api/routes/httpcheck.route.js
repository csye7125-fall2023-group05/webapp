import express from 'express'
import { getAll, create } from '../controllers/httpcheck.controller'

const router = express.Router()

router.get('/', getAll)
router.post('/', create)

router.all('/', (req, res) => {
  res.sendStatus(405).json()
})

export { router as httpCheckRoute }
