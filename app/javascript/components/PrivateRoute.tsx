import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import userStore from '../stores/userStore'

interface PrivateRouteProps {
  userStore?: typeof userStore
  path: String
  component: React.FC
}

@inject('userStore')
@observer

class PrivateRoute extends React.Component<PrivateRouteProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { userStore, ...restProps } = this.props;

    if (userStore.currentUser)
      return <Route {...restProps} />;

    return <Redirect to="/login" />
  }
}

export default PrivateRoute;
