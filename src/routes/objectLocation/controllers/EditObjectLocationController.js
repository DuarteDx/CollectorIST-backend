import EditObjectLocationService from '@/services/components/objectLocation/EditObjectLocationService'

const handler = async (request, h) => {
  return EditObjectLocationService(request.params.token, request.params.id, request.payload)
}

const config = {
  description: 'Edit object location from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
