import ConfigureObjectIdentificationService from '@/services/components/objectIdentification/ConfigureObjectIdentificationService'

const handler = async (request, h) => {
  return ConfigureObjectIdentificationService(request.params.token, request.payload)
}

const config = {
  description: 'Add optional id',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
