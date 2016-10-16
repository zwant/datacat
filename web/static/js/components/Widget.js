import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Widget = ({theName, theValue}) => (
  <div>
    <h2> Name: { theName } Value: { theValue } </h2>
  </div>
)

Widget.propTypes = {
  theName: PropTypes.string.isRequired,
  theValue: PropTypes.number.isRequired
}

export default Widget
