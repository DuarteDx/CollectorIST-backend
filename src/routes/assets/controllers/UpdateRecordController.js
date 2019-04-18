import UpdateRecordService from '@/services/records/UpdateRecordService'
import Joi from 'joi'

const handler = async (request, h) => {
  return UpdateRecordService({ record: request.payload, id: request.params.id })
}

const config = {
  description: 'Update an existing record',
  validate: {
    params: {
      id: Joi.string().required()
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
