import defaultErrors from './lang/en'

interface Message {
  [key: string]: string
}

export default class Language {
  errors: Message = defaultErrors
  subject: string = ''

  setErrors(errors: Message) {
    this.errors = errors
  }

  static for(key: string) {
    return new Language().get(key)
  }

  get(key: string) {
    if (!this.errors.hasOwnProperty(key)) {
      return key
    }

    this.subject = this.errors[key]

    return this
  }

  replace(replacements: object) {
    let string = this.subject

    Object.entries(replacements).forEach(([search, replacement]) => {
      string = string.replace(`:${search}`, replacement)
    })

    return string
  }
}
