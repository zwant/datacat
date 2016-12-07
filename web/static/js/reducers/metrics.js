import { newMetric } from '../config'

const metrics = (state = {}, action) => {
  if (action.type === newMetric) {
    return { ...state, [action.metricName]: action.theValue }
  }
  return state
}

export {
  metrics
}
