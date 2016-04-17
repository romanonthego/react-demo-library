import React from 'react'
import R from 'ramda'
import Library from '../src/Library'

const rawContext = require.context('!!raw!./components', true, /\.js$/)


const context = require.context('./components', true, /\.demo\.js$/)
const demos = context.keys().map(path => {
  const importPath = /^\.\/(.*)\.demo\.js$/.exec(path)[1]
  const sourcePath = path.replace('.demo', '')
  const name = R.last(importPath.split('/'))
  const files = []
  const rawKeys = rawContext.keys()
  if (rawKeys.indexOf(sourcePath) !== -1) {
    files.push({name: `${name}.js`, content: rawContext(sourcePath)})
  }
  if (rawKeys.indexOf(path) !== -1) {
    files.push({name: `${name}.demo.js`, content: rawContext(path)})
  }
  return {
    importPath,
    demo: context(path).default || context(path),
    location: importPath.split('/'),
    fullWidth: context(path).fullWidth || false,
    description: context(path).description || '',
    files,
  }
})

export default <Library demos={demos} />
