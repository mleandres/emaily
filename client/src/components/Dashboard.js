import React from 'react'
import { Link  }from 'react-router-dom'
import SurveyList from './surveys/SurveyList'
import requireAuth from '../utils/requireAuth'

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className='fixed-action-btn bottom right'>
        <Link to='/surveys/new' className='btn-floating btn-large green'>
          <i className='large material-icons'>add</i>
        </Link>
      </div>
    </div>
  )
}

export default requireAuth(Dashboard)
