import React, { Component } from 'react';
import { connect } from 'react-redux'
import Collector from './Collector'
import Radium from 'radium'
import { toggleCollectorEnabled } from '../../actions'

function mapStateToProps (state) {
  return {
    collectors: state.collectors
  }
}

export default Radium(connect(
  mapStateToProps
)( (props) => {
  const { collectors, dispatch } = props

  return (
    <div>
    Collectors:
      <ul>
        {[...collectors].map(([name, value]) =>
          <Collector key={name}
                     theName={name}
                     theValue={value}
                     onClick={() => dispatch(toggleCollectorEnabled(name))}/>
        )}
      </ul>
    </div>
  )
}))
