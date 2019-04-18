import DeleteRecordService from '@/services/records/DeleteRecordService'
import Joi from 'joi'

const handler = async (request, h) => {
  return DeleteRecordService({ id: request.params.id })
}

const config = {
  description: 'Delete an existing record',
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
