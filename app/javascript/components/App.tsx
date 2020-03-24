import * as React from 'react'

import { Switch, Route, Link } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Login from './Login'
import Header from './Header'

import '../styles'

const Home = () => {
  return (
    <div>Hello world</div>
  )
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />

        <section className="Content" bp="container">
          <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/' component={Home} />
          </Switch>
        </section>

        <footer>
          Made with love by Berna
        </footer>
      </>
    )
  }
}

export default App;
