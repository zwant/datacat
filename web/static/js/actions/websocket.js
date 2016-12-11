import { Socket } from 'phoenix'
import { messageTypes } from '../config'
import * as actionTypes from './actionTypes'

const socket = new Socket("/widget_socket")
let channel = null

const init = (store) => {
  socket.connect()
  // Now that you are connected, you can join channels with a topic:
  channel = socket.channel("outgoing_metrics:all", {})
  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })
  // add listeners to socket messages so we can re-dispatch them as actions
  Object.keys(messageTypes)
    .forEach(type => {
      channel.on(type, (payload) => {
        store.dispatch({ type, payload })
      })}
    )
}

const emit = (type, payload) => {
  console.log("woop")
  channel.push(type, payload)
}

export {
  init,
  emit
}
