import * as actionTypes from './actionTypes'

export function startUp () {
  // this is the redux-middleware package in action, dispatch and getState params are passed in
  return (dispatch, getState, {emit}) => {
    // Load the list of components
    emit(actionTypes.websocketMessages.collectorsRequested)
  }
}

export function getCollectorList () {
  return (dispatch, getState, {emit}) => {
    emit(actionTypes.websocketMessages.collectorsRequested)
  }
}

function newMetricType(metricName) {
  return {
    type: actionTypes.newMetricTypeReceived,
    metricName
  }
}

function newMetric(metricName, metricValue) {
  return {
    type: actionTypes.newMetricReceived,
    metricName,
    metricValue
  }
}

function newWidget(widgetName) {
  return {
    type: actionTypes.newWidgetAdded,
    widgetKey: widgetName
  }
}

export function newMetricReceived(metricData) {
  return (dispatch, getState, {emit}) => {
    const metricName = metricData.name
    const metricValue = metricData.value
    // New metric type?
    if ( !getState().metrics.has(metricName) ) {
      dispatch(newMetricType(metricName))
      dispatch(newWidget(metricName))
    }
    dispatch(newMetric(metricName, metricValue))
  }
}
