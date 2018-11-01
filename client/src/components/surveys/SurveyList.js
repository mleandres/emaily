import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';

class SurveyList extends Component {
  componentDidMount () {
    this.props.fetchSurveys()
  }

  renderSurveys () {
    return this.props.surveys.map(survey => {
      return (
        <div key={survey._id} className='card darken-1'>
          <div className='card-content'>
            <span className='card-title'>{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className='right'>
              Sent On: {survey.body}
            </p>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  };
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
