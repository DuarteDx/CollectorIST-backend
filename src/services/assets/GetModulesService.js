import { Mongo } from 'porg'

export default async (id) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> Assets modules')

  // Fetch data from DB
  const db = await Mongo.getDB()
  const modules = await db.collection('modules').find({}).toArray()
  if (!modules) {
    return 'Requested modules are not in database!'
  }

  return modules
}
