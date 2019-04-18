import Adapter from './Adapter'

export default class ReportAdapter extends Adapter {
  static getType () {
    return 'book'
  }

  static getFields () {
    return [
      'putCode',
      'title',
      'bibtex',
      'author',
      'year',
      'month',
      'externalIdentifiers'
    ]
  }
}
