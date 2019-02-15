import messages from './lang/en'
import { dataGet } from './helpers'

interface Messages {
  [key: string]: string | Messages
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
    let message = dataGet(Locale.messages, key)

    if (!message) {
      return key
    }

    return message
  }
}
