// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { arrayWrap } from './helpers'
import BagInterface from './contracts/Bag'
import Required from './rules/Required'
import Bag from './Bag'

interface RuleSet {
  [key: string]: any // class, anonymous function, string
}

export default class Validator {
  static extensions: {
    [key: string]: any // class, anonymous function
  } = {}

  errors: BagInterface
  rules: RuleSet

  constructor(rules: RuleSet) {
    this.rules = this.prepareRules(rules)
    this.errors = new Bag()

    this.registerCoreExtensions()
  }

  static extend(name: string, extension: any) {
    Validator.extensions[name] = extension
  }

  private registerCoreExtensions() {
    Validator.extensions = {
      required: Required
    }
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
    const results = Object.entries(data).map(([key, value]) => {
      if (!this.rules.hasOwnProperty(key)) {
        return [key, []]
      }

      return [
        key,
        this.rules[key]
          .map((rule: any) => {
            if (rule.passes(key, value)) {
              return true
            }

            return rule.message(key, value)
          })
          .filter((result: any) => typeof result === 'string')
      ]
    })

    results.forEach(([key, errors]) => {
      if (errors.length) {
        this.errors.set(key, errors)
      }
    })

    return !results.map(([key, errors]) => errors.length > 0).includes(false)
  }
}
