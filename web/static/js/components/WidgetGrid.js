import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Widget from './Widget'

const WidgetGrid = ({metrics}) => (
  <ul>
    {Object.keys(metrics).map(metricName =>
      <Widget
        key={metricName}
        theName={metricName}
        theValue={metrics[metricName]}
      />
    )}
  </ul>
)

WidgetGrid.propTypes = {
  metrics: PropTypes.object.isRequired
}

export default WidgetGrid
