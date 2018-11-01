import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyReview from './SurveyReview'

class SurveyNew extends Component {
  constructor (props) {
    super(props)
    // bind toggle review so it changes the state here when called implicitly by child components
    // on submit
    this.toggleReview = this.toggleReview.bind(this)

    this.state = {
      showReview: false
    }
  }

  toggleReview () {
    this.setState({ showReview: !this.state.showReview })
  }
    
    renderContent () {
      if (this.state.showReview) {
      return <SurveyReview onCancel={this.toggleReview} />
    }

    return <SurveyForm onSubmit={this.toggleReview} />
  }

  render () {
    return (
      <div style={{ marginTop: '10px' }} >
        {this.renderContent()}
      </div>
    )
  }
}

// this works out because when unmounting THIS component, form values are cleared as default
export default reduxForm({
  form: 'newSurvey'
})(SurveyNew)
