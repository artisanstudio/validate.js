import Required from '../../src/rules/Required'

describe('Validator', () => {
  it('returns false if the value is null or undefined', () => {
    const rule = new Required()

    expect(rule.passes('name', undefined)).toBe(false)
    expect(rule.passes('name', '')).toBe(false)
    expect(rule.passes('name', null)).toBe(false)
  })

  it('returns true of the value exists', () => {
    expect(new Required().passes('name', 'Some Name')).toBe(true)
  })
})
