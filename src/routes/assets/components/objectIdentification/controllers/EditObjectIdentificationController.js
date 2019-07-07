import EditObjectIdentificationService from '@/services/components/objectIdentification/EditObjectIdentificationService'

const handler = async (request, h) => {
  return EditObjectIdentificationService(request.params.token, request.params.id, request.payload)
}

const config = {
  description: 'Edit object identification from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
