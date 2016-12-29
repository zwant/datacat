import * as actionTypes from './actionTypes'

export function startUp () {
  // this is the redux-middleware package in action, dispatch and getState params are passed in
  return getCollectorList()
}

function receiveCollectors(json) {
  // Json will look like
  // [
  //   {
  //     "state": "inactive",
  //     "schedule": "* * * * *",
  //     "name": "example"
  //   }
  // ]
  return {
    type: actionTypes.collectorsReceived,
    collectors: new Map(
      json.collectors.map(
        (coll) => [coll.name, {schedule: coll.schedule, state: coll.state}]
      )
    )
  }
}

function collectorStateUpdated(name, state) {
  return {
    type: actionTypes.collectorStateUpdated,
    name: name,
    state: state
  }
}

export function getCollectorList() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    //dispatch(requestPosts(subreddit))

    return fetch('//localhost:4000/api/collectors/')
      .then(response => response.json())
      .then(json => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveCollectors(json))
      }
      )
      // In a real world app, you also want to
      // catch any error in the network call.
  }
}

export function toggleCollectorEnabled(name) {
  return function (dispatch, getState) {
    let url = '//localhost:4000/api/collectors/' + name + '/deactivate'
    if (getState().collectors.get(name).state === 'inactive') {
      url = '//localhost:4000/api/collectors/' + name + '/activate'
    }

    return fetch(url, {method: 'post'})
      .then(response => response.json())
      .then(json => {
        dispatch(collectorStateUpdated(name, json.state))
      })
  }
}

function newMetricType(metricName) {
  return {
    type: actionTypes.newMetricTypeReceived,
    metricName
  }
}

function newMetric(metricName, metricValue) {
  return {
    type: actionTypes.newMetricReceived,
    metricName,
    metricValue
  }
}

function newWidget(widgetName) {
  return {
    type: actionTypes.newWidgetAdded,
    widgetKey: widgetName
  }
}

export function newMetricReceived(metricData) {
  return (dispatch, getState, {emit}) => {
    const metricName = metricData.name
    const metricValue = metricData.value
    // New metric type?
    if ( !getState().metrics.has(metricName) ) {
      dispatch(newMetricType(metricName))
      dispatch(newWidget(metricName))
    }
    dispatch(newMetric(metricName, metricValue))
  }
}
