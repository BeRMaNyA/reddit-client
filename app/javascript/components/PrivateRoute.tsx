import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import userStore from 'stores/userStore'
import { RouteProps } from 'react-router';

@inject('userStore')
@observer

class PrivateRoute extends React.Component<RouteProps> {
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
