import Adapter from './Adapter'

export default class DissertationAdapter extends Adapter {
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
