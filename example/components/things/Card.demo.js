import React from 'react'
import Demo, {props as P} from 'react-demo'
import Card from './Card'

export const fullWidth = true

export const description = `
  React abstracts away the DOM from you, giving a simpler programming model
  and better performance. React can also render on the server using Node,
  and it can power native apps using React Native.
`

export default <Demo
  target={Card}
  props={{
    label: P.string('label'),
    value: P.string('value'),
    onChange: P.callback.log(),
  }}
  fullWidth
/>

