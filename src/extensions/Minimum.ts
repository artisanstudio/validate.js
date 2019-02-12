import Locale from '../Locale'

export default class Minimum {
  minimum: Number

  constructor(minimum: Number) {
    this.minimum = minimum
  }

  passes(attribute: string, value: any) {
    return value >= this.minimum
  }

  message() {
    return Locale.get('min')
  }
}
