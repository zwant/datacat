/*
 * action types
 */
export const METRIC_RECEIVED = 'METRIC_RECEIVED'

/*
 * action creators
 */
export function receiveMetric(metricName, theValue) {
  return { type: METRIC_RECEIVED, metricName, theValue }
}
