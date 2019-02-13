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

## Using a Different Localization Library

For different localization libraries, the `Locale` helper can be overriden to swap out functionality. Although I’m not sure how these libraries are implemented, (I’ll look into it), we can _theoretically_ override the `Locale.get` method.

```javascript
import { Locale } from '@artisanstudio/validate.js'

Locale.get = (key) => {
  // do something with the `key` variable.
}
```

For the core extensions, `Locale` looks through a key-value pairs to return the message. It then returns the string back to the validator where the validator then replaces the template values into rule values.

@flowstart vue

get_locale=>operation: Locale.get(“email”)

does_key_exist_in_locale=>condition: Does the “email” key exist in locale?

replace_template_strings=>operation: Replace “:value” with “not-an-email”

replace_template_strings_2=>operation: Replace “:attribute” with “email”

return_locale_message=>inputoutput: “’:value’ is not a valid email address.”

return_original_key=>inputoutput: “required”

print_original_key=>end: “required”

print_error_message=>end: “‘not-an-emaiil’ is not a valid email address”



get_locale->does_key_exist_in_locale

does_key_exist_in_locale(no, right)->return_original_key->replace_template_strings_2->print_original_key

does_key_exist_in_locale(yes, down)->return_locale_message->replace_template_strings->print_error_message

@flowend



**_I’ll be honest, I just really wanted to try out the flowchart plugin._**