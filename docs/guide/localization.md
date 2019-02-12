# Localization

::: warning

The localization implementation is still being heavily worked on.

:::



Things I want here:

- No coupled implementation of a language library so people can use the localization library of their choice.
- The language can be changed in runtime?
- The existing rules need to be changed depending on the user’s needs.



```javascript
import { Tagalog, Bisaya, Ilonggo } from './languages/philippines'
import { Validator, Locale } from '@artisanstudio/validate.js'

const validator = new Validator({
	name: 'required'
})

validator.check({ name: undefined })
validator.errors.first('name') // What's your name?

Locale.change(Tagalog)
validator.errors.first('name') // Ano pangalan mo?

Locale.change(Ilonggo)
validator.errors.first('name') // Ano ngalan mo?

Locale.change(Bisaya)
validator.errors.first('name') // Unsa imo ngalan?

```

