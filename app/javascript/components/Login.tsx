import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import authStore from 'stores/authStore'

interface Props {
  authStore?: typeof authStore
}

@inject('authStore')
@observer

class Login extends React.Component<Props> {
  private formRef;

  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  login(event: React.FormEvent) {
    const { email, password } = this.formRef.current;

    this.props.authStore.login(email.value, password.value);

    event.preventDefault();
  }

  componentWillUnmount() {
    this.props.authStore.clearError();
  }

  render() {
    const { authStore } = this.props;
    const { error, loggedIn } = authStore;

    if (loggedIn)
      return <Redirect to="/" />

    return (
      <form className="Form" ref={this.formRef} onSubmit={this.login.bind(this)} noValidate>
        <h1>Credentials</h1>

        { error &&
          <div className="Form__error">{ error }</div>
        }

        <div className="Form__item"> 
          <input type="email" name="email" placeholder="Email" />
        </div>

        <div className="Form__item"> 
          <input type="password" name="password" placeholder="Password" />
        </div>

        <button className="Form__btn">
          { authStore.inProgress ? 'Login...' : 'Login' }
        </button>
      </form>
    )
  }
}

export default Login;
