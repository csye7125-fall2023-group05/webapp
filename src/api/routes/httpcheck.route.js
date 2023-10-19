import express from 'express'
import {
  getAll,
  create,
  update,
  get,
  remove,
} from '../controllers/httpcheck.controller'
import { check } from 'express-validator'
import { httpStatusCodes } from '../../constants/responseCodes'
import { validationErrorHandler } from '../middlewares/errorHandler'

const router = express.Router()

router.get('/', getAll)
router.get(
  '/:id',
  check('id', 'Invalid id').isUUID().notEmpty(),
  validationErrorHandler,
  get
)

router.post(
  '/',
  check('name', 'name is a required field').isString().notEmpty(),
  check('uri', 'uri is a required field').isString().notEmpty(),
  check('is_paused', 'is_paused is a required field').isBoolean().notEmpty(),
  check('num_retries', 'num_retries is a required field')
    .isNumeric()
    .notEmpty(),
  check('num_retries', 'num_retries must be between 1 and 5').isInt({
    min: 0,
    max: 5,
  }),
  check('uptime_sla', 'uptime_sla is a required field').isNumeric().notEmpty(),
  check('uptime_sla', 'uptime_sla must be between 0 and 100').isInt({
    min: 0,
    max: 100,
  }),
  check('response_time_sla', 'response_time_sla is a required field')
    .isNumeric()
    .notEmpty(),
  check(
    'response_time_sla',
    'response_time_sla must be between 0 and 100'
  ).isInt({
    min: 0,
    max: 100,
  }),
  check('use_ssl', 'use_ssl is a required field').isBoolean().notEmpty(),
  check(
    'response_status_code',
    'response_status_code is a required field'
  ).isNumeric(),
  check(
    'response_status_code',
    'response_status_code must be a valid HTTP status code'
  ).isIn(httpStatusCodes),
  check(
    'check_interval_in_seconds',
    'check_interval_in_seconds is a required field'
  ).isNumeric(),
  check(
    'check_interval_in_seconds',
    'check_interval_in_seconds must be between 1 and 86400'
  ).isInt({
    min: 1,
    max: 86400,
  }),
  validationErrorHandler,
  create
)

router.put(
  '/:id',
  check('id', 'id is a required field').isUUID().notEmpty(),
  check('name', 'name is a required field').isString().notEmpty(),
  check('uri', 'uri is a required field').isString().notEmpty(),
  check('is_paused', 'is_paused is a required field').isBoolean().notEmpty(),
  check('num_retries', 'num_retries is a required field')
    .isNumeric()
    .notEmpty(),
  check('num_retries', 'num_retries must be between 1 and 5').isInt({
    min: 0,
    max: 5,
  }),
  check('uptime_sla', 'uptime_sla is a required field').isNumeric().notEmpty(),
  check('uptime_sla', 'uptime_sla must be between 0 and 100').isInt({
    min: 0,
    max: 100,
  }),
  check('response_time_sla', 'response_time_sla is a required field')
    .isNumeric()
    .notEmpty(),
  check(
    'response_time_sla',
    'response_time_sla must be between 0 and 100'
  ).isInt({
    min: 0,
    max: 100,
  }),
  check('use_ssl', 'use_ssl is a required field').isBoolean().notEmpty(),
  check(
    'response_status_code',
    'response_status_code is a required field'
  ).isNumeric(),
  check(
    'response_status_code',
    'response_status_code must be a valid HTTP status code'
  ).isIn(httpStatusCodes),
  check(
    'check_interval_in_seconds',
    'check_interval_in_seconds is a required field'
  ).isNumeric(),
  check(
    'check_interval_in_seconds',
    'check_interval_in_seconds must be between 1 and 86400'
  ).isInt({
    min: 1,
    max: 86400,
  }),
  validationErrorHandler,
  update
)

router.delete(
  '/:id',
  check('id', 'Invalid id').isUUID().notEmpty(),
  validationErrorHandler,
  remove
)

router.all('/', (req, res) => {
  res.sendStatus(405).json()
})

export { router as httpCheckRoute }
