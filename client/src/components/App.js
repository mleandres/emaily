// React Router side
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import withFetchUser from '../utils/withFetchUser'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'

class App extends Component {
  componentDidMount () {
    document.title = 'Survey Sender'
  }

  render () {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route path='/' component={Landing} exact />
          <Route path='/surveys' component={Dashboard} exact />
          <Route path='/surveys/new' component={SurveyNew} exact />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(withFetchUser(App))
