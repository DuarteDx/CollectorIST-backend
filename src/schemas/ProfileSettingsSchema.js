import { mapper } from 'porg'
import Joi from 'joi'
import MongoDBObjectSchema from '@/schemas/MongoDBObject'

const Profile = (payload) => {
  const schema = MongoDBObjectSchema.keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    website: Joi.string(),
    bio: Joi.object().keys({
      short: Joi.string(),
      extended: Joi.string()
    }),
    fos: Joi.object().keys({
      primary: Joi.string()
    }),
    interests: Joi.array().items(Joi.string())
  }).required()
  return mapper(schema, payload)
}

export default Profile
