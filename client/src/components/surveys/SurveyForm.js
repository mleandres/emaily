import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails';
import { FIELDS } from './fields'

class SurveyForm extends Component {
  renderFields () {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          component={SurveyField}
          type='text'
          label={label}
          name={name}
          key={name}
        />
      )
    })
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {this.renderFields()}
          <Link to='/surveys' className='red btn-flat white-text'>
            Cancel
          </Link>
          <button 
            type='submit'
            className='teal btn-flat right white-text'
          >
            Next
            <i className='material-icons right'>arrow_forward</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}

  errors.recipients = validateEmails(values.recipients)

  _.each(FIELDS, ({ name, label }) => {
    if (!values[name]) {
      errors[name] = `A ${label} is required.`
    }
  })

  return errors
}


export default reduxForm({
  validate,
  form: 'newSurvey',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SurveyForm)
