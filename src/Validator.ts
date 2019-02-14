import { patternReplace, arrayWrap } from './helpers'
import CoreExtensions from './extensions'
import ErrorBag from './ErrorBag'

interface RuleSet {
  [key: string]: any
}

interface Message {
  [key: string]: string
}

export default class Validator {
  /**
   * Maybe there's a way to just add in the extensions the user wants to make
   * the file size a little bit lower?
   *
   * I'll have to run some tests to see how tree-shaking works, but for now let's
   * just add _everything_.
   */
  static extensions: {
    [key: string]: any
  } = CoreExtensions

  errors: ErrorBag
  rules: RuleSet
  customMessages: Message

  constructor(rules: RuleSet, messages: Message = {}) {
    this.rules = this.prepareRules(rules)
    this.errors = this.prepareErrorBag(rules)
    this.customMessages = messages
  }

  /**
   * Set the extensions.
   *
   * @remarks
   * This is a bit useless for now, but this will be used once I can figure out
   * how to export the extensions in a different file. So we'll have something like:
   *
   * import { required, min } from '@artisanstudio/validate.js/extensions'
   *
   * Validator.load({ required, min })
   *
   * @param extensions
   */
  static load(extensions: Array<any>) {
    Validator.extensions = extensions
  }

  /**
   * Add a new extension to the Validator.
   *
   * @param name
   * @param extension
   */
  static extend(name: string, extension: any) {
    Validator.extensions[name] = extension
  }

  /**
   * Create rule instances on all of the rules that the user has used.
   *
   * @param rules
   */
  private prepareRules(rules: RuleSet) {
    let preparedRules: RuleSet = {}

    for (let key in rules) {
      preparedRules[key] = this.createRuleSet(rules[key]).map(
        this.newRuleInstance
      )
    }

    return preparedRules
  }

  /**
   * Add the validation keys to the error bag. This is to add reactivity support
   * to the error messages when there messages are removed or added.
   *
   * This is somewhat of a javascript limition where the observer pattern can't
   * really keep track of new keys inside an array.
   *
   * Here's a post from the Vue documentation which explains it much more clearly
   * than I ever will:
   * https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
   *
   * @param rules
   */
  private prepareErrorBag(rules: RuleSet) {
    let errors = new ErrorBag()

    for (let key in rules) {
      errors.set(key, [])
    }

    return errors
  }

  /**
   * From userland, pipe-separated rules in a string, _and_ arrays. This converts
   * all of the different ways to an array-based rules.
   *
   * @param rules
   */
  private createRuleSet(rules: any) {
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
  private newRuleInstance(rule: any) {
    if (typeof rule !== 'string') {
      return new rule()
    }

    let [name, parameters]: any = rule.split(':')
    let Extension = Validator.extensions[name]

    Extension.id = name

    if (!parameters) {
      return new Extension()
    }

    parameters = parameters
      .split(',')
      .map((value: any) => (isNaN(value) ? value : Number(value)))

    return new Extension(...parameters)
  }

  /**
   * Run the rules through all the fields passed through. This also populates
   * or clears the ErrorBag depending on the results.
   *
   * The check won't be ran through fields that are missing. For example:
   *
   *  let validator = new Validator({
   *    email: 'required',
   *    password: 'required',
   *  })
   *
   *  validator.check({ email })
   *
   * Here, the password won't be checked with the "required" rule, and only add
   * error messages for the "email" field.
   *
   * @remarks
   * Maybe we can add a method that only runs a validation through the passed
   * object, and another method, throws a warning if the key in the expected
   * rule set is missing.
   *
   * If we have something like `validator.only({ email })` won't run the other
   * rules on missing keys, while in `validator.all({ email })` will throw an
   * exception, or run the rules for "password" as well.
   *
   * @remarks
   * Refactor the method name into something that doesn't indicate that this method
   * _just_ checks if the data is valid or not.
   *
   * Maybe something like:
   * - validator.check?
   * - validator.attempt?
   * - validator.run?
   *
   * @param data
   */
  passes(data: object) {
    const errors = Object.entries(data).map(([attribute, value]) => {
      if (!this.rules.hasOwnProperty(attribute)) {
        return [attribute, []]
      }

      return [attribute, this.validate(attribute, value)]
    })

    this.setErrors(errors)

    return this.errors.empty()
  }

  /**
   * Set the errors on the error bag.
   *
   * @param errors
   */
  private setErrors(errors: Array<any>) {
    errors.forEach(([key, errors]) => this.errors.set(key, errors))
  }

  /**
   * Run the validation rules trough the key and the values.
   *
   * If the validation fails, create the error message.
   *
   * @param key
   * @param value
   */
  private validate(key: string, value: any) {
    return this.rules[key].reduce((errors: Array<string>, rule: any) => {
      if (!rule.passes(key, value)) {
        errors.push(this.buildErrorMessage(rule, key, value))
      }

      return errors
    }, [])
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
  private buildErrorMessage(rule: any, key: string, value: any) {
    return patternReplace(rule.message(), {
      attribute: key,
      value: value,
      minimum: rule.minimum,
      maximum: rule.maximum
    })
  }
}
