import React from 'react'
import Radium from 'radium'

const styles = {
  containerDiv: {
    width: "percentage(1/7)",
    float: "left",
    textAlign: "center",
    padding: "0.5rem",
    margin: "1rem",
    borderRadius: "0.25rem",
    backgroundColor: "rgb(74, 174, 249)"
  },
  header: {
    "fontWeight": "400",
    "fontSize": "4rem",
  },
  value: {
    "fontSize": "2rem"
  }
}

export default Radium((props) => {
  const { name, value } = props

  return (
    <div style={styles.containerDiv}>
      <div style={styles.header}> { name } </div>
      <div style={styles.value}> { value } </div>
    </div>
  )
})
