import { patternReplace } from './helpers'

export default class Rule {
  name: string
  instance: any

  constructor(name: string, instance: any) {
    this.name = name
    this.instance = instance
  }

  passes(key: string, value: any) {
    return this.instance.passes(key, value)
  }

  /**
   * Create the error message and replace the template.
   *
   * @remarks
   * Find a way that if the "message" returned from the rule is an array, then
   * a type check will be ran the value and use that value to build the message.
   *
   * Pseudo Code:
   *  if :message is an array:
   *  check the :value's type
   *  run pattern_replace on :message[:type].
   *
   * @param rule
   * @param key
   * @param value
   * @param message
   */
  message(key: string, value: any, customMessage: string) {
    let message = this.instance.message()

    return patternReplace(customMessage || message, {
      attribute: key,
      value: value,
      minimum: this.instance.minimum,
      maximum: this.instance.maximum
    })
  }
}
