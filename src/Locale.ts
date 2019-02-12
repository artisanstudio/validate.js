import messages from './lang/en'

export default class Locale {
  static messages: {
    [key: string]: string
  } = messages

  /**
   * Get the message from the messages.
   *
   * @param key
   */
  static get(key: string) {
    if (Locale.messages.hasOwnProperty(key)) {
      key = Locale.messages[key]
    }

    return key
  }
}
