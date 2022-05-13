# babel-plugin-validate-jsx-nesting

### compile time JSX nesting validation

<img src='assets/ss1.png' />

<br />

### Why this validation is important?

without such validation, when jsx is converted to html and rendered in the DOM, browser will try to fix the invalid nestings ( such as `<hr>` inside `<p>` ) and thus the rendered DOM will have different structure than JSX structure.

This is a big issue for frameworks which rely on JSX rendering the exact same elements in DOM. This can lead to unexpected behaviors.

<br />

### Validation library

This babel plugin uses [validate-html-nesting](https://github.com/MananTank/validate-html-nesting) library for validating html element nesting

<br />

## Install

```
npm i -D babel-plugin-validate-jsx-nesting
```

<br />

## babel config

Refer to [babel config](https://babeljs.io/docs/en/configuration) guide to learn about configuring babel

## no options

with this config plugin throws error when invalid jsx nesting is found

```json
{
	"plugins": ["validate-jsx-nesting"]
}
```

<br />

### with `warnOnly: true` option

with this config plugin logs a warning when invalid jsx nesting is found

```json
{
	"plugins": [["validate-jsx-nesting", { "warnOnly": true }]]
}
```
