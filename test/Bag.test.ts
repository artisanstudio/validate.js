import Bag from '../src/Bag'

describe('Bag#set', () => {
  it('sets the value and wrap it in an array', () => {
    let bag = new Bag()

    bag.set('key', 'some value')

    expect(bag.get('key')).toEqual(['some value'])
  })
})

describe('Bag#get', () => {
  it("returns null if the key doesn't exist", () => {
    let bag = new Bag()

    expect(bag.get('not existing')).toEqual(null)
  })

  it('returns the value set', () => {
    let bag = new Bag()

    bag.set('key', 'some value')

    expect(bag.get('key')).toEqual(['some value'])
  })
})

describe('Bag#has', () => {
  it('returns true if the key exists', () => {
    let bag = new Bag()

    bag.set('key', 'value')

    expect(bag.has('key')).toBe(true)
  })

  it("returns false if the key doesn't exists", () => {
    let bag = new Bag()

    expect(bag.has('key')).toBe(false)
  })
})

describe('Bag#first', () => {
  it('returns true if the key exists', () => {
    let bag = new Bag()

    bag.set('key', 'some value')

    expect(bag.first('key')).toBe('some value')
  })

  it("returns null if there's no value", () => {
    let bag = new Bag()

    expect(bag.first('key')).toBe(null)
  })
})

describe('Bag#empty', () => {
  it('return true if there are no items', () => {
    let bag = new Bag()

    bag.set('key', [])

    expect(bag.empty()).toBe(true)
  })

  it('return false if there are items', () => {
    let bag = new Bag()

    bag.set('key', 'some value')

    expect(bag.empty()).toBe(false)
  })
})
