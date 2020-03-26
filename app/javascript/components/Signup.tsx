import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import authStore from 'stores/authStore' 

interface SignupProps {
  authStore?: typeof authStore
}

@inject('authStore')
@observer

class Signup extends React.Component<SignupProps> {
  private formRef;

  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.signup = this.signup.bind(this)
  }

  componentDidMount() {
    this.props.authStore.clearError();
  }

  signup(event: React.FormEvent) {
    const { name, email, password } = this.formRef.current;

    this.props.authStore.signup(name.value, email.value, password.value);

    event.preventDefault();
  }

  render() {
    const { authStore } = this.props;
    const { error, loggedIn } = authStore;

    if (loggedIn)
      return <Redirect to="/" />

    return (
      <form className="Form" ref={this.formRef} onSubmit={this.signup} noValidate>
        <h1>Signup</h1>

        { error &&
          <div className="Form__error">{ error }</div>
        }

        <div className="Form__item"> 
          <input type="text" name="name" placeholder="Name" />
        </div>

        <div className="Form__item"> 
          <input type="email" name="email" placeholder="Email" />
        </div>

        <div className="Form__item"> 
          <input type="password" name="password" placeholder="Password" />
        </div>

        <button className="Form__btn">
          { authStore.inProgress ? 'Signing Up...' : 'Signup' }
        </button>
      </form>
    )
  }
}

export default Signup;
