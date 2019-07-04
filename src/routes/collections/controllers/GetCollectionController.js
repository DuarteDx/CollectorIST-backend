import GetCollectionService from '@/services/collections/GetCollectionService'

const handler = async (request, h) => {
  return GetCollectionService(request.params.id)
}

const config = {
  description: 'Get single collection',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
