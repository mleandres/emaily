import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'

export default WrappedComponent => {
  class ComponentWithRequireAuth extends Component {
    isAuth () {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }
    componentDidMount () {
      this.isAuth();
    }

    componentDidUpdate () {
      this.isAuth();
    }

    render () {
      return <WrappedComponent {...this.props} />;
    }
  }
  
  function mapStateToProps ({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(ComponentWithRequireAuth)
}
