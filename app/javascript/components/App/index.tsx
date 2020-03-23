import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>
        Hello from React!
      </h1>
    )
  }
}

export default App;
