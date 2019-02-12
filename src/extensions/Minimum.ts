import { Locale } from '../validate'

export default class Minimum {
  minimum: Number

  constructor(minimum: Number) {
    this.minimum = minimum
  }

  passes(attribute: string, value: any) {
    return value >= this.minimum
  }

  message(locale = new Locale()) {
    return locale.for('min')
  }
}
