# Usage in Vue

> We already have a package to make this with Vue!

Even though validate.js is standalone, and _is_ as a vanilla library for both Vue, and React, there are still some benefits of using a dedicated Vue plugin.

By making a Vue plugin, we can prevent from bloating the `data()` attributes, or from constantly creating a `Validator` instance whenever validation is needed.

```javascript
yarn add @artisanstudio/vue-validate.js
```

To install validate.js to all Vue instances:

```javascript
import Vue from 'vue'
import VueValidate from '@artisanstudio/vue-validate.js'

Vue.use(VueValidate)
```

It’s also possible to import the mixin version to install it in specific components.

```javascript
import Vue from 'vue'
import { VueValidateMixin } from '@artisanstudio/vue-validate.js'

Vue.component('example-component', {
  mixins: [ VueValidationMixin ],
  
  validate: {
    // ...
	},
})
```

Once installed, **validate.js** will start looking for a `validate` property  in the Vue instance.

```javascript
Vue.component('signin-form', {
  template: `
		<input type="text" @blur="$validator.passes({ email })" v-model="email">

		<input type="password" @blur="$validator.passes({ password })" v-model="password">

		<button @click.prevent="signin">Sign In</button>
	`,
  
  validate: {
    email: 'required|email',
    password: 'required|min:8'
  },
  
  data() {
    return {
      email: undefined,
      password: undefined,
		}
  },

  methods: {
    signin() {
      this.$validator.passes(this.$data)
    }
	}
})
```

Because of that, we can run the validator whenever we remove the focus off of the input.

## Nuxt

For Nuxt, it’s better to create a plugin at `plugins/validate.js` instead. That way, all of the custom validation rules can have a central place to look into. :house:

```javascript
import { Validator } from '@artisanstudio/validate.js'
import VueValidate from '@artisanstudio/vue-validate.js'
import AnotherRule from '~/lib/validation/AnotherRule'

export default (Vue) => {
  Validator.extend('another-rule', AnotherRule)
  
  Validator.extend('clean-air', class {
    passes (attribute, value) {
      const QUALITY_AIR = 50
      
      return value <= QUALITY_AIR
    }
    
    message() {
      return "The :attribute must be clean!"
    }
  })
  
  Vue.use(VueValidate)
}
```