import { Language } from '../validate'

export default class Email {
  passes(attribute: string, value?: string) {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return pattern.test(String(value).toLowerCase())
  }

  message(locale = new Language()) {
    return locale.for('email')
  }
}
