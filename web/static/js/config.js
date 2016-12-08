// makes an object of the form {new_metric: 'new_metric'}
export const messageTypes = [
  'new_metric'
].reduce((accum, msg) => {
  accum[ msg ] = msg
  return accum
}, {})
