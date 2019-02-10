import Language from '../Language'

export default class Required {
  passes(attribute: string, value: any) {
    return value !== undefined && value !== null && value !== ''
  }

  message() {
    return Language.for('required')
  }
}
