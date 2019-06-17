import RegisterCollectionService from '@/services/collections/RegisterCollectionService'

const handler = async (request, h) => {
  console.log(request.payload)
  return RegisterCollectionService(request.payload.title, request.params.token)
}

const config = {
  description: 'Register a new collection',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
      /* type: 'user-session',
      roles: ['user'] */
    }
  }
}

export default { handler, config }
