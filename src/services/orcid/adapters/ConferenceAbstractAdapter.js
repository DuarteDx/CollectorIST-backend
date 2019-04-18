import Adapter from './Adapter'

export default class ConferenceAbstractAdapter extends Adapter {
  static getType () {
    return 'conference-paper'
  }

  static getFields () {
    return [
      'year',
      'month'
    ]
  }
}
