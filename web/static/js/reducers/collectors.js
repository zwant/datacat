import { messageTypes } from '../config'

const collectors = (state = {}, action) => {
  if (action.type === messageTypes.collectors_requested) {
    return { ...state, [action.payload.name]: action.payload.value }
  }
  return state
}

export {
  collectors
}
