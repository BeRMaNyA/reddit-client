import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import './styles'

const Login = () => (
  <h1>Login</h1>
)

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/(login)?' component={Login} />
      </Switch>
    )
  }
}

export default App;
