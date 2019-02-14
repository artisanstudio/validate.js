# Oh Hai, Mark!

**validate.js** is a validation library that focuses on being extensible, usable, and localisable. It’s heavily based off of [Laravel’s validation API](https://laravel.com/docs/5.7/validation).

> **validate.js** is a dependency-free, extensible, localizable, validation library.

*Fun fact: To ensure that the library is built on extensibility, every single rule is an extension.*

## Installing **validate.js**

```bash
npm install @artisanstudio/validate.js --save
```

Or with yarn:

```bash
yarn add @artisanstuduio/validate.js
```

## Basic Usage

```javascript
import { Validator } from '@artisanstudio/validate.js'

const validator = new Validator({
  email: 'required|email',
  password: 'required|min:8',
})

const passes = validator.passes({
  email: null,
  password: 'some password',
})

if (! passes) {
  validator.errors.first('email') //
  // => ["The email field is required.", "The email must be an email address."]

  validator.errors.first('email')
  // => "The email field is required."
}
```

## Custom Error Messages

There are cases where a one-off custom message is needed. For example, writing error messages that have a bit more tone when it comes to the landing page, or the registration page.

With validate, we can create one-off error messages, and even field specific error messages!

```javascript
import { Validator } from '@artisanstudio/validate.js'

const validator = new Validator({
  email: 'required|email',
  password: 'required|min:8'
}, {
  // All required messages.
  required: "Hey, we need the :attribute field!"
  
  // Specific field.
  email: {
    required: "What's your email?"
  },
})
```

## Pre-1.0 Notes

- The  `passes` might be changed into something else.
- The errors API needs to change too.

```javascript
validator.check()

validator.errors.has('name') // ?
validator.hasErrors()
validator.hasErrors('name', 'password')
```

