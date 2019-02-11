import Minimum from '../../src/extensions/Minimum'

describe('Minimum#passes', () => {
  it('returns true if data is valid', () => {
    const rule = new Minimum(18)

    expect(rule.passes('age', 20)).toBe(true)
  })

  it('return false if the data is invalid', () => {
    const rule = new Minimum(18)

    expect(rule.passes('age', 2)).toBe(false)
    expect(rule.passes('age', null)).toBe(false)
    expect(rule.passes('age', undefined)).toBe(false)
    expect(rule.passes('age', '')).toBe(false)
  })
})
