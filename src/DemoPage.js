import React, {PropTypes as T} from 'react'
import {unnest, last} from 'ramda'

const MONO_FONT = 'Menlo, Monaco, Consolas, "Lucida Console", monospace'
const SERIF_FONT = '"Lucida Grande", Helvetica, arial, sans-serif'

const styles = {
  metaWrap({fullWidth}) {
    return {
      padding: fullWidth ? '0 10px' : 0,
    }
  },
  location: {
    fontSize: 18,
    fontFamily: SERIF_FONT,
    color: '#aaa',
    marginBottom: 10,
  },
  locationItem({last}) {
    return {
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
  },
  files({fullWidth}) {
    return {
      margin: fullWidth ? '20px 10px' : '20px 0',
    }
  },
  fileName: {
    fontFamily: SERIF_FONT,
    fontSize: 14,
    fontWeight: 'bold',
  },
  fileContnet: {
    fontFamily: MONO_FONT,
    fontSize: 11,
    margin: '5px 0 20px 0',
    background: '#d7e5ec',
    padding: 5,
    borderRadius: 3,
    overflow: 'auto',
  },
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
    description: T.node,
    files: T.arrayOf(T.shape({name: T.string.isRequired, content: T.string.isRequired}).isRequired),
  },

  renderFile(file, index) {
    return <div key={index}>
      <div style={styles.fileName}>{file.name}</div>
      <pre style={styles.fileContnet}>{file.content}</pre>
    </div>
  },

  render() {
    const {demo, fullWidth, location, importPath, description, files} = this.props
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
      {
        files && <div style={styles.files({fullWidth})}>
          {files.map(this.renderFile)}
        </div>
      }
    </div>
  },

})
