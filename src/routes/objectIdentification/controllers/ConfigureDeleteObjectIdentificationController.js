import ConfigureDeleteObjectIdentificationService from '@/services/components/objectIdentification/ConfigureDeleteObjectIdentificationService'

const handler = async (request, h) => {
  return ConfigureDeleteObjectIdentificationService(request.params.token, request.payload)
}

const config = {
  description: 'Delete optional id',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
