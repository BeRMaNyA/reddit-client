import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import userStore from 'stores/userStore'
import { RouteProps } from 'react-router';

function PrivateRoute({ userStore, component:Component, ...restProps }: RouteProps) {
  if (userStore.currentUser)
    return <Route render={(props) => <Component {...restProps} />} />;

  return <Redirect to="/login" />
}

export default inject('userStore')(observer(PrivateRoute));
