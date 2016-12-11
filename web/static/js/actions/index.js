import { messageTypes } from '../config'

export function startUp () {
  // this is the redux-middleware package in action, dispatch and getState params are passed in
  return (dispatch, getState, {emit}) => {
    // Load the list of components
    emit(messageTypes.collectors_requested)
  }
}

export function getCollectorList () {
  console.log("moo")
  return (dispatch, getState, {emit}) => {
    emit(messageTypes.collectors_requested)
  }
}
