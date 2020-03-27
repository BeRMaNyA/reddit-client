import * as React from 'react'
import { inject, observer } from 'mobx-react'

import authStore from 'stores/authStore'

import { Redirect } from 'react-router-dom'

interface Props {
  authStore?: typeof authStore
}

@inject('authStore')
@observer

class Logout extends React.Component<Props>{
  componentDidMount() {
    this.props.authStore.logout();
  }

  render() {
    const { authStore } = this.props;

    if (!authStore.loggedIn)
      return <Redirect to="/login" />

    return <div>Logging out...</div>
  }
}

export default Logout;
