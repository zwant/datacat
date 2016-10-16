import  { combineReducers } from 'redux'
import { METRIC_RECEIVED } from '../actions'


function metrics(state = {}, action) {
  switch(action.type) {
    case METRIC_RECEIVED:
      return { ...state, [action.metricName]: action.theValue }
    default:
      return state
  }
}

const metricsApp = combineReducers({
  metrics
})

export default metricsApp
