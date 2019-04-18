import MetadataType from './MetadataType'

export default class Misc extends MetadataType {
  constructor ({ id, title, year, author, address, howpublished, type, month, url, abstract, keyword, ...trash }) {
    super({ id, template: 'misc' })
    this.trash = trash

    this.title = title
    this.year = year
    this.author = author
    this.address = address
    this.howpublished = howpublished
    this.type = type
    this.month = month
    this.url = url
    this.abstract = abstract
    this.keyword = keyword

    const requiredFields = []
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
      'author': this.author,
      'address': this.address,
      'howpublished': this.howpublished,
      'type': this.type,
      'month': Number(this.month),
      'url': this.url,
      'abstract': this.abstract,
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
