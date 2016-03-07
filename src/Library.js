import React, {PropTypes as T} from 'react'
import Layout from './Layout'
import Router from './Router'
import mountGlobalStyles from './globalStyles'

mountGlobalStyles()

function locationToHash(location) {
  return `/${location.map(encodeURIComponent).join('/')}/`
}

export default React.createClass({

  propTypes: {
    demos: T.arrayOf(T.object.isRequired).isRequired,
  },

  render() {
    const {demos} = this.props
    const menu = demos.map(
      ({location}) => ({location, hash: locationToHash(location)})
    )
    const routes = demos.map(
      spec => ({
        hash: locationToHash(spec.location),
        content: <Layout menu={menu} fullWidth={spec.fullWidth}>
          {spec.demo}
        </Layout>,
      })
    ).concat([{
      hash: '',
      content: <Layout menu={menu} fullWidth={false}>
        ← Use menu to start exploring the library
      </Layout>,
    }])
    const notFoundRoute = {
      content: <Layout menu={menu} fullWidth={false}>404</Layout>,
    }
    return <Router routes={routes} notFoundRoute={notFoundRoute} />
  },

})
