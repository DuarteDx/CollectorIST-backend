import GetUserCollectionsService from '@/services/components/objectCollection/GetUserCollectionsService'

const handler = async (request, h) => {
  return GetUserCollectionsService(request.params.token)
}

const config = {
  description: 'Get user collections from database',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
