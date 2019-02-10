// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { arrayWrap } from './helpers'
import BagInterface from './contracts/Bag'
import Required from './rules/Required'
import Lang from './Lang'
import Bag from './Bag'

interface RuleSet {
  [key: string]: any // class, anonymous function, string
}

export default class Validator {
  static extensions: {
    [key: string]: any // class, anonymous function
  } = {}

  lang: any = new Lang()
  errors: BagInterface = new Bag()
  rules: RuleSet

  constructor(rules: RuleSet) {
    this.rules = this.prepareRules(rules)

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
      return [name, new Extension()]
    }

    parameters = parameters
      .split(',')
      .map((value: any) => (isNaN(value) ? value : Number(value)))

    return [name, new Extension(...parameters)]
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
        let [name, instance] = rule

        if (instance.passes(key, value)) {
          return true
        }

        return this.lang.get(name, {
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
