import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (token, categories) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      var decodedToken = jwtDecode(token)
      if (!decodedToken.newUserToken2.role.admin) {
        return 'You do not have permissions to perform this action'
      }
      // Console output
      const today = new Date()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' POST -> Configure Object Description')

      // Get current categories in DB
      const db = await Mongo.getDB()
      const dbModuleData = await db.collection('modules').findOne({ moduleName: 'objectDescription' })
      var dbCategoriesList = dbModuleData.categories.value
      console.log('CATEGORIES IN DB: ')
      console.log(dbCategoriesList)
      console.log('\n')

      // Get newly received categories
      const newCategoriesList = categories.categories
      console.log('NEWLY RECEIVED CATEGORIES: ')
      console.log(newCategoriesList)
      console.log('\n')
      if (newCategoriesList === 'null') { return 'Invalid uploaded document' }

      // Update categories values
      // Iterate through all top level categories (root nodes)
      newCategoriesList.forEach(async (newRootCategory) => {
        let dbCategoryIndex = dbCategoriesList.findIndex(x => x.title === newRootCategory.title)
        if (dbCategoryIndex !== -1) {
          console.log('Going into root category "' + newRootCategory.title + '"')
          recursiveTreeUpdate(newRootCategory, dbCategoriesList[dbCategoryIndex])
        } else {
          // Insert whole new tree into db
          console.log('Inserting root category "' + newRootCategory.title + '" into database')
          dbCategoriesList.push(newRootCategory)
        }
      })

      // Replace current db tree with updated one
      await db.collection('modules').updateOne(
        { moduleName: 'objectDescription' },
        {
          $set: { 'categories.value': dbCategoriesList },
          $currentDate: { lastModified: true }
        }
      )

      // Create log
      var log = {
        time: today,
        action: 'Insert categoryies',
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Updated list of categories'
    }
  })
}

function recursiveTreeUpdate (newNode, dbNode) {
  if (newNode.title === dbNode.title) {
    // Iterate through next level children
    for (let i = 0; i < newNode.subCategories.length; i++) {
      try {
        // If both children have same title proceed
        if (newNode.subCategories[i].title === dbNode.subCategories[i].title) {
          console.log('Category "' + newNode.subCategories[i].title + '" already in database')
          recursiveTreeUpdate(newNode.subCategories[i], dbNode.subCategories[i])
        }
      // If new child not in db => Insert new child tree
      } catch (err) {
        if (newNode.subCategories[i] && !dbNode.subCategories[i]) {
          console.log('Inserting category "' + newNode.subCategories[i].title + '" into dabase')
          dbNode.subCategories.push(newNode.subCategories[i])
        }
      }
    }
  }
}
