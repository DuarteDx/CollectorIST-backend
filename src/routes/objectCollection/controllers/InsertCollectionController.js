import InsertCollectionService from '@/services/components/objectCollection/InsertCollectionService'

const handler = async (request, h) => {
  return InsertCollectionService(request.params.token, request.payload)
}

const config = {
  description: 'Insert new collection into database',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
