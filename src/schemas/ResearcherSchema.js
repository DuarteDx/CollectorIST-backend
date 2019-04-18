import {
  mapper
} from 'porg'
import MongoDBObject from '@/schemas/MongoDBObject'
import Joi from 'joi'

const Researcher = (payload) => {
  if (payload.bio && payload.bio.extended) {
    payload.bio.extended = true
  }
  const schema = MongoDBObject.keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    avatar: Joi.string().required(),
    website: Joi.string(),
    title: Joi.string(),
    fos: Joi.object().keys({
      primary: Joi.string(),
      secondary: Joi.array().items(Joi.string())
    }),
    bio: Joi.object().keys({
      short: Joi.string(),
      extended: Joi.boolean()
    }),
    externalProfiles: Joi.object().keys({
      orcid: Joi.object().keys({
        id: Joi.string().required()
      }),
      scopus: Joi.object().keys({
        id: Joi.string().required()
      }),
      scienceDirect: Joi.object().keys({
        id: Joi.string().required()
      }),
      dblp: Joi.object().keys({
        id: Joi.string().required()
      })
    }),
    interests: Joi.array().items(Joi.string()).optional(), // FIXME, should be an object with id and title with translations
    stats: Joi.object().keys({
      scientificProduction: Joi.array().items(Joi.object().keys({
        year: Joi.number().integer().required(),
        quantity: Joi.number().integer().required()
      }))
    })
  }).required()
  return mapper(schema, payload)
}

export default Researcher
