import DeleteCollectionService from '@/services/collections/DeleteCollectionService'
// import Joi from 'joi'

const handler = async (request, h) => {
  return DeleteCollectionService({
    id: request.payload.id
  })
}

const config = {
  description: 'Delete an collections',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
