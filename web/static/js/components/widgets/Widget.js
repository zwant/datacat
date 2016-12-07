import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Widget = ({theName, theValue}) => (
  <div className="metrics-widget">
    <div className="metrics-header"> { theName } </div>
    <div className="metrics-value"> { theValue } </div>
  </div>
)

Widget.propTypes = {
  theName: PropTypes.string.isRequired,
  theValue: PropTypes.number.isRequired
}

export default Widget
