import ConfigureObjectHistoryService from '@/services/components/objectHistory/ConfigureObjectHistoryService'

const handler = async (request, h) => {
  return ConfigureObjectHistoryService(request.params.token, request.payload)
}

const config = {
  description: 'Configure object history from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
