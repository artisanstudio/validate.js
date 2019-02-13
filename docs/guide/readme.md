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

let validator = new Validator({
  email: 'required|email',
  password: 'required|min:8',
})

if (! validator.passes({
  email: null,
  password: 'some password',
})) {
  validator.errors.first('email') //
  // => ["The email field is required.", "The email must be an email address."]

  validator.errors.first('email')
  // => "The email field is required."
}
```

## Notes

- The  `passes` might be changed into something else.
- The errors API needs to change too.

```javascript
validator.check()

validator.errors.has('name') // ?
validator.hasErrors()
validator.hasErrors('name', 'password')
```

- The error handling has to change since there are a lot of instances where it’s needed to validate a single field at a time.
- Maybe find a way to customize the error messages inline like Laravel?

```javascript
new Validator({
  name: 'required',
  email: 'required|email',
  password: 'required|min:8',
}, {
  // Custom error message for every "required" field
  required: 'The :attribute field is required',

  // What about for specific fields?
  name: {
    required: "A specific error for the name field."
  },

  // What about dot-notation?
  "name.required": "A specific error for the email field?",
 	"password.min": "The password must be at least 8 characters long.",
})
```

