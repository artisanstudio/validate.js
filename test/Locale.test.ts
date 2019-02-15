import Locale from '../src/Locale'

describe('Locale#get', () => {
  it('gets the value with the get', () => {
    Locale.load({ someKey: 'Some Value' })

    expect(Locale.get('someKey')).toBe('Some Value')
  })

  it('gets values via dot notation', () => {
    Locale.load({
      parent: { child: 'Some Value' }
    })

    expect(Locale.get('parent.child')).toBe('Some Value')
  })

  it('returns back the original thing when the key does not exist', () => {
    expect(Locale.get('not-existing')).toBe('not-existing')
  })
})
