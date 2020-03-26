import * as React from 'react'
import { inject, observer } from 'mobx-react'

import authStore from 'stores/authStore'

import { Redirect } from 'react-router-dom'

interface LogoutProps {
  authStore?: typeof authStore
}

@inject('authStore')
@observer

class Logout extends React.Component<LogoutProps>{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authStore.logout();
  }

  render() {
    const { authStore } = this.props;

    if (!authStore.loggedIn)
      return <Redirect to="/" />

    return <div></div>
  }
}

export default Logout;
