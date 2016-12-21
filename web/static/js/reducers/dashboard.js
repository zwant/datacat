import * as actionTypes from '../actions/actionTypes'
import JustANumberWidget from '../components/widgets/JustANumberWidget'
import LineChartWidget from '../components/widgets/LineChartWidget'
import { addWidget } from 'react-dazzle';

const widgets = (state = {}, action) => {
  if (action.type === actionTypes.newMetricTypeReceived) {
    return Object.assign({}, state, {
      [action.metricName]: {
        type: JustANumberWidget,
        title: action.metricName,
        props: {
          metricName: action.metricName
        }
      }
    })
  }
  return state
}

const defaultLayout = {
  rows: [{
    columns: [{
      className: 'col-md-12',
      widgets: [],
    }],
  }],
}

const layout = (state = defaultLayout, action) => {
  if (action.type === actionTypes.newWidgetAdded) {
    return addWidget(state, 0, 0, action.widgetKey)
  }
  return state
}

export {
  widgets,
  layout
}
