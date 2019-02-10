import BagInterface from './contracts/Bag'

class Bag implements BagInterface {
  items: {
    [key: string]: Array<string>
  } = {}

  set(key: string, value: any) {
    if (!this.has(key)) {
      this.items[key] = []
    }

    if (Array.isArray(value)) {
      this.items[key] = this.items[key].concat(value)
    } else {
      this.items[key].push(value)
    }
  }

  has(key: string) {
    return this.items.hasOwnProperty(key)
  }

  get(key: string) {
    if (!this.has(key)) {
      return null
    }

    return this.items[key]
  }

  first(key: string) {
    const value = this.get(key)

    if (!value) {
      return null
    }

    return value[0]
  }

  empty() {
    return ! Object
      .entries(this.items)
      .map((key, errors) => errors)
      .length
  }
}

export default Bag
