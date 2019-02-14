import Validator from '../src/Validator'

describe('Validator#constructor', () => {
  beforeEach(() => {
    Validator.extend('custom', CustomExtension)
  })

  it('takes in custom error messages', () => {
    Validator.extend('fail', FailingExtensionWithMessage)

    const defaultValidator = new Validator({ name: 'fail' })
    defaultValidator.passes({ name: 'Fail' })
    expect(defaultValidator.errors.first('name')).toBe('An error message.')

    const customMessageValidator = new Validator(
      { name: 'fail' },
      { fail: 'A custom error message.' }
    )
    customMessageValidator.passes({ name: 'Fail' })
    expect(customMessageValidator.errors.first('name')).toBe(
      'A custom error message.'
    )
  })
})

class CustomExtension {}

class WithArgumentsExtension {
  first: any
  second: any

  constructor(first: any, second: any) {
    this.first = first
    this.second = second
  }
}

class FailingExtensionWithMessage {
  passes() {
    return false
  }

  message() {
    return 'An error message.'
  }
}
