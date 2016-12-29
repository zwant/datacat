import * as actionTypes from '../actions/actionTypes'
import { List as ImmutableList, Map as ImmutableMap } from 'immutable';

const metrics = (state = {}, action) => {
  if (action.type === actionTypes.newMetricReceived) {
    if (state.has(action.metricName)) {
      return state.update(action.metricName, {
          currentValue: action.metricValue,
          history: state.get(action.metricName).history.push(action.metricValue)
        }
      )
    }

    return state.set(action.metricName, {currentValue: action.metricValue,
                                         history: ImmutableList([action.metricValue])})
  }
  return state
}

export {
  metrics
}
