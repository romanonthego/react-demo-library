import React from 'react'

export default React.createClass({

  render() {
    return <pre>
      {JSON.stringify(this.props, null, 2)}
    </pre>
  },

})
