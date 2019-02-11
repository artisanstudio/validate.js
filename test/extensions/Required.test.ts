import Required from '../../src/extensions/Required'

describe('Required#passes', () => {
  it('returns true of the value exists', () => {
    const rule = new Required()

    expect(rule.passes('name', 'Some Name')).toBe(true)
  })

  it('returns false if the value is null or undefined', () => {
    const rule = new Required()

    expect(rule.passes('name', undefined)).toBe(false)
    expect(rule.passes('name', '')).toBe(false)
    expect(rule.passes('name', null)).toBe(false)
  })
})
