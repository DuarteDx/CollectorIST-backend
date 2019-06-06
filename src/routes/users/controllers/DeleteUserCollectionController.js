import DeleteUserCollectionService from '@/services/users/DeleteUserCollectionService'
// import Joi from 'joi'

const handler = async (request, h) => {
  return DeleteUserCollectionService(request.params.token, request.params.istId, request.params.collectionName)
}

const config = {
  description: 'Delete a collection associated to a user',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
