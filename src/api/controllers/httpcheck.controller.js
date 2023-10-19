import service from '../services/httpcheck.service'
import {
  BadRequestError,
  ResourceNotFoundError,
  ServiceUnavailableError,
} from '../utils/error.util'

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
 * `get` controller for GET `/v1/http-check/:id` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 200 OK, 404 Resource Not Found, 503 Service Unavailable
 */
export const get = async (req, res, next) => {
  try {
    const httpCheck = await service.findById(req.params.id)
    if (!httpCheck) throw new ResourceNotFoundError(`HttpCheck not found`)

    return res.status(200).json(httpCheck)
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

/**
 * `update` controller for PUT `/v1/http-check/:id` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 204 No Content, 400 Bad Request, 503 Service Unavailable
 */
export const update = async (req, res, next) => {
  try {
    const updatedHttpCheck = await service.update(req.params.id, req.body)
    if (!updatedHttpCheck) throw new ServiceUnavailableError()

    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

/**
 * `remove` controller for DELETE `/v1/http-check/:id` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 204 No Content, 400 Bad Request, 503 Service Unavailable
 */
export const remove = async (req, res, next) => {
  try {
    const deletedCount = await service.remove(req.params.id)
    if (!deletedCount) throw new BadRequestError("HttpCheck doesn't exist")

    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
