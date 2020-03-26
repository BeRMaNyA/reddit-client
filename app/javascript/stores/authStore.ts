import { observable, action } from 'mobx'
import Auth from 'services/auth'
import userStore from './userStore'

interface Values {
  name?: string
  email: string
  password: string
}

interface Error {
  error: string
}

class AuthStore {
  @observable inProgress: boolean = false;
  @observable loggedIn: boolean = false;
  @observable error: string;

  @observable values: Values = {
    email: '',
    password: '',
  };

  constructor() {
    Auth.me().then((result) => {
      if (result.data)
        this.setUser(result.data);
    })
  }

  @action login(email: string, password: string) {
    this.inProgress = true;

    Auth.login(email, password)
      .then((result) => {
        userStore.setCurrentUser(result.data);
        this.loggedIn = true;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error.response.data.error;
      })
      .then(() => {
        this.inProgress = false;
      });
  }

  @action setUser(user) {
    userStore.setCurrentUser(user);
    this.loggedIn = true;
  }

  @action signup(name: string, email: string, password: string) {
    this.inProgress = true;

    Auth.signup(name, email, password)
      .then((result) => {
        userStore.setCurrentUser(result.data);
        this.loggedIn = true;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error.response.data.error;
      })
      .then(() => {
        this.inProgress = false;
      });
  }

  @action logout() {
    this.loggedIn = false;
    Auth.logout().then(() => userStore.forgetUser());
  }

  @action clearError() {
    this.error = undefined;
  }
}

export default new AuthStore();
