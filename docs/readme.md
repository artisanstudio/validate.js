---
home: true
actionText: Get Started →
actionLink: /guide/
---

<div class="features">
  <div class="feature">
    <h2>Simplicity</h2>
    <p>something about the thing being made sure that it's developer friendly.</p>
  </div>
  <div class="feature">
    <h2>Extensible</h2>
    <p>something about the thing is made with extensibility in mind.</p>
  </div>
  <div class="feature">
    <h2>Localizable</h2>
    <p>something about all of the messages, built-in, and custom rules are localizable.</p>
  </div>
</div>

## Snippet for you!

```javascript
import { Validator } from '@artisanstudio/validate.js'

const validator = new Validator({
  email: 'required|email',
  password: 'required|min:8'
})

validator.passes({
  email: 'jake-peralta-rocks!',
  password: 'short',
})

validator.errors.first('email')
// "jake-peralta-rocks!" is not a valid email address.

validator.errors.first('password')
// The password field must be at least 8 characters long.
```

