import { Mongo } from 'porg'
import nanoId from 'nanoid'

export default async ({ asset }) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' POST -> Insert single asset (title: ' + asset.title + ')')

  // Insert asset into DB
  let db = await Mongo.getDB()
  asset._id = nanoId()
  await db.collection('assets').insertOne(asset)

  return 'Id of newly inserted asset: ' + asset._id
}
