import ListLogsService from '@/services/logs/ListLogsService'

const handler = async (request, h) => {
  const logs = await ListLogsService()
  return logs
}

const config = {
  description: 'List logs',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
