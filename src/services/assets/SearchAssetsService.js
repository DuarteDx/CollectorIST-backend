import { Mongo } from 'porg'

export default async (params) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + 'GET -> Search assets')
  console.log(params)
  console.log('\n')

  // Fetch data from DB
  const db = await Mongo.getDB()
  const categories = await db.collection('assets').find().toArray()/* {
    $and: [
      { title: { $regex: params.title, $options: 'i' } }
    ]
  }) */
  console.log(categories)
  if (!categories) {
    return 'No assets match the given search params!'
  }

  return categories
}
