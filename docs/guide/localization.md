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

Locale.load(Tagalog)
validator.errors.first('name') // Ano pangalan mo?

Locale.load(Ilonggo)
validator.errors.first('name') // Ano ngalan mo?

Locale.load(Bisaya)
validator.errors.first('name') // Unsa imo ngalan?

```

## How we use locales within Twig/Balde

In Laravel, we want to use one point of Localization between the front-end, and the 

bakend. Since the server also uses our localization files for API level, and server rending other things, we inject the locale files into the view.

We first print the JSON locale:

```twig
<script>
  /**
   * This takes in the user's preferred locale via the "HTTP_ACCEPT_LANGUAGE"
   * header and returns all the messages from the localization JSON file.
   */
  window.App.locale = {{ Locale::all() }}
<script>
```

Alternatively, you can pull it in from the server via an API or a CDN (maybe?)

Next up is we load the messages to validate.js’ Locale helper.

```javascript
import { Locale } from '@aritsanstudio/validate.js'

Locale.load(window.App.locale)
```

In the use case that we need to switch between multiple locales on the frontend, then we can pull in all of our locales and switch from there.

```twig
<script>
  window.App.locale = {{ Locale::only('en', 'ph') }}
<script>
```

Then choose the preferred locale from there.

```javascript
Lang.load(window.App.locale.en)

Lang.load(window.App.locale.ph)
```

