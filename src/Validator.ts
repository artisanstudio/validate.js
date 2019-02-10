// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { arrayWrap } from './helpers'
import Required from './rules/Required';

interface RuleSet {
  [key: string]: any // class, anonymous function, string
}

export default class Validator {
  static extensions: {
    [key: string]: any // class, anonymous function
  } = {}

  rules: RuleSet

  constructor (rules: RuleSet) {
    this.rules = this.prepareRules(rules)

    this.registerCoreExtensions()
  }

  static extend (name: string, extension: any) {
    Validator.extensions[name] = extension
  }

  private registerCoreExtensions () {
    Validator.extensions["required"] = Required
  }

  private prepareRules (rules: RuleSet) {
    let preparedRules : RuleSet = {}

    for (let key in rules) {
      let set = []

      if (typeof rules[key] === "string") {
        set = rules[key].split('|')
      } else {
        set = arrayWrap(rules[key])
      }

      preparedRules[key] = set.map((rule: any) => {
        if (typeof rule === "string") {
          return new Validator.extensions[rule]()
        }

        return rule
      })
    }

    return preparedRules
  }

  getRules () {
    return this.rules
  }

  passes (data : object) {
  }
}
