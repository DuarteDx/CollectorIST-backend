import MetadataType from './MetadataType'

export default class Proceedings extends MetadataType {
  constructor ({ id, title, year, editor, volume, number, series, address, month, url, organization, abstract, keyword, publisher, ...trash }) {
    super({ id, template: 'proceedings' })
    this.trash = trash

    this.title = title
    this.year = year
    this.editor = editor
    this.volume = volume
    this.number = number
    this.series = series
    this.address = address
    this.month = month
    this.url = url
    this.organization = organization
    this.abstract = abstract
    this.keyword = keyword
    this.publisher = publisher

    const requiredFields = ['title', 'year', 'editor']
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
      'editor': this.editor,
      'volume': this.volume,
      'number': this.number,
      'series': this.series,
      'address': this.address,
      'month': Number(this.month),
      'url': this.url,
      'organization': this.organization,
      'abstract': this.abstract,
      'keyword': this.keyword,
      'publisher': this.publisher,
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
