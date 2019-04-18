import { mapper } from 'porg'
import Joi from 'joi'

const ListedResearcher = (payload) => {
  const schema = Joi.object().keys({
    username: Joi.string(),
    name: Joi.string(),
    // interests: Joi.array().items(Joi.string()),
    avatar: Joi.string()
  }).required()
  return mapper(schema, payload)
}

export default ListedResearcher
