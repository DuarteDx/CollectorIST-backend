import MetadataType from './MetadataType'

export default class Patent extends MetadataType {
  constructor ({ id, title, aprovaldate, registrationdate, author, abstract, number, location, patentstatus, url, keyword, ...trash }) {
    super({ id, template: 'patent' })
    this.trash = trash

    this.title = title
    this.aprovaldate = aprovaldate
    this.registrationdate = registrationdate
    this.author = author
    this.abstract = abstract
    this.number = number
    this.location = location
    this.patentstatus = patentstatus
    this.url = url
    this.keyword = keyword

    const requiredFields = ['title', 'aprovaldate', 'registrationdate', 'author']
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
      'aprovaldate': this.aprovaldate,
      'registrationdate': this.registrationdate,
      'author': this.author,
      'abstract': this.abstract,
      'number': this.number,
      'location': this.location,
      'patentstatus': this.patentstatus,
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
