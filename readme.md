# Validate.js

**WIP** There will be breaking changes prior to v1, use at your own risk.

**validate.js** is a dependency-free, extensible, localizable, validation library.

To ensure that the library is built on extensibility, every single rule is an extension.

## Installation

```bash
yarn add @artisanstudio/validate.js
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

## Using validate.js in Vue
Here's a Vue mixin to make it work. (We'll make it into a package later!)

```javascript
const VueValidate = {
    data() {
        return {
            validator: new Validator(this.$options.validate),
        }
    }
}

Vue.mixin(VueValidate)
```

Inside your Vue components, we can use a custom `validate` property.

```javascript
Vue.component('signin', {
    template: `
        <input @blur="validator.passes({ email })">
        <p v-if="validator.errors.first('email')">
            {{ validator.errors.first('email') }}
        </p>
    `,

    validate: {
        email: 'required|email',
        password: 'required|min:8',
    },

    data () {
        return { email: undefined, password: undefined }
    },
})
```


## Available Rules

- ~~between~~
- `email`
- ~~max~~
- `min`
- `required`

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