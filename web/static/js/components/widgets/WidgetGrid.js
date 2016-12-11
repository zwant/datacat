import React from 'react'
import Radium from 'radium'
import Widget from './Widget'

export default Radium((props) => {
  const { metrics } = props
  let metricsUi = null

  console.log(metrics)
  if (metrics.size > 0) {
    metricsUi = props.metrics.entrySeq().map( ([key, value]) => {
      return (
        <Widget
          key={key}
          name={key}
          value={value}
        />
      )
    })
  }

  return (
    <ul>
      {metricsUi}
    </ul>
  )
})
