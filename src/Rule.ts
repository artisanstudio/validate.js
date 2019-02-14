import { patternReplace } from './helpers'

export default class Rule {
  name: string
  instance: any
  customMessage?: string

  constructor(name: string, instance: any, message?: string) {
    this.name = name
    this.instance = instance
    this.customMessage = message
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
   */
  message(key: string, value: any) {
    let message = this.instance.message()

    if (this.customMessage) {
      message = this.customMessage
    }

    return patternReplace(message, {
      attribute: key,
      value: value,
      minimum: this.instance.minimum,
      maximum: this.instance.maximum
    })
  }
}
