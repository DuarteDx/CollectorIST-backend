import UpdateProfileService from '@/services/profile/UpdateProfileService'
import Joi from 'joi'

const handler = async (request, h) => {
  const updatedProfile = request.payload
  await UpdateProfileService({ userId: request.getPrincipal().username, updatedProfile })
  return {}
}

const config = {
  description: 'Update user profile',
  validate: {
    payload: {
      name: Joi.string(),
      username: Joi.string(),
      website: Joi.string(),
      bio: Joi.object().keys({
        short: Joi.string(),
        extended: Joi.string()
      }),
      fos: Joi.object().keys({
        primary: Joi.string()
      }),
      interests: Joi.array().items(Joi.string()),
      email: Joi.string().email(),
      locale: Joi.string(),
      aliases: Joi.array().items(Joi.object().keys({
        value: Joi.string().required(),
        origin: Joi.string().valid(['orcid', 'scopus', 'manual']).required()
      })).default([]),
      completeWizard: Joi.boolean().default(false)
    }
  },
  plugins: {
    'porg-auth': {
      type: 'user-session',
      roles: ['user']
    }
  }
}

export default { handler, config }
