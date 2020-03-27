import * as React from 'react'
import { inject, observer } from 'mobx-react'

import userStore from 'stores/userStore'

import { Link } from 'react-router-dom'

const PublicNav = () => (
  <>
    <Link to="/login">Login</Link>
    <Link to="/signup">Sign Up</Link>
  </>
);

const UserNav = () => (
  <>
    <Link to="/">Home</Link>
    <Link to="/gallery">Gallery</Link>
    <Link to="/logout">Logout</Link>
  </>
);

const Header = () => (
  <header className="Header">
    <div className="clearfix" bp="container">
      <h1>Reddit Client</h1>
      <nav>
        { userStore.currentUser ? <UserNav />
                                : <PublicNav />
        }
      </nav>
    </div>
  </header>
);

export default inject('userStore')(observer(Header));
