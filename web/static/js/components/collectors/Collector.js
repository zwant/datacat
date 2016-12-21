import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Collector = ({theName}) => (
  <div className="collector-entry">
    <div className="collector-name"> { theName } </div>
  </div>
)

Collector.propTypes = {
  theName: PropTypes.string.isRequired,
  theValue: PropTypes.number.isRequired
}

export default Collector
