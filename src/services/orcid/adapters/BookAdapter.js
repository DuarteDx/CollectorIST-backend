import Adapter from './Adapter'

export default class BookAdapter extends Adapter {
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
