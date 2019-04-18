import { Mongo, loadMigrationFile, logger } from 'porg'

export async function run () {
  const assets = loadMigrationFile({ filename: 'assets.json' })
  if (assets && !assets.length) {
    return
  }
  const db = await Mongo.getDB()
  await db.collection('assets').createIndex({ displayName: 'text' })
  var bulk = db.collection('assets').initializeUnorderedBulkOp()
  assets.forEach((r) => {
    bulk.find({ _id: r._id }).upsert().update({
      $set: { ...r }
    })
  })
  try {
    await bulk.execute()
    logger(['info', 'migration', 'populate-assets'], `Assets loaded successfully`)
  } catch (err) {
    logger(['err', 'migration', 'populate-assets'], err)
  }
}
