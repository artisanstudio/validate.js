import defaultErrors from './lang/en'

export default class Locale {
  static errors: {
    [key: string]: string
  } = defaultErrors

  static get(key: string) {
    if (Locale.errors.hasOwnProperty(key)) {
      key = Locale.errors[key]
    }

    return key
  }
}
