import { observable, action } from 'mobx'
import Auth from 'services/auth'
import userStore from './userStore'

interface Error {
  error: string
}

class AuthStore {
  @observable inProgress: boolean = false;
  @observable loggedIn: boolean = false;
  @observable error: string;

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
        this.setUser(result.data)
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error.response.data.error;
      })
      .then(() => {
        this.inProgress = false;
      });
  }

  @action signup(name: string, email: string, password: string) {
    this.inProgress = true;

    Auth.signup(name, email, password)
      .then((result) => {
        this.error = undefined;
        this.setUser(result.data);
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

  private

  setUser(user) {
    userStore.setCurrentUser(user);
    this.loggedIn = true;
  }
}

export default new AuthStore();
