import MetadataType from './MetadataType'

export default class Unpublished extends MetadataType {
  constructor ({ id, title, year, month, author, url, keyword, ...trash }) {
    super({ id, template: 'unpublished' })
    this.trash = trash

    this.title = title
    this.year = year
    this.month = month
    this.author = author
    this.url = url
    this.keyword = keyword

    const requiredFields = ['title', 'year', 'author']
    this.ignored = []
    for (const key of requiredFields) {
      if (!this[key]) {
        this.ignored.push(key)
      }
    }
  }

  export () {
    const record = {
      'title': this.title,
      'year': Number(this.year),
      'month': Number(this.month),
      'author': this.author,
      'url': this.url,
      'keyword': this.keyword,
      'template': this.template
    }
    for (const key in record) {
      if (!record[key]) {
        delete record[key]
      }
    }
    return {
      trash: this.trash,
      record,
      ignored: this.ignored,
      id: this.id
    }
  }
}
