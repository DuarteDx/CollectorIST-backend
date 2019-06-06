import AddCollectionToUserService from '@/services/users/AddCollectionToUserService'

const handler = async (request, h) => {
  console.log(request.payload)
  return AddCollectionToUserService(request.params.token, request.params.istId, request.payload.newCollection)
}

const config = {
  description: 'Assign a new rank to a user',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
