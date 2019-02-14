# Advanced

## Overriding Validation Rules

There might be times that certain rules are a bit opinionated, or just doesn’t fit the overall usage. For example, interally, some companies use a local email server, which conflicts with validate.js’ `email` rule since it also looks for a tld.

Rather than creating a custom rule and thinking of a different rule name to since `email` is already taken, feel free to override it so the API fits _your_ domain.

```javascript
import { Validator } from '@artisanstudio/validate.js'

Validator.extend('email', class {
  passes (attribute, value) {
    return value.split('@').length == 1
  }
})

new Validator({
  email: 'required'
}).passes({
  email: 'jake@local'
})
```

## Using Locales within Twig/Blade

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