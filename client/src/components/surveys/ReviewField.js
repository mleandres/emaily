import React from 'react'

const ReviewField = ({label, value}) => {
  return (
    <div>
      <label>{label}</label>
      <div>{value}</div>
    </div>
  )
}

export default ReviewField
