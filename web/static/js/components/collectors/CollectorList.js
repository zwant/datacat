import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Collector from './Collector'

const CollectorList = ({collectors}) => (
  <ul>
    {Object.keys(collectors).map(collectorName =>
      <Collector
        key={collectorName}
        theName={collectorName}
      />
    )}
  </ul>
)

CollectorList.propTypes = {
  collectors: PropTypes.object.isRequired
}

export default CollectorList
