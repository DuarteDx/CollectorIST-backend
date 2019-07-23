import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID

export default async (assetId, token) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      console.log('403 Unauthorized!')
      return false
    } else {
      var decodedToken = jwtDecode(token)
      if (!decodedToken.newUserToken2.role.admin && !decodedToken.newUserToken2.role.editor) {
        console.log('Not editor nor admin!')
        return false
      }

      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' GET -> Can ' + decodedToken.newUserToken2.username + ' edit asset ' + assetId + ' ?')
      console.log('\n')

      // Check if admin
      if (decodedToken.newUserToken2.role.admin) {
        return true
      }

      // Otherwise check if user is editor and can edit respective collection

      // Define DB
      const db = await Mongo.getDB()

      // Get asset collection
      const asset = await db.collection('assets').findOne(
        { _id: ObjectId(assetId) }
      )
      console.log(asset)
      const assetCollection = asset.ObjectCollection.collection

      // Get user collections
      const user = await db.collection('users').findOne(
        { username: decodedToken.newUserToken2.username }
      )
      const userCollections = user.role.collections

      console.log(assetCollection)
      console.log(userCollections)

      // Check if asset collection in user collections array
      return userCollections.includes(assetCollection)
    }
  })
}
