import { arrayWrap } from './helpers'

class ErrorBag {
  items: {
    [key: string]: Array<string>
  } = {}

  /**
   * Set an error message to the given key.
   *
   * If the value given is a string, ensure that the value in an array.
   *
   * @param key
   * @param value
   */
  set(key: string, value: string | Array<string>) {
    this.items[key] = arrayWrap(value)
  }

  /**
   * Check if the key exists, or has any messages inside of it.
   *
   * @param key
   */
  has(key: string) {
    if (!this.items.hasOwnProperty(key)) {
      return false
    }

    return this.items[key].length > 0
  }

  /**
   * Get the error messages from the given key.
   *
   * @param key
   */
  get(key: string) {
    if (!this.has(key)) {
      return []
    }

    return this.items[key]
  }

  /**
   * Get the first error message from the given key.
   *
   * @param key
   */
  first(key: string) {
    return this.get(key)[0]
  }

  /**
   * Check if error bag has any errors at all.
   */
  empty() {
    return Array().concat(...Object.values(this.items)).length == 0
  }
}

export default ErrorBag
