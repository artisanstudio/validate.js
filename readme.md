# validate.js

**WIP: This is still in early development, some APIs are still subject to change.**

> validate.js is a lightweight and extensible validation library for javascript.

The interface is heavily based off of Laravel's validation library.

[Read the full documentation here](https://artisanstudio.github.io/validate.js/guide/)

Here's a snippet!

```
import { Validator } from '@artisanstudio/validate.js'

const validator = new Validator({
    email: 'required|email'
})

validator.passes({
    email: 'not-an-email',
})
```
