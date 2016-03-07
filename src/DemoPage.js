import React, {PropTypes as T} from 'react'
import {unnest, last} from 'ramda'

const MONO_FONT = 'Menlo, Monaco, Consolas, "Lucida Console", monospace'
const SERIF_FONT = 'helvetica, arial, sans-serif'

const styles = {
  metaWrap({fullWidth}) {
    return {
      padding: fullWidth ? '0 10px' : 0,
    }
  },
  location: {
    fontSize: 20,
    fontFamily: SERIF_FONT,
    color: '#666',
    marginBottom: 10,
  },
  locationItem({last}) {
    return {
      fontSize: last ? 24 : 'inerit',
      color: last ? '#000' : 'inerit',
    }
  },
  locationDel: {
    margin: '0 .2em',
    color: '#aaa',
  },
  import: {
    fontFamily: MONO_FONT,
    fontSize: 14,
    marginBottom: 10,
    color: '#aaa',
    float: 'right',
  },
  description: {
    maxWidth: 600,
    marginBottom: 10,
    fontFamily: SERIF_FONT,
    fontSize: 14,
  }
}

function locationItem(name, i, {length}) {
  const last = length === i + 1
  return [
    <span key={`${i}item`} style={styles.locationItem({last})}>{name}</span>,
    !last && <span key={`${i}del`} style={styles.locationDel}>/</span>,
  ]
}

export default React.createClass({

  propTypes: {
    demo: T.node,
    fullWidth: T.bool,
    location: T.array.isRequired,
    importPath: T.string,
    description: T.string, // TODO: markdown support
  },

  render() {
    const {demo, fullWidth, location, importPath, description} = this.props
    const name = last(location)
    return <div>
      <div style={styles.metaWrap({fullWidth})}>
        <div style={styles.import}>
          import {name} from '{importPath}'
        </div>
        <div style={styles.location}>
          {unnest(location.map(locationItem))}
        </div>
        <div style={styles.description}>
          {description}
        </div>
      </div>
      <div>
        {demo}
      </div>
    </div>
  },

})
