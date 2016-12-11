import { combineReducers } from 'redux'
import { metrics } from './metrics'
import { collectors } from './collectors'

export default combineReducers({
  metrics,
  collectors
})
