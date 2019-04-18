import AddAffiliationService from '@/services/profile/AddAffiliationService'
import Joi from 'joi'
import { schema as DateObjectSchema } from '@/schemas/DateObjectSchema'

const handler = async (request, h) => {
  return AddAffiliationService({
    userId: request.getPrincipal().username,
    unitID: request.payload.unitID,
    start: request.payload.start,
    end: request.payload.end
  })
}

const config = {
  description: 'Add a new affiliation for the authenticated user',
  validate: {
    payload: {
      unitID: Joi.string().required(),
      start: DateObjectSchema.required(),
      end: DateObjectSchema.default(null)
    }
  },
  plugins: {
    'porg-auth': {
      type: 'user-session',
      roles: ['user']
    }
  }
}

export default {
  handler,
  config
}
