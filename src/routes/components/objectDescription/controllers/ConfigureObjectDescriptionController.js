import ConfigureObjectDescriptionService from '@/services/components/objectDescription/ConfigureObjectDescriptionService'

const handler = async (request, h) => {
  return ConfigureObjectDescriptionService(request.params.token, request.payload)
}

const config = {
  description: 'Configure object description from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
