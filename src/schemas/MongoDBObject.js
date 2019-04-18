import Joi from 'joi'

const MongoDBObject = Joi.object().keys({
  'id': Joi.string().required()
}).rename('_id', 'id')

export default MongoDBObject
