import MongoDBObject from '@/schemas/MongoDBObject'
import Joi from 'joi'

const NormalizeObject = (payload) => {
  return Joi.validate(payload, MongoDBObject, { stripUnknown: false }).value
}

export default NormalizeObject
