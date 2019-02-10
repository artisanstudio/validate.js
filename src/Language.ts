import defaultErrors from './lang/en'

interface Message {
  [key: string]: string
}

export default class Language {
  errors: Message = defaultErrors

  constructor(errors = defaultErrors) {
    this.errors = errors
  }

  for(key: string) {
    if (this.errors.hasOwnProperty(key)) {
      key = this.errors[key]
    }

    return key
  }
}
