import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MetricsWidgetGrid from '../containers/MetricsWidgetGrid'
import {Socket} from "phoenix"

const App = () => (
  <div>
    <MetricsWidgetGrid />
  </div>
)
export default App
