import errors from './lang/en.json'

export default class Lang {
  static errors = errors

  static get(key: string, replacements: object) {
    let string = Lang.errors[key]

    Object.entries(replacements).forEach(([search, replacement]) =>
      string.replace(`:${search}`, replacement)
    )

    return string
  }
}
