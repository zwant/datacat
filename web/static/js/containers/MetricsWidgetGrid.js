import { connect } from 'react-redux'
import WidgetGrid from '../components/widgets/WidgetGrid'

const mapStateToProps = (state) => {
  return {metrics: state.metrics}
}

const MetricsWidgetGrid = connect(
  mapStateToProps
)(WidgetGrid)

export default MetricsWidgetGrid
