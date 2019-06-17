import DeleteCollectionService from '@/services/collections/DeleteCollectionService'
// import Joi from 'joi'

const handler = async (request, h) => {
  console.log(request.payload)
  return DeleteCollectionService(request.params.token, request.params.id)
}

const config = {
  description: 'Delete a collection',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
