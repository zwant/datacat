import { connect } from 'react-redux'
import CollectorList from '../components/collectors/CollectorList'

const mapStateToProps = (state) => {
  return {collectors: state.collectors}
}

const DataCollectorList = connect(
  mapStateToProps
)(CollectorList)

export default DataCollectorList
