const handler = async (request, h) => {
  // TODO
  return {}
}

const config = {
  description: 'Get a record attachment',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
