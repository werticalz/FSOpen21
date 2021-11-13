import React from 'react'
import { connect } from 'react-redux'
import { defineFilter } from '../reducers/filterReducer'

const Filter = ({ defineFilter }) => {
  const handleChange = (event) => {
    defineFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { defineFilter })(Filter)