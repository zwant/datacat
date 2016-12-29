import * as actionTypes from '../actions/actionTypes'

const collectors = (state = {}, action) => {
  if (action.type === actionTypes.collectorsReceived) {
    return action.collectors
  }
  if (action.type === actionTypes.collectorStateUpdated) {
    return new Map([...state].map(([name, value]) => {
      if (name === action.name) {
        return [name, Object.assign({}, value, {
          state: action.state
        })]
      }
    }))
  }
  return state
}

export {
  collectors
}
