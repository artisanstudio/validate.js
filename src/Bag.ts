import BagInterface from './contracts/Bag'

class Bag implements BagInterface {
  items: {
    [key: string]: Array<string>
  } = {}

  set(key: string, value: any) {
    if (!this.has(key)) {
      this.items[key] = []
    }

    this.items[key] = value
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
    return !Object.entries(this.items).reduce(
      (accumulator, [attribute, errors]) => accumulator + errors.length,
      0
    )
  }
}

export default Bag
