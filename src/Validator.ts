// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { arrayWrap } from './helpers'
import Required from './rules/Required'
import Language from './Language'
import ErrorBag from './ErrorBag'

interface RuleSet {
  [key: string]: any // class, anonymous function, string
}

export default class Validator {
  static extensions: {
    [key: string]: any // class, anonymous function
  } = {
    required: Required
  }

  language: any = new Language()
  errors: ErrorBag = new ErrorBag()
  rules: RuleSet

  constructor(rules: RuleSet) {
    this.rules = this.prepareRules(rules)
  }

  setLanguage(language: Language) {
    this.language = language
  }

  static extend(name: string, extension: any) {
    Validator.extensions[name] = extension
  }

  private prepareRules(rules: RuleSet) {
    let preparedRules: RuleSet = {}

    for (let key in rules) {
      preparedRules[key] = this.createRuleSet(rules[key]).map(
        this.newRuleInstance
      )
    }

    return preparedRules
  }

  private createRuleSet(rules: any) {
    if (typeof rules === 'string') {
      return rules.split('|')
    }

    return arrayWrap(rules)
  }

  private newRuleInstance(rule: any) {
    if (typeof rule !== 'string') {
      return rule
    }

    let [name, parameters]: any = rule.split(':')
    let Extension = Validator.extensions[name]

    if (!parameters) {
      return new Extension()
    }

    parameters = parameters
      .split(',')
      .map((value: any) => (isNaN(value) ? value : Number(value)))

    return new Extension(...parameters)
  }

  getRules() {
    return this.rules
  }

  passes(data: object) {
    const errors = Object.entries(data)
      .map(([attribute, value]) => {
        if (!this.rules.hasOwnProperty(attribute)) {
          return [attribute, []]
        }

        return [attribute, this.validate(attribute, value)]
      })
      .filter(([attribute, errors]) => errors.length > 0)

    this.setErrors(errors)

    return this.errors.empty()
  }

  private validate(key: string, value: any) {
    return this.rules[key]
      .map((rule: any) => {
        if (rule.passes(key, value)) {
          return true
        }

        return rule.message(this.language).replace({
          attribute: key,
          value: value
        })
      })
      .filter((result: any) => typeof result === 'string')
  }

  private setErrors(errors: Array<any>) {
    errors.forEach(([key, errors]) => this.errors.set(key, errors))
  }
}
