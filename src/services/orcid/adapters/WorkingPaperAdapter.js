import Adapter from './Adapter'

export default class WorkingPaperAdapter extends Adapter {
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
