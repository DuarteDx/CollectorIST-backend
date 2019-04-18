import { porg } from 'porg'
import CreateIndexesService from '@/services/indexes/CreateIndexesService'

const start = async () => {
  const server = await porg()
  await CreateIndexesService()
  server.start()
}
start()
