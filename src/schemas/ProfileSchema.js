import { mapper } from 'porg'
import Joi from 'joi'
import MongoDBObjectSchema from '@/schemas/MongoDBObject'

const Profile = (payload) => {
  const schema = MongoDBObjectSchema.keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    locale: Joi.string().default('en'),
    roles: Joi.array().items(Joi.string()).required(),
    wizardState: Joi.object().keys({
      completed: Joi.boolean(),
      step: Joi.number().integer()
    })
  }).required()
  return mapper(schema, payload)
}

export default Profile
