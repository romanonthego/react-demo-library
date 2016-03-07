import React from 'react'
import Demo, {props as P} from 'react-demo'
import Button from './Button'

export default <Demo
  target={Button}
  props={{
    label: P.string('label'),
    value: P.string('value'),
    onChange: P.callback.log(),
  }}
/>

