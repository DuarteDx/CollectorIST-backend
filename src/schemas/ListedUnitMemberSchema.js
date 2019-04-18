import { mapper } from 'porg'
import Joi from 'joi'
import MongoDBObject from '@/schemas/MongoDBObject'

const ListedUnitMember = (payload) => {
  const schema = MongoDBObject.keys({
    id: Joi.string(),
    username: Joi.string(),
    name: Joi.string(),
    avatar: Joi.string()
  }).required()
  return mapper(schema, payload)
}

export default ListedUnitMember
