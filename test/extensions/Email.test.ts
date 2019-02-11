import Email from '../../src/extensions/Email'

describe('Email#passes', () => {
  it('returns true when the email is valid', () => {
    let rule = new Email()

    expect(
      rule.passes('email', 'a.valid-emailWithNumbers@artisan.studio')
    ).toBe(true)
  })

  it('returns false when the email is invalid', () => {
    let rule = new Email()

    expect(rule.passes('email', 'username-no-domain')).toBe(false)
    expect(rule.passes('email', 'user@no-tld')).toBe(false)
    expect(rule.passes('email', '@no-username.tld')).toBe(false)
    expect(rule.passes('email', undefined)).toBe(false)
    expect(rule.passes('email', '')).toBe(false)
  })
})
