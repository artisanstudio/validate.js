// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { arrayWrap } from './helpers'

interface RuleSet {
  [key:string] : any
}

export default class Validator {
  rules: RuleSet

  constructor (rules: RuleSet) {
    this.rules = this.prepareRules(rules)
  }

  private prepareRules (rules: RuleSet) {
    let preparedRules : RuleSet = {}

    for (let key in rules) {
      if (typeof rules[key] === "string") {
        preparedRules[key] = rules[key].split('|')
      } else {
        preparedRules[key] = arrayWrap(rules[key])
      }
    }

    return preparedRules
  }

  getRules () {
    return this.rules
  }

  passes (data : object) {
  }
}
