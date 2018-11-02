import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';
import SurveyCard from './SurveyCard'

class SurveyList extends Component {
  componentDidMount () {
    this.props.fetchSurveys()
  }

  renderSurveys () {
    return this.props.surveys.map(survey => {
      return (
        <SurveyCard key={survey._id} survey={survey} />
      );
    });
  }

  render () {
    return (
      <div className='container'>
        {this.renderSurveys()}
      </div>
    );
  };
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
