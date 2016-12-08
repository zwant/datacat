import { messageTypes } from '../config'

export function getCollectorList () {
  console.log("moo")
  return (dispatch, getState, {emit}) => {
    emit(messageTypes.joinRequested, {})
  }
}
