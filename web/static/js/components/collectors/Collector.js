import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Radium from 'radium'

export default Radium((props) => {
  const { theName, theValue, onClick } = props

  return (
    <li>
        <div>
          {theName}
          <button onClick={onClick}> {theValue.state} </button>
          Schedule: {theValue.schedule}
        </div>
    </li>
  )
})
