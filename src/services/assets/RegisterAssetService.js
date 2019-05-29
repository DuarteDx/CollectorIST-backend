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

  // Create log
  var log = {
    time: today,
    action: 'Register asset',
    asseId: asset._id,
    userId: 'ToDo',
    userName: 'ToDo2'
  }
  await db.collection('logs').insertOne(log)

  return 'Id of newly inserted asset: ' + asset._id
}
