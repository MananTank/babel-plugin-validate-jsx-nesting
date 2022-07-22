# babel-plugin-validate-jsx-nesting

### Compile time JSX nesting validation

Example

```html
Failed to Compile.

Error: Invalid HTML nesting: <hr> can not be child of <p>
  1 | <p>
  2 |   <span> Hello </span>
> 3 |   <hr />
    |   ^^^^^^
  4 |   <span> World </span>
  5 | </p>
  6 |
```

<br />

### Why this validation is important?

without such validation, when JSX is converted to HTML and rendered in the DOM, the Browser will try to fix the invalid nestings ( such as `<hr>` inside `<p>` ) and thus the rendered DOM will have a different structure than JSX structure.

This is a big issue for frameworks that rely on JSX rendering the exact same elements in DOM. This can lead to unexpected behaviors.

<br />

### Validation library

This babel plugin uses the [validate-html-nesting](https://github.com/MananTank/validate-html-nesting) library for validating HTML element nesting

<br />

## Install

```
npm i -D babel-plugin-validate-jsx-nesting
```

<br />

## babel config

Refer to the [babel config](https://babeljs.io/docs/en/configuration) guide to learn about configuring babel

## no options

with this config, the plugin throws an error when invalid JSX nesting is found

```json
{
	"plugins": ["validate-jsx-nesting"]
}
```

<br />

### with `warnOnly: true` option

With this config, the plugin logs a warning when invalid JSX nesting is found

```json
{
	"plugins": [["validate-jsx-nesting", { "warnOnly": true }]]
}
```
