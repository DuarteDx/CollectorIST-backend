import MetadataType from './MetadataType'

export default class Article extends MetadataType {
  constructor ({ id, title, year, author, journal, abstract, url, doi, volume, number, pages, month, keyword, ...trash }) {
    super({ id, template: 'article' })
    this.trash = trash

    this.title = title
    this.year = year
    this.author = author
    this.journal = journal
    this.abstract = abstract
    this.url = url
    this.doi = doi
    this.volume = volume
    this.number = number
    this.pages = pages
    this.volume = volume
    this.month = month
    this.keyword = keyword

    const requiredFields = ['title', 'year', 'author', 'journal']
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
      'abstract': this.abstract,
      'url': this.url,
      'volume': this.volume,
      'editor': this.editor,
      'doi': this.doi,
      'number': this.number,
      'pages': this.pages,
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
