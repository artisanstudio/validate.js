# Advanced

## Overriding Validation Rules

There might be times that certain rules are a bit opinionated, or just doesn’t fit the overall usage. For example, interally, some companies use a local email server, which conflicts with validate.js’ `email` rule since it also looks for a tld.

Rather than creating a custom rule and thinking of a different rule name to since `email` is already taken, feel free to override it so the API fits _your_ domain.



```javascript
import { Validator } from '@artisanstudio/validate.js'

Validator.extend('email', class {
  passes (attribute, value) {
    return value.split('@').length == 1
  }
})

new Validator({
  email: 'required'
}).passes({
  email: 'jake@local'
})
```

