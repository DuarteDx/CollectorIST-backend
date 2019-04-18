import Adapter from './Adapter'

export default class ArticleAdapter extends Adapter {
  static getType () {
    return 'article'
  }

  static getFields () {
    return [
      'year',
      'month'
    ]
  }
}
