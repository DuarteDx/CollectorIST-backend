import Adapter from './Adapter'

export default class BookChapterAdapter extends Adapter {
  static getType () {
    return 'book'
  }

  static getFields () {
    return [
      'year',
      'month',
      'externalIdentifiers'
    ]
  }
}
