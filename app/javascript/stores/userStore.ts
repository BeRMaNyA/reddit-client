import { observable, action, autorun } from 'mobx';
import { User } from 'types'
 
class UserStore {
  @observable currentUser: User | null;
  @observable loadingUser: Boolean;

  @action setCurrentUser(user) {
    this.currentUser = user;
  }

  @action forgetUser() {
    this.currentUser = null;
  }
}

export default new UserStore();
