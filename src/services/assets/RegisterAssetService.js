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
      console.log(time + ' POST -> Insert single asset (title: ' + asset.assetInfo.title + ')')

      // console.log(asset.document0)
      // console.log(asset.document1)
      // console.log(asset.assetInfo)

      var documents = {
        length: asset.assetInfo.documents.size,
        files: []
      }

      for (let i = 0; i < documents.length; i++) {
        let newFile = {
          data: asset['document' + i],
          description: asset.assetInfo.documents.descriptions[i]
        }
        documents.files.push(newFile)
      }

      console.log(documents)

      // Insert asset into DB
      let db = await Mongo.getDB()
      asset.assetInfo.location.date = today
      var newAsset = {
        title: asset.assetInfo.title,
        category: asset.assetInfo.category,
        collection: asset.assetInfo.collection,
        author: asset.assetInfo.author,
        optionalId: asset.assetInfo.optionalId,
        location: [ asset.assetInfo.location ],
        documents: documents.files
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
