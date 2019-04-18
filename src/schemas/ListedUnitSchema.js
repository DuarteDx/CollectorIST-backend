import { mapper } from 'porg'
import MongoDBObject from '@/schemas/MongoDBObject'
import Joi from 'joi'

const ListedUnit = (payload) => {
  const schema = MongoDBObject.keys({
    type: Joi.string().valid(['university', 'school', 'department', 'research-lab']),
    name: Joi.string()
  }).required()
  return mapper(schema, payload)
}

export default ListedUnit
