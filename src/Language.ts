import defaultErrors from './lang/en'

interface Message {
  [key: string]: string
}

export default class Language {
  errors: Message = defaultErrors
  subject: string = ''

  constructor(errors = defaultErrors) {
    this.errors = errors
  }

  for(key: string) {
    this.subject = key

    if (this.errors.hasOwnProperty(key)) {
      this.subject = this.errors[key]
    }

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
