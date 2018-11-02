import React from 'react'
import { connect } from 'react-redux'
import { deleteSurvey } from '../../actions'

// put delete action here and call it with button

const SurveyCard = ({ deleteSurvey, survey }) => {
  return (
    <div className='card blue-grey darken-1'>
      <div className="card-image waves-effect waves-block waves-light">
      </div>
      <div className='card-content white-text'>
        <span className='card-title'>{survey.title}
          <a className='btn-small red right' onClick={() => deleteSurvey(survey._id)}>
            <i className='material-icons white-text'>delete</i>
          </a>
        </span>
        <p>
          {survey.body}
        </p>
        <p className='right'>
          Sent On: {new Date(survey.dateSent).toLocaleDateString()}
        </p>
      </div>
      <div className='card-action'>
        <a style={{ cursor: 'default' }}>Yes: {survey.yes}</a>
        <a style={{ cursor: 'default' }}>No: {survey.no}</a>
        <a style={{ cursor: 'default' }} className='right'>Total: {survey.yes + survey.no}</a>
      </div>
    </div>
  )
}

export default connect(null, { deleteSurvey })(SurveyCard)
