import React, {PropTypes as T} from 'react'
import {groupBy, values, tail, unnest} from 'ramda'

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
  return {type: 'node', name: children[0].location[0], children: toTree(children.map(locationCutHead))}
}

function leaf(item) {
  return {type: 'leaf', name: item.location[0], hash: item.hash}
}

function groupToTree(group) {
  const children = group.filter(isNode)
  return group.filter(isLeaf).map(leaf).concat(children.length > 0 ? [node(children)] : [])
}

function toTree(arr) {
  return unnest(values(groupBy(item => item.location[0], arr)).map(groupToTree))
}

const MenuNode = props => <div>
  <div>{props.name}</div>
  <Menu items={props.children} />
</div>

const MenuLeaf = props => <div>
  <a href={`#!${props.hash}`}>{props.name}</a>
</div>

const Menu = props => <div style={{paddingLeft: 10}}>
  {
    props.items.map(
      item =>
        item.type === 'leaf'
          ? <MenuLeaf {...item} />
          : <MenuNode {...item} />
    )
  }
</div>

export default React.createClass({

  propTypes: {
    menu: T.arrayOf(T.object.isRequired).isRequired,
    children: T.node,
    fullWidth: T.bool.isRequired,
  },

  render() {
    const {menu, children} = this.props
    return <div>
      <Menu items={toTree(menu)} />
      <div>{children}</div>
    </div>
  },

})
