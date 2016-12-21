import * as actionTypes from '../actions/actionTypes'

const collectors = (state = {}, action) => {
  if (action.type === actionTypes.newCollectorReceived) {
    return { ...state, [action.payload.name]: action.payload.value }
  }
  return state
}

export {
  collectors
}
