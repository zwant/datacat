import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Radium from 'radium'
import * as actions from './actions'
import bind from 'lodash.bind'

import WidgetGrid from './components/widgets/WidgetGrid'

class App extends Component {
  constructor (props) {
    super(props)

    // this.getComponentList = bind(this.getComponentList, this)
  }

  componentWillMount () {
    this.props.actions.startUp()
  }

  // join (name) {
  //   this.props.actions.join(name)
  // }

  render () {
    const { collectors, metrics } = this.props

    return (
      <div>
        <WidgetGrid
          metrics={metrics}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    collectors: state.collectors,
    metrics: state.metrics
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch: dispatch,
    actions: bindActionCreators(actions, dispatch)
  }
}

export default Radium(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
