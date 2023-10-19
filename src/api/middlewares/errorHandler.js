import { validationResult } from 'express-validator'
import logger from '../../configs/logger.config'
import { BadRequestError } from '../utils/error.util'

export const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500
  const errMessage = err.message || 'Something went wrong'
  const meta = {
    error: err.name,
    message: errMessage,
    data: err.data,
    // stack: err.stack,
  }
  res.status(errStatus).json(meta)
  logger.error(errMessage, meta)
}

export const validationErrorHandler = (req, res, next) => {
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty())
    throw new BadRequestError('Invalid request body', validationErrors.array())
  next()
}
