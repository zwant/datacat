import React, { Component } from 'react';
import Radium from 'radium'
import Dashboard, { addWidget } from 'react-dazzle';
import Container from './Container';
import Header from './Header';
import CustomFrame from './CustomFrame';

// Your widget. Just another react component.
import JustANumberWidget from './widgets/JustANumberWidget'
import LineChartWidget from './widgets/LineChartWidget'

// We are using bootstrap as the UI library
import 'bootstrap/dist/css/bootstrap.css';
// Default styles.
import 'react-dazzle/lib/style/style.css';

export default Radium((props) => {
  const {layout, widgets} = props

  return (
    <Container>
      <Header />
      <Dashboard
        frameComponent={CustomFrame}
        layout={layout}
        widgets={widgets}
        editable={false}
        />
    </Container>
  )
})
