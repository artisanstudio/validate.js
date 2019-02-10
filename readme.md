# Validate.js

**WIP** There will be breaking changes prior to v1, use at your own risk.

**validate.js** is a dependency-free, extensible, localizable, validation library.

## Installation

```bash
yarn add @artisanstudio/validate.js
```

## Usage

```javascript
import { Validator, Rule } from '@artisanstudio/validate.js'

let validator = new Validator({
    email: ['required', 'email'],
    password: 'required|min:8',
}, {
    required: "The :attribute field is required.",
    email: ":value is not a valid email address.",
    min: "The :attribute shoudn't be less than 8 characters long.",
})

validator.check({
    email: 'email',
    password: 'short',
})
```

## Custom Validator

```
Validator.extend('required', ...)
```

## Localization?

```javascript
const validator = new Validator()

validator.errors.first('email') // The email field must be required.

validator.setLanguage(new Language({
    required: "Hindi pwedeng walang laman ang :attribute."
}))

validator.errors.first('email') // Hindi pwedeng walang laman ang email.
```

## Problems

- I want a custom rule that uses the error message from the server as the validation message.
- I want all of the validation rules as extensions.