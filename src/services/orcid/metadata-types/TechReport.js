import MetadataType from './MetadataType'

export default class TechReport extends MetadataType {
  constructor ({ id, title, year, author, address, institution, url, type, number, month, keyword, ...trash }) {
    super({ id, template: 'techreport' })
    this.trash = trash

    this.title = title
    this.year = year
    this.author = author
    this.address = address
    this.institution = institution
    this.url = url
    this.type = type
    this.number = number
    this.month = month
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
      'author': this.author,
      'address': this.address,
      'institution': this.institution,
      'url': this.url,
      'type': this.type,
      'number': this.number,
      'month': Number(this.month),
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
