import EditPinturasService from '@/services/specificModules/pinturas/EditPinturasService'

const handler = async (request, h) => {
  return EditPinturasService(request.params.token, request.params.id, request.payload.pinturas)
}

const config = {
  description: 'Edit pinturas module from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
