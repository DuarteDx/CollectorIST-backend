import MetadataType from './MetadataType'

export default class InProceedings extends MetadataType {
  constructor ({ id, title, year, event, author, abstract, doi, series, pages, address, month, organization, publisher, url, keyword, ...trash }) {
    super({ id, template: 'inproceedings' })
    this.trash = trash

    this.title = title
    this.year = year
    this.author = author
    this.event = event
    this.abstract = abstract
    this.doi = doi
    this.series = series
    this.pages = pages
    this.address = address
    this.month = month
    this.organization = organization
    this.publisher = publisher
    this.url = url
    this.keyword = keyword

    const requiredFields = ['title', 'year', 'author', 'event']
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
      'event': this.event,
      'abstract': this.abstract,
      'volume': this.volume,
      'editor': this.editor,
      'doi': this.doi,
      'series': this.series,
      'pages': this.pages,
      'address': this.address,
      'month': Number(this.month),
      'organization': this.organization,
      'publisher': this.publisher,
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
