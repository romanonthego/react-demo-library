import React, {PropTypes as T} from 'react'

export default React.createClass({

  propTypes: {
    routes: T.arrayOf(T.object.isRequired).isRequired,
    notFoundRoute: T.object.isRequired,
  },

  getCurrentRoute() {
    const {routes, notFoundRoute} = this.props
    const hash = location.hash.slice(2) // removes #!
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i]
      if (route.hash === hash) {
        return route
      }
    }
    return notFoundRoute
  },

  handleHashChange() {
    this.forceUpdate()
  },

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange)
  },

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange)
  },

  render() {
    return this.getCurrentRoute().content
  },

})
