import { porg } from 'porg'

const start = async () => {
  const server = await porg()
  server.start()
}
start()
