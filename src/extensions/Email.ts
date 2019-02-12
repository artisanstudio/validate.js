import Locale from '../Locale'

export default class Email {
  /**
   * Took the RegEx from Stack Overflow.
   * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
   */
  passes(attribute: string, value?: string) {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return pattern.test(String(value).toLowerCase())
  }

  message() {
    return Locale.get('email')
  }
}
