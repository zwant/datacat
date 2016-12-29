import * as actionTypes from '../actions/actionTypes'
import { Map as ImmutableMap } from 'immutable';

function updateCollectorState(state, collector_name, collector_state) {
  return new ImmutableMap([...state].map(([name, value]) => {
    if (name === collector_name) {
      return [name, Object.assign({}, value, {
        state: collector_state
      })]
    } else {
      return [name, value]
    }
  }))
}

function updateCollector(state, collector_name, new_data) {
  return new ImmutableMap([...state].map(([name, value]) => {
    if (name === collector_name) {
      return [name, Object.assign({}, value, {
        schedule: new_data.schedule,
        state: new_data.state
      })]
    } else {
      return [name, value]
    }
  }))
}

const collectors = (state = {}, action) => {
  if (action.type === actionTypes.collectorsReceived) {
    return action.collectors
  }

  if (action.type === actionTypes.collectorStateUpdated) {
    return updateCollectorState(state, action.name, action.state)
  }

  if (action.type === actionTypes.newCollectorReceived) {
    if(state.has(action.collectorName)) {
      return updateCollector(state,
                             action.collectorName,
                             {state: action.collectorState, schedule: action.collectorSchedule})
    }
    return state.set(action.collectorName,
                     {state: action.collectorState, schedule: action.collectorSchedule})
  }

  return state
}

export {
  collectors
}
