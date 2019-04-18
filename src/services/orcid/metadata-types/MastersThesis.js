import MetadataType from './MetadataType'

export default class MastersThesis extends MetadataType {
  constructor ({ id, title, year, author, advisors, school, tid, address, month, url, abstract, keyword, ...trash }) {
    super({ id, template: 'mastersthesis' })
    this.trash = trash

    this.title = title
    this.year = year
    this.author = author
    this.advisors = advisors
    this.school = school
    this.tid = tid
    this.address = address
    this.month = month
    this.url = url
    this.abstract = abstract
    this.keyword = keyword

    const requiredFields = ['title', 'year', 'author', 'advisors']
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
      'advisors': this.advisors,
      'school': this.school,
      'tid': this.tid,
      'address': this.address,
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
