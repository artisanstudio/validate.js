import Locale from '../Locale'

export default class Minimum {
  minimum: Number

  constructor(minimum: Number) {
    this.minimum = minimum
  }

  passes(attribute: string, value: any) {
    if (!value) {
      return false
    }

    return String(value).length >= this.minimum
  }

  message() {
    return Locale.get('min')
  }
}
