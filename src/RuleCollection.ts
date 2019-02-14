import { arrayWrap } from './helpers'
import Rule from './Rule'
import Validator from './Validator'

interface Message {
  [key: string]: string
}

export default class RuleCollection {
  rules: any
  customMessages: Message

  constructor(rules: any, messages: Message = {}) {
    this.customMessages = messages
    this.rules = this.prepare(rules)
  }

  /**
   * Create rule instances on all of the rules that the user has used.
   *
   * @param rules
   */
  prepare(rules: any) {
    let preparedRules: any = {}

    for (let key in rules) {
      preparedRules[key] = this.explode(rules[key]).map(
        this.newInstance.bind(this)
      )
    }

    return preparedRules
  }

  /**
   * From userland, pipe-separated rules in a string, _and_ arrays. This converts
   * all of the different ways to an array-based rules.
   *
   * @param rules
   */
  private explode(rules: any) {
    if (typeof rules === 'string') {
      return rules.split('|')
    }

    return arrayWrap(rules)
  }

  /**
   * Create a new instance of the rule provided. This also passes in everything
   * after the colon as parameters to the rule constructor.
   *
   * If the rule passed is a class, then just create a new instance.
   *
   * @param rule
   */
  private newInstance(extension: any) {
    if (typeof extension !== 'string') {
      return new Rule('', new extension())
    }

    let [name, parameters]: any = extension.split(':')
    let Extension = Validator.extensions[name]
    let constructorParameters: Array<any> = []
    let customMessage = this.customMessages[name]

    if (parameters) {
      constructorParameters = parameters
        .split(',')
        .map((value: any) => (isNaN(value) ? value : Number(value)))
    }

    return new Rule(
      name,
      new Extension(...constructorParameters),
      customMessage
    )
  }

  has(key: string) {
    return this.rules.hasOwnProperty(key)
  }

  /**
   * Run the validation rules trough the key and the values.
   *
   * If the validation fails, create the error message.
   *
   * @param key
   * @param value
   */
  errors(key: string, value: any) {
    return this.rules[key].reduce((errors: Array<string>, rule: any) => {
      if (!rule.passes(key, value)) {
        errors.push(rule.message(key, value))
      }

      return errors
    }, [])
  }
}
