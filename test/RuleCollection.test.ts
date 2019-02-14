import RuleCollection from '../src/RuleCollection'
import Rule from '../src/Rule'
import Validator from '../src/Validator'

class CustomRequiredExtension {
  passes(attribute: string, value: any) {
    return !!value
  }

  message() {
    return 'The :attribute field is required.'
  }
}

Validator.extend('required', CustomRequiredExtension)

describe('RuleCollection#constructor', () => {
  it('creates multiple rules from a pipe separated string', () => {
    const rules = new RuleCollection({
      name: 'required'
    })

    expect(rules.rules).toEqual({
      name: [new Rule('required', new CustomRequiredExtension())]
    })
  })

  it('takes in an array as rules', () => {
    const rules = new RuleCollection({
      name: ['required']
    })

    expect(rules.rules).toEqual({
      name: [new Rule('required', new CustomRequiredExtension())]
    })
  })

  it('takes in an inline class as a rule', () => {
    class OneOffRule {}

    const rules = new RuleCollection({
      name: [OneOffRule]
    })

    expect(rules.rules).toEqual({
      name: [new Rule('', new OneOffRule())]
    })
  })

  it('passes in values after the colon as parameters', () => {
    class Between {
      min: any
      max: any

      constructor(min: any, max: any) {
        this.min = min
        this.max = max
      }
    }

    Validator.extend('between', Between)

    const rules = new RuleCollection({
      name: ['between:string,20']
    })

    expect(rules.rules.name[0].instance).toEqual(new Between('string', 20))
  })
})

describe('Validator#passes', () => {
  it('validates the data', () => {
    const rules = new RuleCollection({
      name: 'required'
    })

    const errors = rules.errors('name', null)

    expect(errors).toEqual(['The name field is required.'])
  })

  it('uses custom error messages', () => {
    const rules = new RuleCollection(
      {
        name: 'required'
      },
      {
        required: 'A custom required message.'
      }
    )

    const errors = rules.errors('name', '')

    expect(errors).toEqual(['A custom required message.'])
  })

  it('uses a custom error message for a specific field', () => {
    const rules = new RuleCollection(
      {
        name: 'required',
        email: 'required'
      },
      {
        required: 'A custom required message.',
        name: {
          required: 'A custom required message for the name field.'
        }
      }
    )

    expect(rules.errors('name', '')).toEqual([
      'A custom required message for the name field.'
    ])

    expect(rules.errors('email', '')).toEqual(['A custom required message.'])
  })
})
