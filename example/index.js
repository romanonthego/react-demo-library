import React from 'react'
import Library from '../src/Library'

const context = require.context('./components', true, /\.demo\.js$/)
const demos = context.keys().map(path => {
  const importPath = /^\.\/(.*)\.demo\.js$/.exec(path)[1]
  return {
    importPath,
    demo: context(path).default || context(path),
    location: importPath.split('/'),
    fullWidth: context(path).fullWidth || false,
    description: context(path).description || '',
  }
})

export default <Library demos={demos} />

