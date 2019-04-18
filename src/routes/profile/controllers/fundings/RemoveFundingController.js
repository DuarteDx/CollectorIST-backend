const handler = async (request, h) => {
  // TODO
  return {}
}

const config = {
  description: 'Remove funding',
  plugins: {
    'porg-auth': {
      type: 'user-session',
      roles: ['user']
    }
  }
}

export default { handler, config }
