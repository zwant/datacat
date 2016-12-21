import { combineReducers } from 'redux'
import { metrics } from './metrics'
import { collectors } from './collectors'
import { widgets, layout } from './dashboard'

export default combineReducers({
  metrics,
  collectors,
  widgets,
  layout
})
