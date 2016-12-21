import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

const styles = {
  value: {
    "fontSize": "5rem"
  }
}

function mapStateToProps (state) {
  return {
    metrics: state.metrics
  }
}

export default Radium(connect(
  mapStateToProps
)( (props) => {
  const { metricName, metrics } = props

  return (
    <div style={styles.value}>
      { metrics.get(metricName) }
    </div>
  )
}))
