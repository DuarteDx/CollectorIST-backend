import EditObjectCollectionService from '@/services/components/objectCollection/EditObjectCollectionService'

const handler = async (request, h) => {
  return EditObjectCollectionService(request.params.token, request.params.id, request.payload)
}

const config = {
  description: 'Edit object colelction from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
