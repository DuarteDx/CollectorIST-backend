import { mapper } from 'porg'
import Joi from 'joi'

const schema = Joi.object().keys({
  year: Joi.number().integer().min(1900),
  month: Joi.number().integer().min(1).max(12),
  day: Joi.number().integer().min(1).max(31)
}).allow(null)

const DateObject = (payload) => {
  return mapper(schema, payload)
}

export { schema, DateObject }
