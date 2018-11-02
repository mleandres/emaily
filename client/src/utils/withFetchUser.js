// higher order component which adds fetchUser action to componentDidMount method
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount () {
      this.props.fetchUser();
    }

    render () {
      return <ChildComponent {...this.props} />;
    }
  }

  return connect(null, { fetchUser })(ComposedComponent)
}
