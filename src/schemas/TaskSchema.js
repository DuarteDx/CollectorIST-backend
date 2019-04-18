import { mapper } from 'porg'
import MongoDBObject from '@/schemas/MongoDBObject'
import Joi from 'joi'

const schema = MongoDBObject.keys({
  type: Joi.string().valid(['deduplication', 'inconsistency']).required(),
  stakeholders: Joi.array().items(Joi.string()).min(1).required().strip(),
  target: Joi.object().required()
}).required()

const Task = (payload) => {
  return mapper(schema, payload)
}

export default { schema, Task }
