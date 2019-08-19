import EditGravurasService from '@/services/specificModules/pinturas/gravuras/EditGravurasService'

const handler = async (request, h) => {
  return EditGravurasService(request.params.token, request.params.id, request.payload.gravuras)
}

const config = {
  description: 'Edit gravuras module from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
