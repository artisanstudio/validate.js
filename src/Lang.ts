import defaultErrors from './lang/en'

interface Message {
  [key: string]: string
}

export default class Lang {
  errors: Message

  constructor(errors = defaultErrors) {
    this.errors = errors
  }

  get(key: string, replacements: object) {
    if (!this.errors.hasOwnProperty(key)) {
      return key
    }

    let string = this.errors[key]

    Object.entries(replacements).forEach(([search, replacement]) => {
      string = string.replace(`:${search}`, replacement)
    })

    return string
  }
}
