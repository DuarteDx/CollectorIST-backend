import ConfigureObjectLocationService from '@/services/components/objectLocation/ConfigureObjectLocationService'

const handler = async (request, h) => {
  return ConfigureObjectLocationService(request.params.token, request.payload)
}

const config = {
  description: 'Configure object location from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
