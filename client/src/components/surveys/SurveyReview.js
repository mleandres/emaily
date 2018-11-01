import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FIELDS } from './fields'
import ReviewField from './ReviewField'
import * as actions from '../../actions'

const SurveyReview = ({ onCancel, handleSubmit, formValues, submitSurvey, history }) => {
  const reviewFields = FIELDS.map(field => {
    return (
      <ReviewField 
        key={field.name} 
        label={field.label} 
        value={formValues[field.name]}
      />
    )
  })

  return (
    <div>
      <h3>Are you sure you want to send this survey?</h3>
      <div style={{ margin: '10px 0' }}>
        {reviewFields}
      </div>
      <button 
        className='red btn-flat white-text'
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className='green btn-flat right white-text'
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  )
}

function mapStateToProps (state) {
  const { values } = state.form.newSurvey
  return {
    formValues: values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview))
