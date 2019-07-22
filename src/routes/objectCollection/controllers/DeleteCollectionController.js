import DeleteCollectionService from '@/services/components/objectCollection/DeleteCollectionService'

const handler = async (request, h) => {
  return DeleteCollectionService(request.params.token, request.payload)
}

const config = {
  description: 'Delete collection from database',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
