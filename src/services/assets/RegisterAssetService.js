import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (token, asset) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      var decodedToken = jwtDecode(token)
      if (!decodedToken.newUserToken2.role.admin && !decodedToken.newUserToken2.role.editor) {
        return 'You do not have permissions to perform this action'
      }

      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' POST -> Insert single asset (title: ' + asset.title + ')')

      console.log(asset.files)

      // Insert asset into DB
      let db = await Mongo.getDB()
      asset.location.date = today
      var newAsset = {
        title: asset.title,
        category: asset.category,
        author: asset.author,
        optionalId: asset.optionalId,
        location: [ asset.location ]
      }
      await db.collection('assets').insertOne(newAsset)

      // Create log
      var log = {
        time: today,
        action: 'Insert asset',
        objectId: newAsset.title,
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Inserted new asset with title: ' + newAsset.title
    }
  })
}
