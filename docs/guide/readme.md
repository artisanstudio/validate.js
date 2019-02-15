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
  validator.errors.first('email')
  // => ["The email field is required.", "The email must be an email address."]

  validator.errors.first('email')
  // => "The email field is required."
}
```

## Custom Error Messages

There are some cases where a custom message is needded. There are several ways to override the defaults to use a custom message. First is we can pass in the messages in the validator instance.

```javascript
import { Validator } from '@artisanstudio/validate.js'

const messages = {
  required: "The :attribute is needed!",
}

const validator = new Validator(rules, messages)
```

Here the `:attribute` and the `:value` placeholder will be replaced by the field and its value. There are other placeholders we can use to have more expressive messages.

```javascript
{
  required: "The :attribute field is required.",
  email: "<strong>:value</strong> is not a valid email address.",
  between: "The :attribute value :value is not between :min and :max",
}
```

### Custom Message for a Specific Attribute

For the cases where we need specific messages for certain attributes, we can use the attributes’ field as the key instead.

```javascript
const messages = {
  name: {
    required: "What's your name?"
  }
}
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

