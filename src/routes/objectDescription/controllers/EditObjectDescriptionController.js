import EditObjectDescriptionService from '@/services/components/objectDescription/EditObjectDescriptionService'

const handler = async (request, h) => {
  return EditObjectDescriptionService(request.params.token, request.params.id, request.payload)
}

const config = {
  description: 'Edit object description from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
