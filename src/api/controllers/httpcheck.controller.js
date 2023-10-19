import service from '../services/httpcheck.service'
import { ServiceUnavailableError } from '../utils/error.util'

/**
 * `getAll` controller for GET `/v1/http-check` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 200 OK, 503 Service Unavailable
 */
export const getAll = async (req, res, next) => {
  try {
    const httpChecks = await service.getAll()
    if (!httpChecks) throw new ServiceUnavailableError()

    return res.status(200).json(httpChecks)
  } catch (error) {
    next(error)
  }
}

/**
 * `create` controller for POST `/v1/http-check` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 201 Created, 400 Bad Request, 503 Service Unavailable
 */
export const create = async (req, res, next) => {
  try {
    const httpCheck = await service.create(req.body)
    if (!httpCheck) throw new ServiceUnavailableError()

    return res.status(201).json(httpCheck)
  } catch (error) {
    next(error)
  }
}
