// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
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
      preparedRules[key] = rules[key].split('|')
    }

    return preparedRules
  }

  getRules () {
    return this.rules
  }
}
