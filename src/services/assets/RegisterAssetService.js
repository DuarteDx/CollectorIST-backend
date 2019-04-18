import { Mongo } from 'porg'
import nanoId from 'nanoid'

export default async ({ author, asset }) => {
  let db = await Mongo.getDB()
  asset._id = nanoId()
  asset.author = author
  await db.collection('assets').insertOne(asset)
  return { id: asset._id }
}
