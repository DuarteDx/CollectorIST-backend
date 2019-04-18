import { mapper } from 'porg'
import MongoDBObject from '@/schemas/MongoDBObject'
import Joi from 'joi'

const User = (payload) => {
  const schema = MongoDBObject.keys({
    userID: Joi.string(),
    username: Joi.string(),
    name: Joi.string().required(),
    avatar: Joi.string(),
    roles: Joi.array().items(Joi.string())
  }).required()
  return mapper(schema, payload)
}

export default User
