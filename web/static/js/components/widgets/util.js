export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function buildWidget(key, value) {
  return (
    ["DefaultWidget-" + key]: {
      type: Widget,
      title: key,
    }
  )
}
// const { metrics } = props
// let widgets = null
// if (metrics.size > 0) {
//   widgets = props.metrics.entrySeq().map( ([key, value]) => {
//     return buildWidget(key, value)
//   })
// }
// console.log(widgets)
// let widgetObj = {}
// widgets.forEach( (widget) => {
//   widgetObj[widget.]
// })
