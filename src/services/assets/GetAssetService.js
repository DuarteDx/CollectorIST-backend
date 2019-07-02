import { Mongo, errorWithKey } from 'porg'
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID

export default async (requestedAsset) => {
  console.log(requestedAsset)
  return jwt.verify(requestedAsset.token, 'secretKey', async (err, authData) => {
    console.log('inside jwt method')
    // AuthData contains all user info!!!! YEAAAAHH
    console.log(authData)
    // console.log(requestedAsset.token)
    console.log(err)
    if (err) {
      return '403 Forbidden!'
    } else {
      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' GET -> Single asset (id: ' + requestedAsset.id + ')')

      // Fetch data from DB
      const db = await Mongo.getDB()
      const asset = await db.collection('assets').findOne({ _id: ObjectId(requestedAsset.id) })
      if (!asset) {
        throw errorWithKey('asset-not-found', { ctx: requestedAsset.id })
      }

      return asset
    }
  })
}
