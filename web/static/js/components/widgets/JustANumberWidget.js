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
  console.log(metrics)
  return (
    <div style={styles.value}>

    </div>
  )
}))

//{ metrics.get(metricName).currentValue }
