const translate = (sort) => {
  const sortingObject = {}
  for (let entry of sort) {
    const [field, order] = entry.split(':')
    sortingObject[field] = order === 'asc' ? 1 : -1
  }
  return sortingObject
}

export default {
  translate
}
