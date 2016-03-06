import React from 'react'
import Demo, {props as P} from 'react-demo'
import Input from './Input'

export default <Demo
  target={Input}
  props={{
    label: P.string('label'),
    value: P.string('value'),
    onChange: P.callback.log(),
  }}
/>
