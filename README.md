# react-demo-library

A [React](https://facebook.github.io/react/) component that helps you to build
a library of [react-demo](https://github.com/rpominov/react-demo) demos


## Installation

```
$ npm install react-demo-library
```


## Usage

The following will give you a nice library of your components with a navigation menu on left side.
Each components will have it's own page with a #hash URL.
For `fullWidth` demos menu will be hidden.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Demo from 'react-demo'
import Library from 'react-demo-library'

ReactDOM.render(
  <Library
    demos={[
      {
        // Location in the menu hierarchy, this also affects URL (e.g. #!Foo/Bar/Baz/)
        location: ['Foo', 'Bar', 'Baz'],

        // The demo React-element
        demo: <Demo ... />,

        // Description (will be shown on the demo page)
        description: "...",

        // Import path (will be shown on the demo page)
        import: "foo/bar/Baz",

        // Whether component needs full width of browser window
        // to be available for it. You should also specify it in Demo: <Demo fullWidth ... />
        fullWidth: true,

        // Files (will be shown on the demo page)
        files: [{name, content}],
      },
      {
        ...
      },
      ...
    ]}
  />,
  document.getElementById('app')
)
```
