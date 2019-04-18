import { mapper } from 'porg'
import MongoDBObject from '@/schemas/MongoDBObject'
import Joi from 'joi'

const Unit = (payload) => {
  const schema = MongoDBObject.keys({
    acronym: Joi.string(),
    parentID: Joi.string(),
    name: Joi.string().required(),
    type: Joi.string(),
    email: Joi.string(),
    website: Joi.string(),
    bio: Joi.string(),
    hasSubUnits: Joi.boolean().default(false),
    path: Joi.array().items(Joi.object().keys({
      id: Joi.string().required(),
      acronym: Joi.string().required()
    })),
    stats: Joi.object().keys({
      researcherCount: Joi.number().integer().default(0),
      publicationCount: Joi.number().integer().default(0),
      scientificProduction: Joi.array().items(Joi.object().keys({
        year: Joi.number().integer().required(),
        quantity: Joi.number().integer().required()
      })).default([])
    }).default({ researcherCount: 0, publicationCount: 0, scientificProduction: [] })
  }).required()
  return mapper(schema, payload)
}

export default Unit
