import MetadataType from './MetadataType'

export default class InBook extends MetadataType {
  constructor ({ id, title, year, author, editor, publisher, doi, volume, number, isbn, series, address, edition, month, url, chapter, pages, keyword, ...trash }) {
    super({ id, template: 'inbook' })
    this.trash = trash

    this.title = title
    this.year = year
    this.author = author
    this.editor = editor
    this.publisher = publisher
    this.doi = doi
    this.volume = volume
    this.number = number
    this.isbn = isbn
    this.series = series
    this.address = address
    this.edition = edition
    this.month = month
    this.url = url
    this.chapter = chapter
    this.pages = pages
    this.keyword = keyword

    const requiredFields = ['title', 'year', 'author', 'publisher']
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
      'journal': this.journal,
      'editor': this.editor,
      'publisher': this.publisher,
      'doi': this.doi,
      'volume': this.volume,
      'number': this.number,
      'isbn': this.isbn,
      'series': this.series,
      'address': this.address,
      'edition': this.edition,
      'month': Number(this.month),
      'url': this.url,
      'chapter': this.chapter,
      'pages': this.pages,
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
