import { Socket } from 'phoenix'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger';
import metricsApp from '../reducers'
import * as actions from '../actions';

export default function configureStore() {
  let socket = new Socket("/widget_socket")
  socket.connect()
  // Now that you are connected, you can join channels with a topic:
  let channel = socket.channel("outgoing_metrics:all", {})
  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })

  channel.on("new", msg =>
    store.dispatch(actions.receiveMetric(msg.name, msg.value))
  )

  const logger = createLogger()
  const createStoreWithMiddleware = applyMiddleware(logger)(createStore)
  const store = createStoreWithMiddleware(metricsApp, {})

  return store
}
