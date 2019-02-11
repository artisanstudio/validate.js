# Available Validation Rules

<ul class="m-link-list">
  <li><a href="#between">Between</a></li>
  <li><a href="#email">E-Mail</a></li>
  <li><a href="#file">File</a></li>
  <li><a href="#in">In</a></li>
  <li><a href="#max">Max</a></li>
  <li><a href="#min">Min</a></li>
  <li><a href="#mime-types">MIME Types</a></li>
  <li><a href="#not-in">Not In</a></li>
  <li><a href="#required">Required</a></li>
  <li><a href="#size">Size</a></li>
  <li><a href="#string">String</a></li>
  <li><a href="#url">URL</a></li>
</ul>



::: warning

For now, I’m directly copying the [Laravel’s validation rules](<https://laravel.com/docs/5.7/validation>) descriptions. It’s much more familiar and better written.

:::

## Between

The field under validation must have a size between the given *min* and *max*. Strings, numerics, arrays, and files are evaluated in the same fashion as the [`size`](#size) rule.

```javascript
{ age: 'between:18,24' }
```

The `Rule.between` method may be used to for readability.

```javascript
import { Validator, Rule } from '@artisanstudio/validate.js'

new Validator({
  age: ['required', Rule.between(18, 24)]
})
```

## Email







## Size

`size:value`

The field under validation must have a size matching the given *value*. 

- For string data, *value* corresponds to the number of characters. 
- For numeric data, *value* corresponds to a given integer value. 
- For an array, *size* corresponds to the `count` of the array. 
- For files, *size*corresponds to the file size in kilobytes.