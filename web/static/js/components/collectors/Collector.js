import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'

export default Radium((props) => {
  const { theName, theValue, onClick } = props

  return (
    <li>
        <b>Name: {theName}</b>, <span onClick={onClick}>State: {theValue.state} </span>, Schedule: {theValue.schedule}
    </li>
  )
})
