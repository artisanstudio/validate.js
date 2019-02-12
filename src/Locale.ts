import messages from './lang/en'

interface Messages {
  [key: string]: string
}

export default class Locale {
  static messages: Messages = messages

  /**
   * Load a new set of messages.
   *
   * @param messages
   */
  static load(messages: Messages) {
    Locale.messages = messages
  }

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
