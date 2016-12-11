import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { List, Map } from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import App from './App'
import rootReducer from './reducers'
import { init as websocketInit, emit } from './actions/websocket'

const initialState = {
  metrics: Map(),
  collectors: []
}

function startUp () {
  const middleware = [ thunkMiddleware.withExtraArgument({ emit }) ]
  middleware.push(createLogger())

  const setup = applyMiddleware(...middleware)(createStore)

  const store = setup(rootReducer, initialState)
  websocketInit(store) // setup websocket listeners etc

  return store
}

ReactDOM.render(
  <Provider store={startUp()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
