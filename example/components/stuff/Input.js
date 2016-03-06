import React, {PropTypes as T} from 'react'

export default React.createClass({

  propTypes: {
    label: T.string.isRequired,
    value: T.string.isRequired,
    onChange: T.func.isRequired,
  },

  render() {
    const {label, value, onChange} = this.props
    return <div>
      <label>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} />
    </div>
  },

})
