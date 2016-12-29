import { Socket } from 'phoenix'
import * as actionTypes from './actionTypes'
import { newMetricReceived, newCollectorReceived } from '.'

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
  channel.on(actionTypes.websocketMessages.newMetricMessage, (payload) => {
    store.dispatch(newMetricReceived(payload))
  })
  channel.on(actionTypes.websocketMessages.newCollectorMessage, (payload) => {
    store.dispatch(newCollectorReceived(payload))
  })
}

const emit = (type, payload) => {
  channel.push(type, payload)
}

export {
  init,
  emit
}
