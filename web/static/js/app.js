import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Radium from 'radium'
import * as actions from './actions'
import bind from 'lodash.bind'

import Dashboard from './components/Dashboard'

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
    const { layout, widgets } = this.props

    return (
      <div>
        <Dashboard layout={layout} widgets={widgets}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    layout: state.layout,
    widgets: state.widgets
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
