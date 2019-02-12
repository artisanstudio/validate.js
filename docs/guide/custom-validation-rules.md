## Custom Validation Rules

### Using Extensions

```javascript
import { Validator } from '@artisanstudio/validate.js'

class BetweenRule {
  constructor (minimum, maximum) {
    this.minimum = minimum
    this.maximum = maximum
  }

  passes (attribute, value) {
    return value >= this.minimum && value <= this.maximum
  }

  message() {
    return "The :attribute must only between :minimum and :maximum"
  }
}

Validator.extend('between', BetweenRule)
```

We can even write the rule inline the extension.

```javascript
Validator.extend('between', class {
  // ...
})
```



### Inline Classes

There are some times that we need one-off validations for a specific component. There, we can directly pass in the class in our validator rules.

```javascript
class TwoWords {
  passes(attribute, value) {
    return value.split(" ").length >= 2
  }

  message () {
    return "The :attribute must be at least 2 words long."
  }
}

const validator = new Validator({
  name: TwoWords,
})
```

Like the extension, the class can also be written inline, although it might get clutterred real fast.

```javascript
{
  name: class {
    // ...
  }
}
```

