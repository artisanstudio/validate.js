import Validator from '../src/Validator'

describe('Validator#constructor', () => {
  beforeEach(() => {
    Validator.extend('custom', CustomExtension)
  })

  it('expands a rule set string to an array of rule instances', () => {
    class AboveEighteenYearsOld {
      passes(attribute: string, value: any) {
        return value >= 18
      }
    }

    const validator = new Validator({
      name: 'custom',
      email: ['custom'],
      age: AboveEighteenYearsOld
    })

    expect(validator.rules).toEqual({
      name: [new CustomExtension()],
      email: [new CustomExtension()],
      age: [new AboveEighteenYearsOld()]
    })
  })

  it("passes in the arguments to the rule's constructor", () => {
    Validator.extend('withArgument', WithArgumentsExtension)

    const validator = new Validator({
      name: 'withArgument:8,string-value'
    })

    expect(validator.rules.name[0].first).toBe(8)
    expect(validator.rules.name[0].second).toBe('string-value')
  })

  it('takes in custom error messages', () => {
    Validator.extend('fail', FailingExtensionWithMessage)

    const defaultValidator = new Validator({ name: 'fail' })
    defaultValidator.passes({ name: 'Fail' })
    expect(defaultValidator.errors.first('name')).toBe('An error message.')

    const customMessageValidator = new Validator(
      {
        name: 'fail'
      },
      {
        fail: 'A custom error message.'
      }
    )
    customMessageValidator.passes({ name: 'Fail' })
    expect(customMessageValidator.errors.first('name')).toBe(
      'A custom error message.'
    )
  })
})

describe('Validator#passes', () => {
  it('validates the data', () => {
    const validator = new Validator({
      name: 'required',
      email: 'required'
    })

    const passes = validator.passes({
      name: 'some name',
      email: null,
      bio: 'some bio'
    })

    expect(passes).toBe(false)
    expect(validator.errors.items).toEqual({
      bio: [],
      email: ['The email field must be required.'],
      name: []
    })
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
