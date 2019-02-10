// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { arrayWrap } from './helpers'
import Required from './rules/Required'

interface RuleSet {
  [key: string]: any // class, anonymous function, string
}

export default class Validator {
  static extensions: {
    [key: string]: any // class, anonymous function
  } = {}

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

    let [name, parameters] = rule.split(':')
    let Extension = Validator.extensions[name]

    if (!parameters) {
      return new Extension()
    }

    return new Extension(...parameters.split(','))
  }

  getRules() {
    return this.rules
  }

  passes(data: object) {}
}
