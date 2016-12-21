import * as actionTypes from '../actions/actionTypes'

const metrics = (state = {}, action) => {
  if (action.type === actionTypes.newMetricReceived) {
    return state.set(action.metricName, action.metricValue)
  }
  return state
}

export {
  metrics
}
