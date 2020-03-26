import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import authStore from 'stores/authStore'

interface LoginProps {
  authStore?: typeof authStore
}

@inject('authStore')
@observer

class Login extends React.Component<LoginProps> {
  private formRef;

  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.login = this.login.bind(this);
  }

  login(event: React.FormEvent) {
    const { email, password } = this.formRef.current;

    this.props.authStore.login(email.value, password.value);

    event.preventDefault();
  }

  componentDidMount() {
    this.props.authStore.clearError();
  }

  render() {
    const { authStore } = this.props;
    const { error, loggedIn } = authStore;

    if (loggedIn)
      return <Redirect to="/" />

    return (
      <form className="Form" ref={this.formRef} onSubmit={this.login} noValidate>
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
