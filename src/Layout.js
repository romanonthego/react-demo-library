import React, {PropTypes as T} from 'react'
import {groupBy, values, tail, unnest} from 'ramda'

const MENU_WIDTH = 250

const styles = {
  menu: {
    fontFamily: 'helvetica, arial, sans-serif',
    borderLeft: 'dotted 1px #ccc',
    marginLeft: 6,
    paddingLeft: 4,
  },
  menuWrap: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: MENU_WIDTH,
    background: '#f5f5f5',
    borderRight: 'solid 1px #ddd',
    boxSizing: 'border-box',
    padding: '20px 10px 0',
    overflow: 'auto',
  },
  node: {
    padding: '6px 0',
  },
  nodeName: {
    marginBottom: 5,
    opacity: '.4',
    fontSize: '14px',
  },
  leaf: {
    display: 'block',
    textDecoration: 'none',
    color: 'black',
    fontSize: '14px',
  },
  content: {
    marginLeft: MENU_WIDTH,
    padding: 10,
  }
}



function locationCutHead(item) {
  return {...item, location: tail(item.location)}
}

function isLeaf(item) {
  return item.location.length === 1
}

function isNode(item) {
  return item.location.length > 1
}

function node(children) {
  return {
    type: 'node',
    name: children[0].location[0],
    children: toTree(children.map(locationCutHead)),
  }
}

function leaf(item) {
  return {
    type: 'leaf',
    name: item.location[0],
    hash: item.hash,
  }
}

function groupToTree(group) {
  const children = group.filter(isNode)
  return group.filter(isLeaf).map(leaf).concat(children.length > 0 ? [node(children)] : [])
}

function toTree(arr) {
  return unnest(values(groupBy(item => item.location[0], arr)).map(groupToTree))
}

const MenuNode = props => <div style={styles.node}>
  <div style={styles.nodeName}>{props.name}</div>
  <Menu items={props.children} />
</div>

const MenuLeaf = props => <a href={`#!${props.hash}`} style={styles.leaf}>{props.name}</a>

const Menu = props => {
  const style = {...styles.menu, ...(props.topLevel ? {borderLeft: 'none'} : {})}
  return <div style={style}>
    {
      props.items.map(
        item =>
          item.type === 'leaf'
            ? <MenuLeaf {...item} />
            : <MenuNode {...item} />
      )
    }
  </div>
}

export default React.createClass({

  propTypes: {
    menu: T.arrayOf(T.object.isRequired).isRequired,
    children: T.node,
    fullWidth: T.bool.isRequired,
  },

  render() {
    const {menu, children} = this.props
    return <div>
      <div style={styles.menuWrap}>
        <Menu items={toTree(menu)} topLevel />
      </div>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  },

})
