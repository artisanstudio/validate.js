# Oh Hai, Mark!

**validate.js** is a validation library that focuses on being extensible, usable, and localisable. It’s heavily based off of [Laravel’s validation API](https://laravel.com/docs/5.7/validation).



# validate.js

> **validate.js** is a dependency-free, extensible, localizable, validation library.

To ensure that the library is built on extensibility, every single rule is an extension.

## Installation

```bash
yarn add @artisanstudio/validate.js
```



# Getting Started

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
  email: ['required', 'email'],
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

## Available Rules

- ~~between~~
- `email`
- ~~max~~
- `min`
- `required`

### required

```javascript
new Validator {
}
```



### max





## Custom Validation

### Extensions

If a named rule is needed within different parts of your application, the `extend` method can be used.

```
Validator.extend('between', class {
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
})
```

### Inline Classes

There are some times that we just want to try out some implementation before abstracting to a named rule. If that is needed, use a class directly on the Validator!

```javascript
const validator = new Validator({
    name: class {
        passes(attribute, value) {
            return value.split(" ").length >= 2
        }

        message () {
            return "The :attribute must be at least 2 words long."
        }
    },
})
```

## Localization

**This section is still heavily being worked on.**

```javascript
const validator = new Validator()

validator.errors.first('email') // The email field must be required.

validator.setLanguage(new Language({
    required: "Hindi pwedeng walang laman ang :attribute."
}))

validator.errors.first('email') // Hindi pwedeng walang laman ang email.
```

To organize your localization files better, extract your messages in its own dedicated javascript files.

```javascript
import tagalog from './lang/ph'

const validator = new Validator({
    // ...
})

validator.setLanguage(new Language(tagalog))
```

