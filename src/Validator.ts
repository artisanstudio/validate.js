import CoreExtensions from './extensions'
import ErrorBag from './ErrorBag'
import RuleCollection from './RuleCollection'

interface Message {
  [key: string]: string
}

interface Rule {
  [key: string]: any
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
  rules: RuleCollection

  constructor(rules: Rule, messages: Message = {}) {
    this.rules = new RuleCollection(rules, messages)
    this.errors = this.prepareErrorBag(rules)
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
   * @param Message
   */
  private prepareErrorBag(rules: Message) {
    let errors = new ErrorBag()

    for (let key in rules) {
      errors.set(key, [])
    }

    return errors
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
      if (!this.rules.has(attribute)) {
        return [attribute, []]
      }

      return [attribute, this.rules.validate(attribute, value)]
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
}
