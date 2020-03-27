import * as React from 'react'

import { Switch, Route, Link } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Header from './Layout/Header'
import Posts from './Posts/Posts'

import Login from './Login'
import Signup from './Signup'
import Logout from './Logout'
import Gallery from './Gallery'

import '../styles'

interface AppState {
  fixedFooter: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = { fixedFooter: true };
  }

  setFixedClass(fixed: boolean) {
    this.setState({ fixedFooter: fixed });
  }

  render() {
    return (
      <>
        <Header />

        <section className="Content" bp="container">
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <PrivateRoute path='/gallery' component={Gallery} />
            <PrivateRoute path='/logout' component={Logout} />
            <PrivateRoute path='/' component={Posts} setFixedClass={this.setFixedClass.bind(this) } />
          </Switch>
        </section>

        <footer className={ this.state.fixedFooter ? 'fixed' : null }>
          Made with love by Berna
        </footer>
      </>
    )
  }
}

export default App;
