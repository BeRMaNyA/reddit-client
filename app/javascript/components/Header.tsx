import * as React from 'react'
import { inject, observer } from 'mobx-react'

import userStore from 'stores/userStore'

import { Link } from 'react-router-dom'

interface HeaderProps {
  userStore?: typeof userStore
}

@inject('userStore')
@observer

class Header extends React.Component<HeaderProps>{
  constructor(props) {
    super(props);
  }

  render() {
    const { userStore } = this.props;

    return (
      <header className="Header">
        <div className="clearfix" bp="container">
          <h1>Reddit Client</h1>
          <nav>
            { userStore.currentUser ? this.userNav
                                    : this.publicNav
            }
          </nav>
        </div>
      </header>
    )
  }

  private

  get publicNav() {
    return (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </>
    );
  }

  get userNav() {
    return (
      <>
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/logout">Logout</Link>
      </>
    )
  }
}

export default Header;
