import { Mongo, loadMigrationFile, logger } from 'porg'

export async function run () {
  const collections = loadMigrationFile({ filename: 'collections.json' })
  if (collections && !collections.length) {
    return
  }
  const db = await Mongo.getDB()
  await db.collection('collections').createIndex({ displayName: 'text' })
  var bulk = db.collection('collections').initializeUnorderedBulkOp()
  collections.forEach((r) => {
    bulk.find({ _id: r._id }).upsert().update({
      $set: { ...r }
    })
  })
  try {
    await bulk.execute()
    logger(['info', 'migration', 'populate-collections'], `Collections loaded successfully`)
  } catch (err) {
    logger(['err', 'migration', 'populate-collections'], err)
  }
}
